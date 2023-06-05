import React, { useCallback, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { WideButton } from 'components/Button/WideButton';
import { BigWideButton } from 'components/Button/BigWideButton';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import LordingComponent from './LordingComponent';

const Mp3select = ({ setSelectedFileContent }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isButtonActive, setButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { handleSubmit } = useForm({
    defaultValues: { name: '', iconUrl: '' },
  });
  const [file, setFile] = useState<File>();

  const uploadMp3 = useCallback(async (file: File) => {
    let progressInterval = 0;
    let interval = 100;
    let timerId = null;
    const incrementProgress = () => {
      if (progressInterval >= 100) {
        setUploadProgress(100);
        return;
      }

      setUploadProgress(progressInterval);
      progressInterval++;
      interval *= 1.06;
      timerId = setTimeout(incrementProgress, interval);
    };

    incrementProgress();

    try {
      const fileName = 'mp3text';

      const res = await fetch(`/api/uplord-file?file=${fileName}`, {
        method: 'POST',
      });
      const { url, fields } = await res.json();
      const body = new FormData();
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        body.append(key, value as string | Blob);
      });
      const upload = await fetch(url, { method: 'POST', body });

      if (upload.ok) {
        console.log('Uploaded successfully!');

        const fixWavRes = await fetch(`/api/fix-wav?file=${fileName}`);
        const json = await fixWavRes.json();

        if (fixWavRes.ok) {
          console.log('Converted to wav successfully!');

          const textRes = await fetch(
            `/api/convert-mp3?file=${fileName}-fixed.wav`,
            {
              method: 'POST',
            }
          );
          const json = await textRes.json();
          const { text } = json;

          if (textRes.ok) {
            console.log('Converted to text successfully!');
            clearInterval(progressInterval);
            clearTimeout(timerId);
            setUploadProgress(100);

            setSelectedFileContent(text);
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          } else {
            console.error('Conversion to text failed.');
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }
        } else {
          console.error('Conversion to wav failed.');
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      } else {
        console.error('Upload failed.');
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      alert('アップロード失敗');
      clearInterval(progressInterval);
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  const handleClick = handleSubmit(async () => {
    if (file) {
      uploadMp3(file);
      setIsLoading(true);
      setUploadProgress(0);
    }
  });
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
    setButtonActive(true);
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { 'audio/mpeg': ['.mp3'] },
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
          <LordingComponent progress={uploadProgress} />
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

export default Mp3select;
