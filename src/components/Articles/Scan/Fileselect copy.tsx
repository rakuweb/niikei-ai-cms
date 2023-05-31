import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { WideButton } from 'components/Button/WideButton';
import { BigWideButton } from 'components/Button/BigWideButton';
import { useDropzone } from 'react-dropzone';

const Fileselect = ({ setSelectedFileContent }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isButtonActive, setButtonActive] = useState(false);
  const loadFileContent = () => {
    if (!selectedFile) {
      alert('まずファイルを選択してください。');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setSelectedFileContent(fileReader.result);
    };
    fileReader.readAsText(selectedFile);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { 'text/plain': ['.txt'] },
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
          onClick={loadFileContent}
          src="/images/button/rightarrow.png"
          text="生成する"
          w={`${280 / 19.2}vw`}
        />
      )}
    </div>
  );
};

export default Fileselect;
