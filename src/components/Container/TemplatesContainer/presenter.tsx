/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export type PresenterProps = BoxProps;

export const Presenter: FC<PresenterProps> = ({ children, ...props }) => {
  return (
    <Box
      bg={`white`}
      width={'100%'}
      transition="0.3s"
      borderRadius={`${20 / 19.2}vw`}
      overflow={`hidden`}
      {...props}
    >
      {children}
    </Box>
  );
};
