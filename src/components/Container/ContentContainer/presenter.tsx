/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { useStore } from 'lib/store';

export type PresenterProps = BoxProps;

export const Presenter: FC<PresenterProps> = ({ children, ...props }) => {
  // const isOpen = useStore((state) => state.open);
  return (
    <Box
      bg={`white`}
      width={'100%'}
      transition="0.3s"
      borderRadius={`${20 / 19.2}vw`}
      py={`${40 / 19.2}vw`}
      px={`${30 / 19.2}vw`}
      {...props}
    >
      {children}
    </Box>
  );
};
