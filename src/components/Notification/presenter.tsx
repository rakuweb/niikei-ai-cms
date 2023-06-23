// import layer
import { FC } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

import { Text } from 'components/texts/Text';

// type layer
export type StyleProps = FlexProps;
export type DataProps = Record<string, unknown>;
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = ({ children, ...props }) => {
  return (
    <Flex
      w={{ lg: `${20 / 19.2}vw` }}
      h={{ lg: `${20 / 19.2}vw` }}
      bgColor={`red`}
      borderRadius={`50%`}
      justify={`center`}
      align={`center`}
      {...props}
    >
      <Text
        fontWeight={`bold`}
        fontSize={{ lg: `${14 / 19.2}vw` }}
        color={`white`}
        lineHeight={1}
      >
        {children}
      </Text>
    </Flex>
  );
};
