import React, { FC } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

export type PresenterProps = { pagenumber: number } & FlexProps;

export const Presenter: FC<PresenterProps> = ({ pagenumber, ...props }) => {
  return (
    <Flex
      fontSize={`${14 / 19.2}vw`}
      color={`#222526`}
      bg={`#DEDEDE`}
      w={`${45 / 19.2}vw`}
      h={`${45 / 19.2}vw`}
      borderRadius={`50%`}
      letterSpacing={`0`}
      alignItems={`center`}
      justify={`center`}
      mr={`${10 / 19.2}vw`}
      _hover={{
        transition: `0.1s`,
        cursor: `pointer`,
        border: `1px solid #49BAC0`,
      }}
      {...props}
    >
      {pagenumber}
    </Flex>
  );
};
