// import layer
import { FC } from 'react';
import { Text, TextProps } from '@chakra-ui/react';

// type layer
export type StyleProps = TextProps;
export type DataProps = Record<string, unknown>;
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = ({ children, ...props }) => {
  return (
    <Text
      fontFamily={`'Noto Sans JP', sans-serif;`}
      lineHeight={`1.5em`}
      letterSpacing={`0.1em`}
      fontSize={{ base: `4.26vw`, lg: `1.125rem` }}
      fontWeight={500}
      as={`div`}
      {...props}
    >
      {children}
    </Text>
  );
};
