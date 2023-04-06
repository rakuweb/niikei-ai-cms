// import layer
import { FC } from 'react';
import NextImage from 'next/image';
import type { ImageProps } from 'next/image';
import { Box, BoxProps } from '@chakra-ui/react';

// type layer
export type StyleProps = BoxProps;
export type DataProps = { image: ImageProps };
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = ({ image, ...props }) => {
  return (
    <Box position={`relative`} {...props}>
      <NextImage loading={`lazy`} {...image} />
    </Box>
  );
};
