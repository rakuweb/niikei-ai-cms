import React from 'react';
import { Box, Flex, Textarea } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { BigWideButton } from 'components/Button/BigWideButton';

const Read = () => {
  return (
    <div>
      <Text mb={`${40 / 19.2}vw`} letterSpacing={`0`}>
        <Textarea
          w={`${600 / 19.2}vw`}
          h={`${360 / 19.2}vw`}
          placeholder="ここに読み取った文章が出力されます。"
          borderRadius={`0`}
          borderColor={`#D6D6D6`}
          fontSize={`${16 / 19.2}vw`}
        />
      </Text>
      <Flex justify={`space-between`}>
        <BigWideButton
          src="/images/button/rightarrow_big.png"
          text="保存する"
          w={`${280 / 19.2}vw`}
          bg={`#8D9696`}
          color={`white`}
        />
        <BigWideButton
          src="/images/button/rightarrow_big.png"
          text="記事作成に進む"
          w={`${280 / 19.2}vw`}
        />
      </Flex>
    </div>
  );
};

export default Read;
