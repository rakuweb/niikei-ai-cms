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
import router from 'next/router';

type FormData = {
  name: string;
};

type NameComponentProps = PresenterProps & {
  id: string;
};
export const NameComponent: FC<NameComponentProps> = ({ data }) => {
  const { id } = router.query;

  const [name, setName] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  useEffect(() => {
    const user = auth.currentUser;
    const fetchName = async () => {
      try {
        const employeeDocRef = doc(db, 'employees', user.uid);
        const employeeDocSnap = await getDoc(employeeDocRef);
        const ref = employeeDocSnap.data()?.ref;

        if (ref) {
          const companyDocRef = doc(
            db,
            'company',
            ref,
            'employees',
            id as string
          );
          const companyDocSnap = await getDoc(companyDocRef);

          if (companyDocSnap.exists()) {
            setName(companyDocSnap.data()?.name || '');
          }
        }
      } catch (error) {
        console.error('Error fetching name: ', error);
      }
    };

    fetchName();
  }, [id]);

  const onSubmit = async (data: FormData) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          displayName: data.name,
        });
        const employeeDocRef = doc(db, 'employees', user.uid);
        const employeeDocSnap = await getDoc(employeeDocRef);
        const ref = employeeDocSnap.data()?.ref;
        const companyDocRef = doc(
          db,
          'company',
          ref,
          'employees',
          id as string
        );
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
      w={'45vw'}
      color={'#222526'}
      mb={'1.5vw'}
      className="name"
    >
      <FormControl isInvalid={!!errors.name}>
        <FormLabel>
          <Flex alignItems={'center'}>
            <Text w={'35%'}>現在のユーザー名</Text>
            <Text textAlign={'left'} w={'65%'}>
              {name}
            </Text>
          </Flex>
          <Flex alignItems={'center'}>
            <Text w={'35%'}>変更後のユーザー名</Text>
            <Box w={'65%'}>
              <Input
                type="text"
                placeholder="ユーザ名を入力"
                {...register('name', { required: true })}
                borderRadius={'none'}
              />
              <FormErrorMessage fontSize={'0.5vw'}>
                ユーザ名を入力してください
              </FormErrorMessage>
            </Box>
          </Flex>
        </FormLabel>
      </FormControl>
      <Box as={'button'} w={`${140 / 19.2}vw`} type="submit">
        <WideButton text={`変更する`} w={`${140 / 19.2}vw`} />
      </Box>
    </Box>
  );
};
