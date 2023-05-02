/* eslint-disable jsx-a11y/alt-text */
import React, { FC, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Pagecircle } from './Pagecircle';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const [pagenumber, setPagenumber] = useState(1);
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
      <Box
        display={pagenumber == 1 ? `none` : `block`}
        onClick={() => setPagenumber(pagenumber - 1)}
        _hover={{
          cursor: `pointer`,
          color: `#49BAC0`,
          borderBottom: `1px`,
        }}
      >{`戻る`}</Box>
      <Box
        display={pagenumber == 1 ? `none` : `block`}
        ml={`${10 / 19.2}vw`}
        mr={`${17 / 19.2}vw`}
      >{`…`}</Box>

      <Pagecircle
        pagenumber={pagenumber}
        _hover={{}}
        border={`1px solid #49BAC0`}
      />
      <Pagecircle
        pagenumber={pagenumber + 1}
        onClick={() => setPagenumber(pagenumber + 1)}
      />
      <Pagecircle
        pagenumber={pagenumber + 2}
        onClick={() => setPagenumber(pagenumber + 2)}
      />
      <Pagecircle
        pagenumber={pagenumber + 3}
        onClick={() => setPagenumber(pagenumber + 3)}
      />
      <Box ml={`${10 / 19.2}vw`} mr={`${17 / 19.2}vw`}>{`…`}</Box>
      <Box
        onClick={() => setPagenumber(pagenumber + 1)}
        _hover={{
          cursor: `pointer`,
          color: `#49BAC0`,
          borderBottom: `1px`,
        }}
      >{`次へ`}</Box>
    </Flex>
  );
};
