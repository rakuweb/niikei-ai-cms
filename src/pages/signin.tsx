import { Box } from '@chakra-ui/react';
import { Login } from 'components/Login';
import type { NextPage } from 'next';

const Signin: NextPage = () => {
  return (
    <>
      <Box w={`100vw`} h={`100vh`} bg={`#EAEAEA`}>
        <Login />
      </Box>
    </>
  );
};

export default Signin;
