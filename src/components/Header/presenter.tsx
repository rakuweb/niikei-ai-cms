import React, { FC } from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import LogoutSvg from '../../../public/svg/logout.svg';
import OpenSvg from '../../../public/svg/open_in_new.svg';
import { css } from '@emotion/react';
import { useStore } from 'lib/store';
import { auth } from 'src/firebase';
export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const isOpen = useStore((state) => state.open);
  const currentUser = auth.currentUser;
  return (
    <Box css={styles}>
      <Flex
        bgColor={'#DEDEDE'}
        position={'fixed'}
        width={isOpen ? 'calc(100vw - 9vw)' : '100%'}
        transition="0.3s"
        right={'0'}
        h={`${102 / 19.2}vw`}
        pl={`${140 / 19.2}vw`}
        pr={`${54 / 19.2}vw`}
        alignItems={'center'}
        className="flex"
      >
        <Text fontSize={`${24 / 19.2}vw`}>
          {currentUser ? currentUser.displayName : ''}
        </Text>

        <Link
          ml={'auto'}
          mr={'1.4vw'}
          borderBottom={`1px solid`}
          display={'flex'}
          alignItems={'center'}
        >
          サイトを表示する
          <Box as="span" pr={'0.35vw'} />
          <OpenSvg fontSize={'1vw'} />
        </Link>
        <Link
          as="button"
          bgColor={'#444857'}
          color={'white'}
          borderRadius={'1.4vw'}
          p={'0.35vw 1vw'}
          display={'flex'}
          alignItems={'center'}
          _hover={{ textDecoration: 'none' }}
          onClick={() => auth.signOut()}
        >
          ログアウト
          <Box as="span" pr={'0.35vw'} />
          <LogoutSvg fontSize={'1vw'} />
        </Link>
      </Flex>
    </Box>
  );
};

const styles = css`
  .flex {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: ${16 / 19.2}vw;
    a {
      &:hover {
        color: #49bac0;
        transition: 0.3s;
        text-decoration: none;
        svg {
          path {
            fill: #49bac0;
            transition: 0.3s;
          }
        }
      }
    }
  }
`;
