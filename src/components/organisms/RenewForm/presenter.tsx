import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  Input,
  Select,
  FormLabel,
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
  FormControl,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { WideButton } from 'components/Button/WideButton';
import { collection, addDoc, getDocs, getFirestore } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from 'src/firebase';
import { NameLabel } from './NameLabel';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { useUserStore } from 'lib/store';

type FormData = {
  name: string;
  email: string;
  role: string;
  password: string;
};
export type PresenterProps = {
  data: {
    role: string;
    email: string;
    name: string;
    password: string;
  }[];
};

export const Presenter: FC<PresenterProps> = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const [showPassword, setShowPassword] = useState(false);
  const currentUser = useUserStore((state) => state.currentUser);

  const onSubmit = async (data: FormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const docRef = collection(db, 'allowedEmails');
      await addDoc(docRef, { ...data });
      window.alert('送信しました');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('エラーが発生しました');
    }
  };
  const [usersName, setUserName] = useState<string>('');

  const getNameEmail = async () => {
    const user = currentUser;
    if (user) {
      const db = getFirestore();
      const usersRef = collection(db, 'allowedEmails');
      const querySnapshot = await getDocs(usersRef);
      querySnapshot.forEach((doc) => {
        if (doc.data().email === user.email) {
          setUserName(doc.data().name);
        }
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      getNameEmail();
    }
  }, [currentUser]);

  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w={'650px'}
        color={'#222526'}
      >
        {' '}
        <FormControl isInvalid={!!errors.name} mb={'20px'}>
          <FormLabel>
            <Flex alignItems={'center'}>
              <Text w={'35%'}>現在のユーザー名</Text>
              <Text textAlign={'left'} w={'65%'}>
                {usersName ? usersName : ''}
              </Text>
            </Flex>
            <Flex alignItems={'center'}>
              <Text w={'35%'}>変更後のユーザー名</Text>
              <Input
                w={'65%'}
                type="text"
                placeholder="ユーザ名を入力"
                {...register('name', { required: true })}
                borderRadius={'none'}
              />
            </Flex>
          </FormLabel>
          <FormErrorMessage fontSize={'10px'}>
            ユーザ名を入力してください
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.name} mb={'20px'}>
          <FormLabel>
            <Flex alignItems={'center'}>
              <Text w={'35%'}>現在のメールアドレス</Text>
              <Text textAlign={'left'} w={'65%'}>
                {currentUser ? currentUser.email : ''}
              </Text>
            </Flex>
            <Flex alignItems={'center'}>
              <Text w={'35%'}>変更後のメールアドレス</Text>
              <Input
                w={'65%'}
                type="email"
                placeholder="Emailを入力"
                {...register('email', {
                  required: true,
                  pattern: /^[^@]+@[^@]+\.[^@]+$/,
                })}
                borderRadius={'none'}
              />
            </Flex>
          </FormLabel>
          <FormErrorMessage fontSize={'10px'}>
            正しい形式でメールアドレスを入力してください
          </FormErrorMessage>
        </FormControl>
        <Box as={'button'} w={`${140 / 19.2}vw`} type="submit">
          <WideButton text={`変更する`} w={`${140 / 19.2}vw`} />
        </Box>
      </Box>
    </>
  );
};
