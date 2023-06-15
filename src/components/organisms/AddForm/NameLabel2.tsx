import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

type NameLabelProps = {
  name: string;
};

export const NameLabel2: FC<NameLabelProps> = ({ name }) => {
  return (
    <Flex alignItems={'center'} lineHeight={'1'}>
      <Box fontSize={'1vw'} fontWeight={'400'}>
        {name}
      </Box>
    </Flex>
  );
};
