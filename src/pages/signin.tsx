import { Box } from '@chakra-ui/react';
import { Login } from 'components/Login';
import { NextPage } from 'next';

type SigninProps = {
  data: {
    email: string;
    password: string;
    name: string;
  };
};

const Signin: NextPage<SigninProps> = () => {
  return (
    <Box w="100vw" h="100vh" bg="#EAEAEA">
      <Login />
    </Box>
  );
};

export default Signin;
