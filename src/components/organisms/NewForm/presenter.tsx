import React, { FC, useEffect, useState } from 'react';
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
  Switch,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { WideButton } from 'components/Button/WideButton';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from 'src/firebase';
import { NameLabel } from './NameLabel';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { PasswordPopupComponent } from '../RenewForm/PasswordPopupComponent';

import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useNameStore } from '../../../lib/store';
type FormData = {
  name: string;
  email: string;
  role: string;
  password: string;
  is_company: boolean;
  ref: string;
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
  const [showAdditionalField, setShowAdditionalField] = useState(false);
  const currentUserUid = useNameStore((state) => state.currentUserUid);
  const setCurrentUserUid = useNameStore((state) => state.setCurrentUserUid);
  const { control } = useForm();
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setCurrentUserUid(user.uid);
      } else {
        setCurrentUserUid('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      let userToken = '';
      if (currentUser) {
        const tokenResult = await currentUser.getIdTokenResult();
        userToken = tokenResult.token;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const { user } = userCredential;
      const { password, is_company, ...dataWithoutPassword } = data;
      if (user) {
        const auth = getAuth();

        let companyDocRef;
        if (is_company) {
          companyDocRef = doc(db, 'companies', user.uid, 'employees', user.uid);
        } else {
          companyDocRef = doc(
            db,
            'companies',
            currentUserUid,
            'employees',
            user.uid
          );
        }

        const employeeDocRef = doc(db, 'users', user.uid);
        await setDoc(companyDocRef, {
          ...dataWithoutPassword,
        });

        await setDoc(employeeDocRef, {
          is_company: data.is_company,
          ref: currentUserUid,
        });

        if (!is_company) {
          await setDoc(employeeDocRef, {
            is_company: data.is_company,
            ref: currentUserUid,
          });
        }

        window.alert('送信しました。サインアウトします。');

        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      alert(error);
    }
  };

  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w={'30vw'}
        color={'#222526'}
      >
        <FormControl
          isInvalid={!!errors.is_company}
          mb={'1vw'}
          display={'none'}
        >
          <FormLabel>
            is_company
            <Switch
              mt={'0.5vw'}
              colorScheme="teal"
              {...register('is_company')}
              onChange={() => setShowAdditionalField(!showAdditionalField)}
              isChecked={showAdditionalField}
            />
          </FormLabel>
        </FormControl>

        <FormControl isInvalid={!!errors.name} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="ユーザ名" />
            <Input
              mt={'0.5vw'}
              type="text"
              placeholder="ユーザ名を入力"
              {...register('name', { required: true })}
              borderRadius={'none'}
            />
          </FormLabel>
          <FormErrorMessage fontSize={'0.5vw'}>
            ユーザ名を入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.ref} mb={'1vw'} display={'none'}>
          <FormLabel>
            <NameLabel name="ref" />
            <Controller
              control={control}
              name="ref"
              render={({ field }) => (
                <Input
                  mt={'0.5vw'}
                  type="text"
                  placeholder="refを入力"
                  {...field}
                  borderRadius={'ref'}
                  value={field.value || currentUserUid}
                />
              )}
            />
          </FormLabel>
          <FormErrorMessage fontSize={'0.5vw'}>
            refを入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="Email" />
            <Input
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
            正しい形式でメールアドレスを入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.role} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="Role" />
            <Select
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
            Roleを選択してください
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="パスワード" />
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
