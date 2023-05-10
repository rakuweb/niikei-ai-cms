// import layer
import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

// type layer
export type StyleProps = BoxProps;
export type DataProps = Record<string, unknown>;
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = ({ children, ...props }) => {
  return (
    <Box as={`span`} {...props}>
      {children}
    </Box>
  );
};
