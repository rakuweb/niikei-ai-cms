import React, { FC } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';

import Subtitle from './Subtitle';
import { WideButton } from 'components/Button/WideButton';
import AccountInput from './AccountInput';
import Password from './Password';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  return (
    <>
      <Text letterSpacing={`0`} fontSize={`${16 / 19.2}vw`}>
        <Subtitle title={`会社名`} />
        <Box lineHeight={`1.5em`} mb={`${50 / 19.2}vw`} fontWeight={`400`}>
          株式会社XXXXX
        </Box>

        <Box mb={`${50 / 19.2}vw`}>
          <Subtitle title={`登録名`} />
          <HStack mb={`${20 / 19.2}vw`} spacing={`${40 / 19.2}vw`}>
            <Box
              w={{ lg: `${110 / 10.2}vw`, xl: `${180 / 19.2}vw` }}
            >{`現在のメールアドレス`}</Box>
            <Box fontWeight={`400`}>{`test@sample.jp`}</Box>
          </HStack>

          <HStack mb={`${30 / 19.2}vw`} spacing={`${40 / 19.2}vw`}>
            <Box
              w={{ lg: `${110 / 10.2}vw`, xl: `${180 / 19.2}vw` }}
            >{`変更後のメールアドレス`}</Box>
            <AccountInput />
          </HStack>
          <WideButton text={`変更する`} w={`${200 / 19.2}vw`} />
        </Box>

        <Subtitle title={`パスワード`} />
        <Password text={`現在のパスワード`} />
        <Password text={`変更後のパスワード`} />
        <Password text={`パスワードの確認`} mb={`${30 / 19.2}vw`} />
        <WideButton text={`変更する`} w={`${200 / 19.2}vw`} />
      </Text>
    </>
  );
};
