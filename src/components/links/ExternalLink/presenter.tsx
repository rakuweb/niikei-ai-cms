// import layer
import { FC } from 'react';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

// type layer
export type StyleProps = ChakraLinkProps;
export type DataProps = Record<string, unknown>;
export type PresenterProps = StyleProps & DataProps;

// presenter
export const Presenter: FC<PresenterProps> = ({ children, ...props }) => {
  return (
    <ChakraLink
      isExternal
      transition={`all .3s`}
      _hover={{
        cursor: 'pointer',
        filter: `opacity(50%)`,
        textDecoration: 'none',
      }}
      {...props}
    >
      {children}
    </ChakraLink>
  );
};
