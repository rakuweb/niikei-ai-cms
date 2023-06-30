import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  FormErrorMessage,
  Text,
  Box,
} from '@chakra-ui/react';
import { WideButton } from 'components/Button/WideButton';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { db } from 'src/firebase';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { PresenterProps } from './presenter';
import { useRouter } from 'next/router';
import { PasswordPopupComponent } from './PasswordPopupComponent';
type FormData = {
  email: string;
};

type EmailComponentProps = PresenterProps & {
  id: string;
};
export const EmailComponent: FC<EmailComponentProps> = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [email, setEmail] = useState(data.email);
  useEffect(() => {
    setEmail(data.email);
  }, [data.email]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const API_URL = '/api/update-user-email';

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: id,
          newEmail: data.email,
        }),
      });

      if (response.ok) {
        const employeeDocRef = doc(db, 'users', id as string);
        const employeeDocSnap = await getDoc(employeeDocRef);
        const ref = employeeDocSnap.data()?.company_ref;
        const companyDocRef = doc(ref, 'employees', id as string);
        await setDoc(companyDocRef, { email: data.email }, { merge: true });
        window.alert('メールアドレスが更新されました');
        setEmail(data.email);
      } else {
        throw new Error('メールアドレスの更新に失敗しました');
      }
    } catch (error) {
      console.error('Error updating email: ', error);
      window.alert('再ログイン後もう一度ご入力下さい');
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleEmailSubmit = (e) => {
    e.stopPropagation();
    handleSubmit(onSubmit)();
  };
  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      w={'45vw'}
      color={'#222526'}
      mb={'1.5vw'}
      className="email"
    >
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>
          <Flex alignItems={'center'}>
            <Text w={'35%'}>現在のメールアドレス</Text>
            <Text textAlign={'left'} w={'65%'}>
              {email}
            </Text>
          </Flex>
          <Flex alignItems={'center'}>
            <Text w={'35%'}>変更後のメールアドレス</Text>
            <Box w={'65%'}>
              <Input
                type="email"
                placeholder="メールアドレスを入力"
                {...register('email', { required: true })}
                borderRadius={'none'}
              />
              <FormErrorMessage fontSize={'0.5vw'}>
                メールアドレスを入力してください
              </FormErrorMessage>
            </Box>
          </Flex>
        </FormLabel>
      </FormControl>
      <Box
        as={'button'}
        w={`${140 / 19.2}vw`}
        type="button"
        onClick={handleEmailSubmit}
      >
        <WideButton text={`変更する`} w={`${140 / 19.2}vw`} />
      </Box>
      {showPopup && <PasswordPopupComponent isOpen={true} />}
    </Box>
  );
};
