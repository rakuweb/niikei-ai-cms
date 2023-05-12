import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  Input,
  FormLabel,
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
  IconButton,
  InputGroup,
  InputRightElement,
  Select,
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { WideButton } from 'components/Button/WideButton';
import { collection, addDoc, getDocs, getFirestore } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from 'src/firebase';
import { useUserStore } from 'lib/store';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { NameLabel } from './NameLabel';

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
  };
};

export const Presenter: FC<PresenterProps> = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w={'650px'}
        color={'#222526'}
      >
        {' '}
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>
            <Flex alignItems={'center'}>
              <Text w={'35%'}>現在のユーザー名</Text>
              <Text textAlign={'left'} w={'65%'}>
                {data.name}
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
        <Box as={'button'} w={`${140 / 19.2}vw`} type="submit">
          <WideButton text={`変更する`} w={`${140 / 19.2}vw`} />
        </Box>
      </Box>
      <FormControl isInvalid={!!errors.role} mb={'20px'}>
        <FormLabel>
          <Flex alignItems={'center'}>
            <Text w={'35%'}>現在のRole</Text>
            <Text textAlign={'left'} w={'65%'}>
              {data.role}
            </Text>
          </Flex>
          <Flex alignItems={'center'}>
            <Text w={'35%'}>変更後のRole</Text>
            <Select
              w={'65%'}
              placeholder="Roleを選択"
              {...register('role', { required: true })}
              borderRadius={'none'}
            >
              <option value="確認者">確認者</option>
              <option value="編集者">編集者</option>
            </Select>
          </Flex>
        </FormLabel>
        <FormErrorMessage fontSize={'10px'}>
          Roleを選択してください
        </FormErrorMessage>
      </FormControl>
      <Box as={'button'} w={`${140 / 19.2}vw`} type="submit">
        <WideButton text={`変更する`} w={`${140 / 19.2}vw`} />
      </Box>
      <FormControl isInvalid={!!errors.name} mb={'20px'}>
        <FormLabel>
          <Flex alignItems={'center'}>
            <Text w={'35%'}>現在のメールアドレス</Text>
            <Text textAlign={'left'} w={'65%'}>
              {data.email}
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
      <FormControl isInvalid={!!errors.password} mb={'20px'}>
        <FormLabel>
          <Flex alignItems={'center'}>
            <Text w={'35%'}>現在のパスワード</Text>
            <Text textAlign={'left'} w={'65%'}>
              {data.password}
            </Text>
          </Flex>
          <Flex alignItems={'center'}>
            <Text w={'35%'}>変更後のパスワード</Text>
            <InputGroup w={'65%'}>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="パスワードを入力"
                {...register('password', {
                  required: 'パスワードを入力してください',
                  minLength: {
                    value: 6,
                    message: 'パスワードは6文字以上で入力してください',
                  },
                })}
                borderRadius={'none'}
              />
              <InputRightElement width="3rem">
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  h="1.75rem"
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
          </Flex>
          {errors.password && (
            <FormErrorMessage fontSize={'10px'}>
              {errors.password.message}
            </FormErrorMessage>
          )}
        </FormLabel>
      </FormControl>
      <Box as={'button'} w={`${140 / 19.2}vw`} type="submit">
        <WideButton text={`変更する`} w={`${140 / 19.2}vw`} />
      </Box>
    </>
  );
};
