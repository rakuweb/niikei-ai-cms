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
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
  const [name, setName] = useState(data.name);
  useEffect(() => {
    setName(data.name);
  }, [data.name]);
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
        const employeeDocRef = doc(db, 'users', user.uid);
        const employeeDocSnap = await getDoc(employeeDocRef);
        const ref = employeeDocSnap.data()?.company_ref;
        const companyDocRef = doc(ref, 'employees', id as string);
        await setDoc(companyDocRef, { name: data.name }, { merge: true });
        window.alert('名前が更新されました');
        setName(data.name);
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
      w={'35vw'}
      color={'#222526'}
      mb={'1.5vw'}
      className="name"
    >
      <Box fontSize={'1vw'} mb={'0.5vw'}>
        名前
      </Box>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel>
          <Flex alignItems={'center'} mb={'1vw'}>
            <Text w={'35%'} fontSize={'0.8vw'}>
              現在の名前
            </Text>
            <Text textAlign={'left'} w={'65%'} fontSize={'0.8vw'}>
              {name}
            </Text>
          </Flex>
          <Flex alignItems={'center'} mb={'1vw'}>
            <Text w={'35%'} fontSize={'0.8vw'}>
              変更後の名前
            </Text>
            <Box w={'65%'}>
              <Input
                type="text"
                placeholder="名前を入力"
                {...register('name', { required: true })}
                borderRadius={'none'}
                fontSize={'0.8vw'}
              />
              <FormErrorMessage fontSize={'0.5vw'}>
                ユーザ名を入力してください
              </FormErrorMessage>
            </Box>
          </Flex>
        </FormLabel>
      </FormControl>
      <Box as={'button'} w={`10vw`} type="submit" mt={'1vw'}>
        <WideButton text={`変更する`} w={`10vw`} />
      </Box>
    </Box>
  );
};
