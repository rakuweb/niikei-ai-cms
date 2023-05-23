import React, { FC, useEffect, useState } from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import LogoutSvg from '../../../public/svg/logout.svg';
import OpenSvg from '../../../public/svg/open_in_new.svg';
import { css } from '@emotion/react';
import { useStore, useUserStore } from 'lib/store';
import { auth } from 'src/firebase';
import router from 'next/router';

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const isOpen = useStore((state) => state.open);
  const currentUser = useUserStore((state) => state.currentUser);

  useEffect(() => {
    const onAuthStateChanged = (user) => {
      if (user) {
        useUserStore.setState({ currentUser: user });
      } else {
        useUserStore.setState({ currentUser: null });
      }
    };

    auth.onAuthStateChanged(onAuthStateChanged);

    return () => {
      auth.onAuthStateChanged(onAuthStateChanged);
    };
  }, []);

  const [userName, setUserName] = useState<string>('');

  const getNameEmail = async () => {
    const user = currentUser;

    try {
      if (user) {
        const db = getFirestore();
        const employeeDocRef = doc(db, 'employees', user.uid);
        const employeeDocSnap = await getDoc(employeeDocRef);

        const ref = employeeDocSnap.data()?.ref;

        const companyEmployeeRef = doc(
          db,
          'company',
          ref,
          'employees',
          user.uid
        );

        const companyEmployeeSnap = await getDoc(companyEmployeeRef);

        if (companyEmployeeSnap.exists()) {
          setUserName(companyEmployeeSnap.data().name);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getNameEmail();
    }
  }, [currentUser]);

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
        <Text fontSize={`${24 / 19.2}vw`}>{userName ? userName : ''}</Text>

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
          bgColor={'#444857'}
          color={'white'}
          borderRadius={'1.4vw'}
          p={'0.35vw 1vw'}
          display={'flex'}
          alignItems={'center'}
          _hover={{ textDecoration: 'none' }}
          onClick={async () => {
            await auth.signOut();
            router.push('/signin');
          }}
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
