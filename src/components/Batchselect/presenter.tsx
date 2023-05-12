/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Text } from 'components/texts/Text';
import { Box, BoxProps, Flex, Select } from '@chakra-ui/react';
import { Image } from 'components/images/Image';

export type PresenterProps = BoxProps;

export const Presenter: FC<PresenterProps> = ({ ...props }) => {
  return (
    <Flex {...props}>
      <Select
        w={`${172 / 19.2}vw`}
        bg={`white`}
        borderColor={`#707070`}
        borderRadius={`${2 / 19.2}vw`}
        h={`30px`}
        fontSize={`${14 / 19.2}vw`}
        color={`#707070`}
      >
        <option value="option1">まとめて削除する</option>
        <option value="option2">まとめて公開</option>
        <option value="option3">まとめて非公開</option>
      </Select>
      <Text
        h={`30px`}
        bg={`#DEDEDE`}
        lineHeight={`${17 / 19.2}vw`}
        color={`#707070`}
        border={`1px solid #707070`}
        borderRadius={`${2 / 19.2}vw`}
        fontSize={`${12 / 19.2}vw`}
        ml={`${8 / 19.2}vw`}
        p={`${6 / 19.2}vw ${12 / 19.2}vw`}
        mt={`${1 / 19.2}vw`}
        _hover={{
          cursor: `pointer`,
          transition: `0.3s`,
          filter: `opacity(60%)`,
        }}
      >
        適応
      </Text>
    </Flex>
  );
};
