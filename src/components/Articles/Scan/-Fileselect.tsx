import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from '@chakra-ui/react';
import { WideButton } from 'components/Button/WideButton';
import { BigWideButton } from './BigWideButton';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .rounded-progress-bar svg {
    stroke-linecap: round;
  }
`;

const FileSelect = ({ disabled }) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [activeButton, setActiveButton] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 0 : prevProgress + 5
        );
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }
  }, [loading]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      setFile(files[0]);
      setLoading(true);
      // Assuming the "loading" process takes 5 seconds
      setTimeout(() => {
        setLoading(false);
        setActiveButton(true);
      }, 1);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length) {
      setFile(files[0]);
      setLoading(true);
      // Assuming the "loading" process takes 5 seconds
      setTimeout(() => {
        setLoading(false);
        setActiveButton(true);
      }, 1);
    }
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      <Flex
        bg={`#f8f8f8`}
        w={`${600 / 19.2}vw`}
        h={`${360 / 19.2}vw`}
        p={`${30 / 19.2}vw`}
        mb={`${40 / 19.2}vw`}
        alignItems={`center`}
        justifyContent={'center'}
      >
        {loading ? (
          <>
            {/* <GlobalStyle />
            <CircularProgress
              className="rounded-progress-bar"
              value={progress}
              color="#49BAC0"
              trackColor="rgba(73, 186, 192, 0.3)"
              w={'80%'}
              h={'80%'}
              size={'100%'}
              m={'auto'}
            >
              <CircularProgressLabel fontSize={'2.5vw'} m={'auto'}>
                <Box as={'span'} fontWeight={'bold'} fontSize={'3vw'}>
                  {progress}
                </Box>
                <Box as={'span'} fontWeight={'bold'} fontSize={'1.5vw'}>
                  %
                </Box>
              </CircularProgressLabel>
            </CircularProgress> */}
            <Box as={'span'} fontWeight={'bold'} fontSize={'1vw'}>
              Loading: {file?.name}
            </Box>
          </>
        ) : (
          <>
            <label>
              <input type="file" hidden onChange={handleFileSelect} />
              {/* <WideButton text="ファイルを選択" /> */}

              <Text letterSpacing={`0`} className="file">
                <Box bg={`#D6D6D6`} w={`${540 / 19.2}vw`} h={`${300 / 19.2}vw`}>
                  <Box
                    fontSize={`${16 / 19.2}vw`}
                    color={`#525D6B`}
                    p={`${110 / 19.2}vw ${102 / 19.2}vw`}
                    whiteSpace={`nowrap`}
                  >
                    <WideButton
                      text="ファイルを選択"
                      w={`${200 / 19.2}vw`}
                      mb={`${16 / 19.2}vw`}
                      mx={`auto`}
                    />
                    {`または、ファイルをここにドラッグ&ドロップ`}
                  </Box>
                </Box>
              </Text>
            </label>
          </>
        )}
      </Flex>
      <Box as="button" disabled={!activeButton}>
        <BigWideButton
          src="/images/button/rightarrow_gray.png"
          text="生成する"
          w={`${280 / 19.2}vw`}
          style={
            !activeButton
              ? { backgroundColor: '#D6D6D6', color: '#BABABA' }
              : {}
          }
        />
      </Box>
    </div>
  );
};

export default FileSelect;
