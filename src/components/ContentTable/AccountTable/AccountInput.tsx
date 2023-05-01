import { Input } from '@chakra-ui/react';

const AccountInput = ({ ...props }) => {
  return (
    <Input
      bg={`white`}
      h={`${44 / 19.2}vw`}
      w={`${424 / 19.2}vw`}
      fontSize={`${16 / 19.2}vw`}
      borderRadius={`0`}
      borderColor={`#d6d6d6`}
      {...props}
    />
  );
};

export default AccountInput;
