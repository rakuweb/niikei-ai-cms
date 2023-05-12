import { Box, Input, IconButton } from '@chakra-ui/react';
import { InternalLink } from 'components/links/InternalLink';
import { Text } from 'components/texts/Text';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from 'src/firebase';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

// type layer
export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

// presenter
export const Presenter: FC<PresenterProps> = () => {
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signInWithEmailAndPasswordHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, userEmail, password);
      router.push('/');
    } catch (error) {
      setError('ログイン情報に誤りがあります。');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, []);

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
          type="email"
          value={userEmail}
          onChange={handleEmailChange}
          placeholder="メールアドレスを入力"
          bg={`white`}
          mb={`${10 / 19.2}vw`}
          h={`${50 / 19.2}vw`}
          fontSize={`${16 / 19.2}vw`}
          borderRadius={`0`}
        />
        <Box mb={`${10 / 19.2}vw`}>パスワード</Box>
        <Box position="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="パスワードを入力"
            bg={`white`}
            mb={`${30 / 19.2}vw`}
            h={`${50 / 19.2}vw`}
            fontSize={`${16 / 19.2}vw`}
            borderRadius={`0`}
          />
          <IconButton
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            position="absolute"
            onClick={handlePasswordVisibility}
            variant="ghost"
            aria-label={''}
          />
        </Box>
        {error && <Box color="red">{error}</Box>}
        <Box
          as="button"
          onClick={signInWithEmailAndPasswordHandler}
          display={`flex`}
          w={`100%`}
          h={`${50 / 19.2}vw`}
          bg={`#49BAC0`}
          justifyContent={`center`}
          alignItems={`center`}
          borderRadius={`${50 / 19.2}vw`}
          transition={`all .3s`}
          _hover={{
            cursor: `pointer`,
            filter: `opacity(80%)`,
          }}
        >
          ログイン
        </Box>
        <Box mt={`${20 / 19.2}vw`}>
          <InternalLink href={`/password-reset`} fontWeight={`bold`}>
            パスワードをお忘れですか?
          </InternalLink>
        </Box>
      </Text>
    </>
  );
};
