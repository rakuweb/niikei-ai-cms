import { Box } from '@chakra-ui/react';
import { PasswordReset } from 'components/PasswordReset';
import type { NextPage } from 'next';

const Signin: NextPage = () => {
  return (
    <>
      <Box w={`100vw`} h={`100vh`} bg={`#EAEAEA`}>
        <PasswordReset />
      </Box>
    </>
  );
};

export default Signin;
