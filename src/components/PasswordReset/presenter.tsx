import { FC, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'src/firebase';
import { Box, Input } from '@chakra-ui/react';

// type layer
export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

// presenter
export const Presenter: FC<PresenterProps> = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const passwordReset = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        'パスワードリセットメールを送信しました。メールを確認してください。'
      );
      setError('');
    } catch (error) {
      setMessage('');
      setError('メール送信に失敗しました。もう一度お試しください。');
    }
  };

  return (
    <>
      <Box
        as="form"
        onSubmit={passwordReset}
        letterSpacing={`0`}
        w={`${650 / 19.2}vw`}
        pt={`${315 / 19.2}vw`}
        mx={`auto`}
        fontSize={`${16 / 19.2}vw`}
        lineHeight={`${26 / 19.2}vw`}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="登録メールアドレスを入力"
          bg={`white`}
          mb={`${30 / 19.2}vw`}
          h={`${50 / 19.2}vw`}
          fontSize={`${16 / 19.2}vw`}
          borderRadius={`0`}
        />
        {message && <Box color="green">{message}</Box>}
        {error && <Box color="red">{error}</Box>}
        <Box
          as="button"
          type="submit"
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
          パスワードリセットメールを送信
        </Box>
      </Box>
    </>
  );
};
