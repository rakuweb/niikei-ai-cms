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
import { auth, db } from 'src/firebase';
import { updateEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { PresenterProps } from './presenter';
import { useRouter } from 'next/router';

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

  const onSubmit = async (data: FormData) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateEmail(user, data.email);
        const docRef = doc(
          db,
          'companies',
          'employees',
          'employees',
          id as string
        );
        await setDoc(docRef, { email: data.email }, { merge: true });
        window.alert('メールアドレスが更新されました');
        setEmail(data.email);
      }
    } catch (error) {
      console.error('Error updating email: ', error);
      alert('制限時間を過ぎました。ログインし直して再度変更して下さい。');
    }
  };

  const handleEmailSubmit = (e) => {
    e.stopPropagation();
    handleSubmit(onSubmit)();
  };
  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      w={'650px'}
      color={'#222526'}
      mb={'30px'}
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
              <FormErrorMessage fontSize={'10px'}>
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
    </Box>
  );
};
