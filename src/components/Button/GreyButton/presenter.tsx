/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Text } from 'components/texts/Text';
import { BoxProps, Flex } from '@chakra-ui/react';
import { Image } from 'components/images/Image';

export type PresenterProps = BoxProps & { text: string };

export const Presenter: FC<PresenterProps> = ({ text, ...props }) => {
  return (
    <Flex
      color={`white`}
      bg={`#8D9696`}
      h={`${37 / 19.2}vw`}
      letterSpacing={`0`}
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
      <Text fontSize={`${14 / 19.2}vw`}>{text}</Text>
      <Image
        w={`${10 / 19.2}vw`}
        h={`${10 / 19.2}vw`}
        image={{
          src: `/images/button/rightarrow.png`,
          width: 10,
          height: 10,
          alt: `右矢印`,
        }}
      />
    </Flex>
  );
};
