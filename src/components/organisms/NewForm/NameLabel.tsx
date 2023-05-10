import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

type NameLabelProps = {
  name: string;
};

export const NameLabel: FC<NameLabelProps> = ({ name }) => {
  return (
    <Flex alignItems={'center'} lineHeight={'1'}>
      <Box fontSize={'20px'} fontWeight={'400'}>
        {name}
      </Box>
      <Box
        fontSize={'12px'}
        bgColor={'#49BAC0'}
        color={'white'}
        p={'5px 12px'}
        borderRadius={'20px'}
        ml={'5px'}
      >
        必須
      </Box>
    </Flex>
  );
};
