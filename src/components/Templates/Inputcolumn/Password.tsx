import { HStack, Box } from '@chakra-ui/react';
import AccountInput from './AccountInput';

const Password = ({ text, ...props }) => {
  return (
    <HStack mb={`${20 / 19.2}vw`} spacing={`${40 / 19.2}vw`} {...props}>
      <Box w={{ lg: `${110 / 10.2}vw`, xl: `${180 / 19.2}vw` }}>{text}</Box>
      <AccountInput type={'password'} />
    </HStack>
  );
};

export default Password;
