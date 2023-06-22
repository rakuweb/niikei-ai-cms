// import layer
import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import { Text } from 'components/texts/Text';

// type layer
export type StyleProps = BoxProps;
export type DataProps = Record<string, unknown>;
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = ({ children, ...props }) => {
  return (
    <Box bgColor={`red`} borderRadius={`50%`} {...props}>
      <Text color={`white`}>{children}</Text>
    </Box>
  );
};
