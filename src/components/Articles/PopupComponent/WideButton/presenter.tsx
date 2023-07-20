/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Text } from 'components/texts/Text';
import { FlexProps, Button, ButtonProps, Flex, Image } from '@chakra-ui/react';
// import { Image } from 'components/images/Image';

export type PresenterProps = ButtonProps & { text: string };

export const Presenter: FC<PresenterProps> = ({ text, ...props }) => {
  return (
    <Button
      display={`flex`}
      justifyContent={`space-between`}
      color={`white`}
      bg={`#49BAC0`}
      h={`${37 / 19.2}vw`}
      letterSpacing={`0`}
      alignItems={`center`}
      p={`1.5vw`}
      borderRadius={`${50 / 19.2}vw`}
      w={'100%'}
      mt={'1vw'}
      _hover={{
        cursor: `pointer`,
        transition: `0.3s`,
        filter: `opacity(80%)`,
      }}
      as={`button`}
      {...props}
    >
      <Text fontSize={{ base: '1vw' }}>{text}</Text>
      <Image w={'0.6vw'} h={'0.6vw'} src="/images/button/arrow.svg" />
    </Button>
  );
};
