// import layer
import { Box } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { signInWithPopup } from 'firebase/auth';
import { FC } from 'react';
import { auth, provider } from 'src/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

// type layer
export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

// presenter
export const Presenter: FC<PresenterProps> = () => {
  return (
    <>
      <Text color={`white`} fontSize={`${16 / 19.2}vw`} letterSpacing={`0`}>
        <Box color={'black'}>{auth.currentUser.displayName}</Box>
        <Box
          as="button"
          onClick={() => auth.signOut()}
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
          サインアウト
        </Box>
      </Text>
    </>
  );
};
