// import layer
import { Box } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { signInWithPopup } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FC, useState } from 'react';
import { auth, provider, db } from 'src/firebase';

// type layer
export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

// presenter
export const Presenter: FC<PresenterProps> = () => {
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  const signInWithGoogle = async () => {
    try {
      const allowedEmailsRef = collection(db, 'allowedEmails');
      const q = query(allowedEmailsRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        signInWithPopup(auth, provider).catch((error) => {
          setError(error.message);
        });
      } else {
        setError('登録されていないユーザーです。');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Text color={`white`} fontSize={`${16 / 19.2}vw`} letterSpacing={`0`}>
        {error && <Box color="red">{error}</Box>}
        {/* <input
          type="email"
          value={userEmail}
          onChange={handleEmailChange}
          placeholder="メールアドレスを入力"
        /> */}
        <Box
          as="button"
          onClick={signInWithGoogle}
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
      </Text>
    </>
  );
};
