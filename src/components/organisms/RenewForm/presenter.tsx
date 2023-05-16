import React, { FC, useState } from 'react';
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
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from 'src/firebase';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import { NameComponent } from './NameComponent';
import { EmailComponent } from './EmailComponent';
import { RoleComponent } from './RoleComponent';
import { PasswordComponent } from './PasswordComponent';

type FormData = {
  name: string;
  email: string;
  role: string;
  password: string;
};
export type PresenterProps = {
  data: FormData;
  id: string;
};

export const Presenter: FC<PresenterProps> = ({ data, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  // const onSubmit = async (data: FormData) => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, data.email, data.password);
  //     const docRef = collection(db, 'companies', 'employees', 'employees');
  //     await addDoc(docRef, { ...data });
  //     window.alert('送信しました');
  //   } catch (error) {
  //     console.error('Error adding document: ', error);
  //     alert('エラーが発生しました');
  //   }
  // };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <NameComponent data={data} id={id} />
      <RoleComponent data={data} id={id} />
      <EmailComponent data={data} id={id} />
      <PasswordComponent data={data} id={id} />
    </>
  );
};
