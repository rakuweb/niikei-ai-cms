// import layer
import { Box } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { signInWithPopup, fetchSignInMethodsForEmail } from 'firebase/auth';
import { FC, useState } from 'react';
import { auth, provider } from 'src/firebase';

// type layer
export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

// presenter
export const Presenter: FC<PresenterProps> = () => {
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    try {
      const providers = await fetchSignInMethodsForEmail(
        auth,
        'kato.rakuweb@gmail.com'
      );
      if (providers && providers.length > 0) {
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
