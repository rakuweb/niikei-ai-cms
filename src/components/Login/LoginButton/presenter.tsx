// import layer
import { Box, Input } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { FC } from 'react';

// type layer
export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

// presenter
export const Presenter: FC<PresenterProps> = ({ ...props }) => {
  return (
    <>
      <Text color={`white`} fontSize={`${16 / 19.2}vw`} letterSpacing={`0`}>
        <Box
          display={`flex`}
          w={`100%`}
          h={`${50 / 19.2}vw`}
          bg={`#49BAC0`}
          justifyContent={`center`}
          alignItems={`center`}
          borderRadius={`${50 / 19.2}vw`}
          transition={`all .3s`}
          _hover={{
            cursor: `pointer`,
            filter: `opacity(80%)`,
          }}
        >
          ログイン
        </Box>
      </Text>
    </>
  );
};
