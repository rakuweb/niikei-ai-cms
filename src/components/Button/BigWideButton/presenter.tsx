/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Text } from 'components/texts/Text';
import { BoxProps, Flex, Img } from '@chakra-ui/react';

export type PresenterProps = BoxProps & {
  text: string;
  type?: string;
  disabled?: boolean;
};

export const Presenter: FC<PresenterProps> = ({ text, disabled, ...props }) => {
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
        cursor: disabled ? `not-allowed` : `pointer`,
        transition: `0.3s`,
        filter: `opacity(80%)`,
      }}
      as={'button'}
      disabled={disabled}
      {...props}
    >
      <Text letterSpacing={`0`} fontWeight={`400`} fontSize={`${20 / 19.2}vw`}>
        {text}
      </Text>
      <Img w={`0.8vw`} src="/svg/arrowRight.svg" />
    </Flex>
  );
};
