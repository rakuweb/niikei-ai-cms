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

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { auth, db } from 'src/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { PresenterProps } from './presenter';
import { useRouter } from 'next/router';

type FormData = {
  name: string;
};

type NameComponentProps = PresenterProps & {
  id: string;
};
export const NameComponent: FC<NameComponentProps> = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
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
        await updateProfile(user, {
          displayName: data.name,
        });
        const docRef = doc(db, 'allowedEmails', id as string);
        await setDoc(docRef, { name: data.name }, { merge: true });
        window.alert('名前が更新されました');
      }
    } catch (error) {
      console.error('Error updating name: ', error);
      alert('エラーが発生しました');
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      w={'650px'}
      color={'#222526'}
      mb={'30px'}
      className="name"
    >
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
  );
};
