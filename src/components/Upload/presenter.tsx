import React, { FC, useState, useCallback } from 'react';
import { Box, Input, Flex } from '@chakra-ui/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Timestamp } from 'firebase/firestore';

import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { ContentContainer } from 'components/Container/ContentContainer';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { WideButton } from 'components/Button/WideButton';
import { BigWideButton } from 'components/Button/BigWideButton';
import { addFortunesLog } from '@/firebase/firestore/fortuneLogs';
import { useCompanyStore, selectUid } from 'features/company';
import { apiRoutes, routes, sidebarItems, wpRoutes } from '@/constants/routes';

export type PresenterProps = Record<string, unknown>;

const schema = z.object({
  name: z.string().min(1, '入力してください'),
});

type Schema = z.infer<typeof schema>;

export const Presenter: FC = () => {
  const title = `アップロードする`;
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState<File>();
  const [isButtonActive, setButtonActive] = useState(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  });
  const companyID = useCompanyStore(selectUid);

  // WARN
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFile(acceptedFiles[0]);
    setButtonActive(true);
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] },
    noClick: false,
    noKeyboard: true,
    onDrop,
  });

  const submitHandler = async (data: Schema) => {
    if (!file) return;
    setIsSending(true);
    // upload image
    const contentType = file.type;
    const filename = file.name;
    const formData = new FormData();
    formData.append('contentType', contentType);
    formData.append('filename', filename);
    formData.append('file', file);
    const resBasic = await axios.get(apiRoutes.wpBasic).catch((err) => {
      console.error(err);
      return null;
    });
    if (resBasic === null || !resBasic) return;
    const basicData = resBasic.data;
    const resUpload = await axios
      .post(wpRoutes.media, formData, {
        headers: {
          'Content-Type': `multipart/form-data`,
          'Content-Disposition': `attachment; filename=test`,
          Authorization: `Basic ${basicData.basic}`,
        },
        // auth: {
        //   username: API_USER,
        //   password: API_PASSWORD,
        // },
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
    if (resUpload === null) {
      alert(`ネットワークエラーにより画像のアップロードに失敗しました。
しばらく経ってからもう一度お試しください。`);
      return;
    }

    // firestore
    const resWpData = resUpload.data;
    const reqData = {
      title: data.name,
      url: resWpData?.source_url ?? ``,
      filename: filename,
      message: `画像「${data.name}」をアップロードしました。`,
      date: Timestamp.now(),
      wp_id: resWpData?.id ?? ``,
    };
    await addFortunesLog(companyID, reqData);

    alert('画像をアップロードしました。');
    reset();
    setSelectedFile(null);
    setIsSending(false);
  };

  return (
    <>
      <Box bg={`#EAEAEA`} h={`100vh`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs
              pagename1={sidebarItems.originalPost}
              pagelink1={routes.fortunes}
              pagename2={title}
            />

            <Title title={title} />
            <ContentContainer
              px={`0`}
              as={`form`}
              onSubmit={handleSubmit(submitHandler)}
            >
              <Box w={`${400 / 19.2}vw`} ml={`${30 / 19.2}vw`}>
                <Text fontSize={'1vw'} mb={'0.5vw'}>
                  タイトル
                </Text>
                <Input
                  type="text"
                  borderRadius={'none'}
                  {...register('name')}
                />
                {errors?.name?.message && (
                  <Text color={`red`} fontSize={'0.8vw'} mt={'0.25vw'}>
                    {errors.name.message}
                  </Text>
                )}
              </Box>
              <Box
                w={`${1310 / 19.2}vw`}
                pt={`${60.5 / 19.2}vw`}
                pl={`${30 / 19.2}vw`}
              >
                {' '}
                <Text fontSize={'1vw'} mb={'0.5vw'}>
                  カバー画像
                </Text>
                <div>
                  <Flex
                    bg={`#f8f8f8`}
                    w={`${600 / 19.2}vw`}
                    h={`${360 / 19.2}vw`}
                    p={`${30 / 19.2}vw`}
                    mb={`${40 / 19.2}vw`}
                    alignItems={`center`}
                    justifyContent={'center'}
                  >
                    <Box letterSpacing={`0`} className="file">
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Flex
                          flexFlow={'column'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          bg={`#D6D6D6`}
                          w={`${540 / 19.2}vw`}
                          h={`${300 / 19.2}vw`}
                        >
                          <Box>
                            <WideButton
                              onClick={open}
                              text="ファイルを選択"
                              w={`${200 / 19.2}vw`}
                              mb={`${16 / 19.2}vw`}
                              mx={`auto`}
                              type={`button`}
                            />
                            <Box fontSize={'1vw'} color={'#525D6B'}>
                              {selectedFile
                                ? selectedFile.name
                                : `または、ファイルをここにドラッグ&ドロップ`}
                            </Box>
                          </Box>
                        </Flex>
                      </div>
                    </Box>
                  </Flex>
                  {!isButtonActive ? (
                    <BigWideButton
                      text="アップロードする"
                      w={`${280 / 19.2}vw`}
                      bg={`#D6D6D6`}
                      color={`#BABABA`}
                    />
                  ) : (
                    <BigWideButton
                      type={`submit`}
                      text="アップロードする"
                      w={`${280 / 19.2}vw`}
                      as={`button`}
                    />
                  )}
                </div>
              </Box>
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
