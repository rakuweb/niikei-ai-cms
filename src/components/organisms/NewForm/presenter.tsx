import React, { FC, useState } from 'react';
import {
  Box,
  Input,
  Select,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';
import { WideButton } from 'components/Button/WideButton';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from 'src/firebase';
import { NameLabel } from './NameLabel';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';

type FormData = {
  name: string;
  email: string;
  role: string;
  password: string;
};
export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

export const Presenter: FC<PresenterProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w={'600px'}
        color={'#222526'}
      >
        <FormControl isInvalid={!!errors.name} mb={'20px'}>
          <FormLabel>
            <NameLabel name="ユーザ名" />
            <Input
              mt={'10px'}
              type="text"
              placeholder="ユーザ名を入力"
              {...register('name', { required: true })}
              borderRadius={'none'}
            />
          </FormLabel>
          <FormErrorMessage fontSize={'10px'}>
            ユーザ名を入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} mb={'20px'}>
          <FormLabel>
            <NameLabel name="Email" />
            <Input
              mt={'10px'}
              type="email"
              placeholder="Emailを入力"
              {...register('email', {
                required: true,
                pattern: /^[^@]+@[^@]+\.[^@]+$/,
              })}
              borderRadius={'none'}
            />
          </FormLabel>
          <FormErrorMessage fontSize={'10px'}>
            正しい形式でメールアドレスを入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.role} mb={'20px'}>
          <FormLabel>
            <NameLabel name="Role" />
            <Select
              mt={'10px'}
              placeholder="Roleを選択"
              {...register('role', { required: true })}
              borderRadius={'none'}
            >
              <option value="確認者">確認者</option>
              <option value="編集者">編集者</option>
            </Select>
          </FormLabel>
          <FormErrorMessage fontSize={'10px'}>
            Roleを選択してください
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} mb={'20px'}>
          <FormLabel>
            <NameLabel name="パスワード" />
            <InputGroup mt={'10px'}>
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
            {errors.password && (
              <FormErrorMessage fontSize={'10px'}>
                {errors.password.message}
              </FormErrorMessage>
            )}
          </FormLabel>
        </FormControl>

        <Box as={'button'} w={`${140 / 19.2}vw`} type="submit">
          <WideButton text={`送信する`} w={`${140 / 19.2}vw`} />
        </Box>
      </Box>
    </>
  );
};
