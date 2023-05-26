import React, { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { WideButton } from 'components/Button/WideButton';
import { BigWideButton } from 'components/Button/BigWideButton';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
const Mp3select = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isButtonActive, setButtonActive] = useState(false);
  const [transcription, setTranscription] = useState('');

  const handleFileSelection = async (file) => {
    const fileReader = new FileReader();
    fileReader.onloadend = async () => {
      if (fileReader.result instanceof ArrayBuffer) {
        const mp3Data = new Uint8Array(fileReader.result);

        // Google Cloud Storageにファイルをアップロード
        const response = await axios.post('/api/upload-file', {
          filename: file.name,
          data: Array.from(mp3Data),
        });
        const gcsUri = response.data;

        // 文字起こし
        const response2 = await axios.post('/api/convertSpeech', {
          uri: gcsUri,
        });

        const transcript = response2.data.transcript;
        console.log(transcript);
        setTranscription(transcript);
        props.setSelectedFileContent(transcript);
      } else {
        console.error('FileReader result is not an ArrayBuffer');
      }
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      handleFileSelection(selectedFile);
    }
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { 'audio/mp3': ['.mp3'] },
    noClick: false,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
      setButtonActive(true);
    },
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
        <Text letterSpacing={`0`} className="file">
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
        </Text>
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
          onClick={() => handleFileSelection(selectedFile)}
          src="/images/button/rightarrow.png"
          text="生成する"
          w={`${280 / 19.2}vw`}
        />
      )}
    </div>
  );
};

export default Mp3select;
