import React, { FC } from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import LogoutSvg from '../../../public/svg/logout.svg';
import OpenSvg from '../../../public/svg/open_in_new.svg';
import { css } from '@emotion/react';
import { useStore } from 'lib/store';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const isOpen = useStore((state) => state.open);

  return (
    <Box css={styles}>
      <Flex
        bgColor={'#DEDEDE'}
        position={'fixed'}
        width={isOpen ? 'calc(100vw - 13vw)' : '100%'}
        transition="0.3s"
        right={'0'}
        p={'1.05vw 1.05vw 1.05vw 8vw'}
        alignItems={'center'}
        className="flex"
      >
        <Text fontSize={'1.1vw'}>山田太郎</Text>

        <Link
          ml={'auto'}
          mr={'1.4vw'}
          textDecoration={'underline'}
          fontSize={'1vw'}
          display={'flex'}
          alignItems={'center'}
        >
          サイトを表示する
          <Box as="span" pr={'0.35vw'} />
          <OpenSvg fontSize={'1vw'} />
        </Link>
        <Link
          bgColor={'#444857'}
          color={'white'}
          fontSize={'1vw'}
          borderRadius={'1.4vw'}
          p={'0.35vw 1vw'}
          display={'flex'}
          alignItems={'center'}
          _hover={{ textDecoration: 'none' }}
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
    a {
      &:hover {
        color: #49bac0;
        transition: 0.3s;
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
