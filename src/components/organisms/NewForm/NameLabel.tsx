import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

type NameLabelProps = {
  name: string;
};

export const NameLabel: FC<NameLabelProps> = ({ name }) => {
  return (
    <Flex alignItems={'center'} lineHeight={'1'}>
      <Box fontSize={'1vw'} fontWeight={'400'}>
        {name}
      </Box>
      <Box
        fontSize={'0.6vw'}
        bgColor={'#49BAC0'}
        color={'white'}
        p={'0.25vw 0.6vw'}
        borderRadius={'1vw'}
        ml={'0.25vw'}
      >
        必須
      </Box>
    </Flex>
  );
};
