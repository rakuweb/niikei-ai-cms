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
import { useForm } from 'react-hook-form';
import { WideButton } from 'components/Button/WideButton';
import { doc, setDoc } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from 'src/firebase';
import { NameLabel } from './NameLabel';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { PasswordPopupComponent } from '../RenewForm/PasswordPopupComponent';

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
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const { user } = userCredential;
      const { password, ...dataWithoutPassword } = data;
      if (user) {
        const companyDocRef = doc(db, 'companies', user.uid);
        const employeeDocRef = doc(db, 'employees', user.uid);
        await setDoc(companyDocRef, dataWithoutPassword);
        await setDoc(employeeDocRef, dataWithoutPassword);

        window.alert('送信しました。サインアウトします。');
        auth.signOut();
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      alert(error);
      alert(error);
    }
  };

  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w={'30vw'}
        w={'30vw'}
        color={'#222526'}
      >
        <FormControl isInvalid={!!errors.name} mb={'1vw'}>
        <FormControl isInvalid={!!errors.name} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="ユーザ名" />
            <Input
              mt={'0.5vw'}
              mt={'0.5vw'}
              type="text"
              placeholder="ユーザ名を入力"
              {...register('name', { required: true })}
              borderRadius={'none'}
            />
          </FormLabel>
          <FormErrorMessage fontSize={'0.5vw'}>
          <FormErrorMessage fontSize={'0.5vw'}>
            ユーザ名を入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} mb={'1vw'}>
        <FormControl isInvalid={!!errors.email} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="Email" />
            <Input
              mt={'0.5vw'}
              mt={'0.5vw'}
              type="email"
              placeholder="Emailを入力"
              {...register('email', {
                required: true,
                pattern: /^[^@]+@[^@]+\.[^@]+$/,
              })}
              borderRadius={'none'}
            />
          </FormLabel>
          <FormErrorMessage fontSize={'0.5vw'}>
          <FormErrorMessage fontSize={'0.5vw'}>
            正しい形式でメールアドレスを入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.role} mb={'1vw'}>
        <FormControl isInvalid={!!errors.role} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="Role" />
            <Select
              mt={'0.5vw'}
              mt={'0.5vw'}
              placeholder="Roleを選択"
              {...register('role', { required: true })}
              borderRadius={'none'}
            >
              <option value="確認者">確認者</option>
              <option value="編集者">編集者</option>
            </Select>
          </FormLabel>
          <FormErrorMessage fontSize={'0.5vw'}>
          <FormErrorMessage fontSize={'0.5vw'}>
            Roleを選択してください
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} mb={'1vw'}>
        <FormControl isInvalid={!!errors.password} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="パスワード" />
            <InputGroup mt={'0.5vw'}>
            <InputGroup mt={'0.5vw'}>
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
              <InputRightElement width="2.4vw">
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  minH="1.2vw"
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <FormErrorMessage fontSize={'0.5vw'}>
              <FormErrorMessage fontSize={'0.5vw'}>
                {errors.password.message}
              </FormErrorMessage>
            )}
          </FormLabel>
        </FormControl>

        <Box as={'button'} w={`${140 / 19.2}vw`} type="submit">
          <WideButton text={`送信する`} w={`${140 / 19.2}vw`} />
        </Box>
      </Box>
      {showPopup && <PasswordPopupComponent isOpen={true} />}
    </>
  );
};
