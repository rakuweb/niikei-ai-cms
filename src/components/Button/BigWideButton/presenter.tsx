/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Text } from 'components/texts/Text';
import { BoxProps, Flex } from '@chakra-ui/react';
import { Image } from 'components/images/Image';

export type PresenterProps = BoxProps & { text: string; src: string };

export const Presenter: FC<PresenterProps> = ({ text, src, ...props }) => {
  return (
    <Flex
      color={`white`}
      bg={`#49BAC0`}
      h={`${50 / 19.2}vw`}
      alignItems={`center`}
      p={`0 ${14 / 19.2}vw 0 ${20 / 19.2}vw`}
      justify={`space-between`}
      borderRadius={`${50 / 19.2}vw`}
      _hover={{
        cursor: `pointer`,
        transition: `0.3s`,
        filter: `opacity(80%)`,
      }}
      {...props}
    >
      <Text letterSpacing={`0`} fontWeight={`400`} fontSize={`${20 / 19.2}vw`}>
        {text}
      </Text>
      <Image
        w={`${14 / 19.2}vw`}
        h={`${14 / 19.2}vw`}
        image={{
          src: src,
          width: 14,
          height: 14,
          alt: `右矢印`,
        }}
      />
    </Flex>
  );
};
