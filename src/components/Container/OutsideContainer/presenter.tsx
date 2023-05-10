/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { useStore } from 'lib/store';

export type PresenterProps = BoxProps;

export const Presenter: FC<PresenterProps> = ({ children, ...props }) => {
  const isOpen = useStore((state) => state.open);
  return (
    <Box
      letterSpacing={`0`}
      width={isOpen ? 'calc(100vw - 2.8vw)' : '100%'}
      transition="0.3s"
      pl={isOpen ? `${294 / 19.2}vw` : `${140 / 19.2}vw`}
      pr={isOpen ? `0` : `${50 / 19.2}vw`}
      pt={`${128 / 19.2}vw`}
      {...props}
    >
      {children}
    </Box>
  );
};
