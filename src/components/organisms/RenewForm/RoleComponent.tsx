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
        const ref = employeeDocSnap.data()?.company_ref;
        const companyDocRef = doc(ref, 'employees', id as string);
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
      w={'35vw'}
      color={'#222526'}
      mb={'1.5vw'}
      className="role"
    >
      <Box fontSize={'1vw'} mt={'3vw'} mb={'0.5vw'}>
        権限
      </Box>
      <FormControl isInvalid={!!errors.role} mb={'1vw'}>
        <FormLabel>
          <Box>
            <Flex alignItems={'center'} mb={'1vw'}>
              <Text w={'35%'} fontSize={'0.8vw'}>
                ユーザー権限
              </Text>
              <Box w={'50%'}>
                <Select
                  placeholder="権限を選択"
                  {...register('role', { required: true })}
                  borderRadius={'none'}
                  defaultValue={role}
                  fontSize={'0.8vw'}
                >
                  <option value="writer">記者</option>
                  <option value="editor">編集者</option>
                </Select>
                <FormErrorMessage fontSize={'0.5vw'}>
                  権限を選択してください
                </FormErrorMessage>
              </Box>
            </Flex>
          </Box>
        </FormLabel>
      </FormControl>
      <Box as={'button'} w={`10vw`} type="submit" mt={'1vw'}>
        <WideButton text={`変更する`} w={`10vw`} />
      </Box>
    </Box>
  );
};
