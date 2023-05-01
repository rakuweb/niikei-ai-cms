/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Pagecircle } from './Pagecircle';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  return (
    <Flex
      w={`fit-content`}
      h={`${37 / 19.2}vw`}
      letterSpacing={`0`}
      mt={`${40 / 19.2}vw`}
      mx={`auto`}
      alignItems={`center`}
      fontSize={`${16 / 19.2}vw`}
    >
      <Pagecircle pagenumber="1" />
      <Pagecircle pagenumber="2" />
      <Pagecircle pagenumber="3" />
      <Pagecircle pagenumber="4" />
      <Box ml={`${10 / 19.2}vw`} mr={`${17 / 19.2}vw`}>{`…`}</Box>
      <Box
        _hover={{
          cursor: `pointer`,
          color: `#49BAC0`,
          borderBottom: `1px`,
          transition: `0.3s`,
        }}
      >{`次へ`}</Box>
    </Flex>
  );
};
