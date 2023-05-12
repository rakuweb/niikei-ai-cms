import React from 'react';
import { Box } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { WideButton } from 'components/Button/WideButton';
import { BigWideButton } from 'components/Button/BigWideButton';

const Fileselect = () => {
  return (
    <div>
      <Box
        bg={`#f8f8f8`}
        w={`${600 / 19.2}vw`}
        h={`${360 / 19.2}vw`}
        p={`${30 / 19.2}vw`}
        mb={`${40 / 19.2}vw`}
      >
        <Text letterSpacing={`0`}>
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
      </Box>
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
