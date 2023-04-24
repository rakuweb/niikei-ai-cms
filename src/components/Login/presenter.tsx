// import layer
import { Box, Input } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { FC } from 'react';
import { LoginButton } from './LoginButton';

// type layer
export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

// presenter
export const Presenter: FC<PresenterProps> = ({ ...props }) => {
  return (
    <>
      <Text
        letterSpacing={`0`}
        w={`${650 / 19.2}vw`}
        pt={`${315 / 19.2}vw`}
        mx={`auto`}
        fontSize={`${16 / 19.2}vw`}
        lineHeight={`${26 / 19.2}vw`}
      >
        <Box
          as={`h1`}
          fontWeight={`bold`}
          fontSize={`${36 / 19.2}vw`}
          lineHeight={`${49 / 19.2}vw`}
          mb={`${50 / 19.2}vw`}
          textAlign={`center`}
        >
          管理者ログイン
        </Box>
        <Box mb={`${10 / 19.2}vw`}>メールアドレス</Box>
        <Input
          bg={`white`}
          mb={`${30 / 19.2}vw`}
          h={`${50 / 19.2}vw`}
          fontSize={`${16 / 19.2}vw`}
          borderRadius={`0`}
        />
        <Box mb={`${10 / 19.2}vw`}>パスワード</Box>
        <Input
          bg={`white`}
          mb={`${50 / 19.2}vw`}
          h={`${50 / 19.2}vw`}
          fontSize={`${16 / 19.2}vw`}
          type={'password'}
        />
        <LoginButton />
        <Box mt={`${20 / 19.2}vw`} fontWeight={`bold`}>
          パスワードをお忘れですか?
        </Box>
      </Text>
    </>
  );
};
