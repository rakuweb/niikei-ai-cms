import { Box, Flex, Input, Button, RadioGroup, Radio } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';

export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

type FormInputs = {
  summaryWordCount: string;
};

export const Presenter: FC<PresenterProps> = () => {
  const googleDocEmbedUrl =
    'https://docs.google.com/document/d/16vvZBP2mmMHPkWiaLVGxPVL2JiWVWFLlxMuCGQx_gqg/edit';

  const [selectedConfirm, setSelectedConfirm] = useState('');

  const handleConfirmChange = (value: string) => {
    setSelectedConfirm(value);
  };

  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  const onError = (errors: FieldErrors<FormInputs>) => {
    alert(errors.summaryWordCount?.message);
  };

  return (
    <Flex>
      <Box flex="4" height="100vh">
        <iframe src={googleDocEmbedUrl} width="100%" height="100%" />
      </Box>
      <Box flex="1" height="100vh" boxShadow="2px 2px 10px rgba(0, 0, 0, 0.5)">
        <Box p="calc(1.5vw)" borderBottom="1px solid #d3d3d3">
          AI記憶システム
        </Box>
        <Box p="calc(1.5vw)">
          <Box>要約しますか？</Box>
          <Box>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <Flex alignItems="center" justifyContent="space-around">
                <Box whiteSpace="nowrap">要約文字数</Box>
                <Box>
                  <Input
                    {...register('summaryWordCount', {
                      required: '入力して下さい',
                      pattern: {
                        value: /^[0-9]*$/,
                        message: '無効な入力です、数字のみ入力可能です',
                      },
                    })}
                    type="text"
                    style={{
                      width: '5vw',
                      borderRadius: '0',
                    }}
                  />
                </Box>
                <Box whiteSpace="nowrap">以内</Box>
              </Flex>
              <Flex
                alignItems="center"
                m="0.5vw 0"
                justifyContent="space-between"
              >
                <Button
                  type="submit"
                  fontSize="0.8vw"
                  bgColor="#49BAC0"
                  color="#fff"
                  borderRadius="5vw"
                  p="0 2vw"
                >
                  要約する
                </Button>
                <Button
                  fontSize="0.8vw"
                  bgColor="#8D9696"
                  color="#fff"
                  borderRadius="5vw"
                  p="0 2vw"
                >
                  要約しない
                </Button>
              </Flex>
            </form>
            <Box>
              <Box m="1vw 0 0.5vw">確認期日を入力してください。</Box>
              <Input type="date" min={new Date().toISOString().split('T')[0]} />
            </Box>
            <Box>
              <Box m="1vw 0 0">アイキャッチ画像をアップしてください。</Box>
              <Button
                fontSize="0.8vw"
                bgColor="#49BAC0"
                color="#fff"
                borderRadius="5vw"
                p="0 1vw"
                w="100%"
                m="0.5vw 0"
              >
                ファイルを選択
              </Button>
            </Box>
            <Box>
              <Box m="1vw 0 0">確認者を選択してください。</Box>
              <RadioGroup
                onChange={handleConfirmChange}
                value={selectedConfirm}
              >
                <Flex flexDirection="column">
                  <Radio
                    id="confirmA"
                    name="confirm"
                    value="A"
                    size="md"
                    colorScheme="blue"
                    fontSize="0.8vw"
                  >
                    確認者A
                  </Radio>
                  <Radio
                    id="confirmB"
                    name="confirm"
                    value="B"
                    size="md"
                    colorScheme="blue"
                  >
                    確認者B
                  </Radio>
                  <Radio
                    id="confirmC"
                    name="confirm"
                    value="C"
                    size="md"
                    colorScheme="blue"
                  >
                    確認者C
                  </Radio>
                </Flex>
              </RadioGroup>
              <Button
                fontSize="0.8vw"
                bgColor={'#49BAC0'}
                color={'#fff'}
                borderRadius={'5vw'}
                p={'0 2vw'}
                w={'100%'}
                m={'10px 0'}
              >
                下書き保存する
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
