import {
  FormControl,
  FormLabel,
  Flex,
  FormErrorMessage,
  Text,
  Box,
  Select,
} from '@chakra-ui/react';
import { WideButton } from 'components/Button/WideButton';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { auth, db } from 'src/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { PresenterProps } from './presenter';
import { useRouter } from 'next/router';

type FormData = {
  role: string;
};

type NameComponentProps = PresenterProps & {
  id: string;
};
export const RoleComponent: FC<NameComponentProps> = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [role, setRole] = useState(data.role);
  useEffect(() => {
    setRole(data.role);
  }, [data.role]);
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
        const employeeDocRef = doc(db, 'users', user.uid);
        const employeeDocSnap = await getDoc(employeeDocRef);
        const ref = employeeDocSnap.data()?.ref;
        const companyDocRef = doc(
          db,
          'companies',
          ref,
          'employees',
          id as string
        );
        await setDoc(companyDocRef, { role: data.role }, { merge: true });
        window.alert('Roleが更新されました');
        setRole(data.role);
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
      className="role"
    >
      <FormControl isInvalid={!!errors.role} mb={'1vw'}>
        <FormLabel>
          <Flex alignItems={'center'}>
            <Text w={'35%'}>現在の権限</Text>
            <Text textAlign={'left'} w={'65%'}>
              {role}
            </Text>
          </Flex>
          <Box>
            <Flex alignItems={'center'}>
              <Text w={'35%'}>変更後の権限</Text>
              <Box w={'65%'}>
                <Select
                  placeholder="権限を選択"
                  {...register('role', { required: true })}
                  borderRadius={'none'}
                >
                  <option value="確認者">確認者</option>
                  <option value="編集者">編集者</option>
                </Select>
                <FormErrorMessage fontSize={'0.5vw'}>
                  権限を選択してください
                </FormErrorMessage>
              </Box>
            </Flex>
          </Box>
        </FormLabel>
      </FormControl>
      <Box as={'button'} w={`${140 / 19.2}vw`} type="submit">
        <WideButton text={`変更する`} w={`${140 / 19.2}vw`} />
      </Box>
    </Box>
  );
};
