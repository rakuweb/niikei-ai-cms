import React, { useCallback, useState } from 'react';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { WideButton } from 'components/Button/WideButton';
import { BigWideButton } from 'components/Button/BigWideButton';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import LordingComponent from './LordingComponent';

const Fileselect = ({ setSelectedFileContent }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isButtonActive, setButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { handleSubmit } = useForm({
    defaultValues: { name: '', iconUrl: '' },
  });
  const [file, setFile] = useState<File>();

  const uploadpdf = useCallback(async (file: File) => {
    setIsLoading(true);
    setUploadProgress(0);
    let progressInterval;

    try {
      const fileName = 'pdftext';
      const res = await fetch(`/api/generate-upload-url?file=${fileName}`);
      const { url, fields } = await res.json();
      const body = new FormData();
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        body.append(key, value as string | Blob);
      });
      progressInterval = setInterval(() => {
        setUploadProgress((prevProgress) =>
          prevProgress < 70 ? prevProgress + 1 : prevProgress
        );
      }, 1000);
      const upload = await fetch(url, { method: 'POST', body });

      if (upload.ok) {
        console.log('Uploaded successfully!');
        clearInterval(progressInterval);
        progressInterval = setInterval(() => {
          setUploadProgress((prevProgress) =>
            prevProgress < 99 ? prevProgress + 1 : prevProgress
          );
        }, 1000);
        const textRes = await fetch(`/api/convert-pdf?file=${fileName}`, {
          method: 'POST',
        });
        const json = await textRes.json();
        console.log(json);
        const { text } = json;
        if (textRes.ok) {
          console.log('Converted to text successfully!');
          clearInterval(progressInterval);
          setUploadProgress(100);
          setSelectedFileContent(text);
          setIsLoading(false);
        } else {
          console.error('Conversion to text failed.');
          setIsLoading(false);
        }
      } else {
        console.error('Upload failed.');
        setIsLoading(false);
      }
    } catch (error) {
      alert('アップロード失敗 ');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClick = handleSubmit(async () => {
    if (file) {
      uploadpdf(file);
    }
  });
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    setButtonActive(true);
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { 'text/pdf': ['.pdf'] },
    noClick: false,
    noKeyboard: true,
    onDrop,
  });

  return (
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
        {isLoading ? (
          <>
            {' '}
            <LordingComponent progress={uploadProgress} />
          </>
        ) : (
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
        )}
      </Flex>
      {!isButtonActive ? (
        <BigWideButton
          src="/images/button/rightarrow_gray.png"
          text="生成する"
          w={`${280 / 19.2}vw`}
          bg={`#D6D6D6`}
          color={`#BABABA`}
        />
      ) : (
        <BigWideButton
          onClick={handleClick}
          src="/images/button/rightarrow.png"
          text="生成する"
          w={`${280 / 19.2}vw`}
        />
      )}
    </div>
  );
};

export default Fileselect;
