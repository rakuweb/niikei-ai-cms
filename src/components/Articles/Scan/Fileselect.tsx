import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
} from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { WideButton } from 'components/Button/WideButton';
import { BigWideButton } from 'components/Button/BigWideButton';
import styled from 'styled-components';

const RoundedCircularProgress = styled(CircularProgress)`
  svg {
    stroke-linecap: round;
  }
`;

const Fileselect = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 5
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

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
        {/* <Text letterSpacing={`0`}>
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
        </Text> */}
        <RoundedCircularProgress
          value={progress}
          color="#49BAC0"
          trackColor="rgba(73, 186, 192, 0.3)"
          w={'90%'}
          h={'90%'}
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
        </RoundedCircularProgress>
      </Flex>
      <BigWideButton
        src="/images/button/rightarrow_gray.png"
        text="生成する"
        w={`${280 / 19.2}vw`}
        bg={`#D6D6D6`}
        color={`#BABABA`}
      />
      {/* ファイル選択後はこちらにボタン変更 
      <BigWideButton
        src="/images/button/rightarrow.png"
        text="生成する"
        w={`${280 / 19.2}vw`}
      /> */}
    </div>
  );
};

export default Fileselect;
