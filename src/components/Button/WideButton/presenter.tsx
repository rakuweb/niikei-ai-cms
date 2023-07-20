/* eslint-disable jsx-a11y/alt-text */
import { FC } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

import { Image } from 'components/images/Image';
import { Text } from 'components/texts/Text';

export type PresenterProps = FlexProps & { text: string; type?: string };

export const Presenter: FC<PresenterProps> = ({ text, type, ...props }) => {
  return (
    <Flex
      type={type ?? `submit`}
      color={`white`}
      bg={`#49BAC0`}
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
      as={`button`}
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
