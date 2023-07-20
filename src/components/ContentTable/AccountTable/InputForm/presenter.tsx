// import layer
import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

import Subtitle from '../Subtitle';
import { WideButton } from 'components/Button/WideButton';

// type layer
export type StyleProps = BoxProps;
export type DataProps = {
  title: string;
};
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <Box mb={`${50 / 19.2}vw`} as={`form`} {...props}>
      <Subtitle title={title} />
      {children}
      <WideButton text={`変更する`} w={`${200 / 19.2}vw`} />
    </Box>
  );
};
