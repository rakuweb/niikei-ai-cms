import { HStack, Box } from '@chakra-ui/react';
import AccountInput from './AccountInput';
import { UseFormRegisterReturn } from 'react-hook-form';

export type Props = {
  message?: string;
  registers: UseFormRegisterReturn;
};

const Password = ({ text, message, registers, ...props }) => {
  return (
    <HStack mb={`${20 / 19.2}vw`} spacing={`${40 / 19.2}vw`} {...props}>
      <Box w={{ lg: `${110 / 10.2}vw`, xl: `${180 / 19.2}vw` }}>{text}</Box>
      <Box>
        <AccountInput registers={registers} type={'password'} />
        {message && <Box color={`red`}>{message}</Box>}
      </Box>
    </HStack>
  );
};

export default Password;
