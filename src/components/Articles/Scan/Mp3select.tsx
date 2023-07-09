import React, { useCallback, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

import { WideButton } from 'components/Button/WideButton';
import { BigWideButton } from 'components/Button/BigWideButton';
import LordingComponent from './LordingComponent';
import toWav from 'audiobuffer-to-wav';
import { decode } from 'audio-decode';

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
      console.log(res);
      const { url, fields } = await res.json();
      const body = new FormData();
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        body.append(key, value as string | Blob);
      });
      const upload = await fetch(url, { method: 'POST', body });

      if (upload.ok) {
        console.log('Uploaded successfully!');

        const textRes = await fetch(`/api/convert-mp3?file=${fileName}`, {
          method: 'POST',
        });
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
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      const arrayBuffer = await file.arrayBuffer();

      const audioContext = new AudioContext();
      let audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      if (audioBuffer.numberOfChannels == 2) {
        const channel1Data = audioBuffer.getChannelData(0);
        const channel2Data = audioBuffer.getChannelData(1);
        const newAudioData = new Float32Array(audioBuffer.length);

        for (let i = 0; i < audioBuffer.length; i++) {
          newAudioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
        }

        const newAudioBuffer = audioContext.createBuffer(
          1,
          audioBuffer.length,
          audioBuffer.sampleRate
        );
        newAudioBuffer.copyToChannel(newAudioData, 0, 0);
        audioBuffer = newAudioBuffer;
      }

      const wav = toWav(audioBuffer);
      const blob = new Blob([new Uint8Array(wav)], { type: 'audio/wav' });
      const convertedFile = new File([blob], file.name, {
        type: 'audio/wav',
        lastModified: Date.now(),
      });

      setSelectedFile(convertedFile);
      setButtonActive(true);
      setFile(convertedFile);
    } catch (err) {
      console.error(err);
      alert('ファイルの変換に失敗しました');
    }
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
          text="生成する"
          w={`${280 / 19.2}vw`}
          bg={`#D6D6D6`}
          color={`#BABABA`}
        />
      ) : (
        <BigWideButton
          onClick={handleClick}
          text="生成する"
          w={`${280 / 19.2}vw`}
        />
      )}
    </div>
  );
};

export default Mp3select;
