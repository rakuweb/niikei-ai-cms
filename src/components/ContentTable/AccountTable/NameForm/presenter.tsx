// import layer
import { FC } from 'react';
import { HStack, Box, FlexProps } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateProfile } from 'firebase/auth';

import { InputForm } from '../InputForm';
import AccountInput from '../AccountInput';
import { auth } from '@/firebase';

import {
  useAccountStore,
  selectAccountItem,
  selectSetAccount,
} from 'features/account';
import { updateEmployee } from '@/firebase/firestore/employees';
import { useCompanyStore, selectUid } from '@/features/company';

// type layer
export type StyleProps = FlexProps;
export type DataProps = Record<string, unknown>;
export type PresenterProps = StyleProps & DataProps;

const schema = z.object({
  name: z
    .string({ required_error: `入力してください。` })
    .min(1, `入力してください。`),
});
type Schema = z.infer<typeof schema>;

// presenter
export const Presenter: FC<PresenterProps> = ({ ...props }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  });
  const account = useAccountStore(selectAccountItem);
  const currentUser = auth.currentUser;
  const companyID = useCompanyStore(selectUid);
  const setAccount = useAccountStore(selectSetAccount);

  const submitHandler = async (data: Schema) => {
    const { name } = data;
    if (!currentUser) return;
    const resAuth = await updateProfile(currentUser, {
      displayName: name,
    }).catch((err) => {
      console.error(err);
      return null;
    });
    if (resAuth === null) {
      alert('更新できませんでした。しばらく経ってからもう一度お試しください。');
      return;
    }
    const resEmployee = await updateEmployee(
      {
        companyID,
        employeeID: account.uid,
      },
      { name }
    ).catch((err) => {
      console.error(err);
      return null;
    });
    if (resEmployee === null) {
      alert('更新に失敗しました。しばらく経ってからもう一度お試しください。');
      return;
    }
    setAccount({ name });
    alert('名前を更新しました。');
    reset();
  };

  return (
    <InputForm onSubmit={handleSubmit(submitHandler)} title={`名前`} {...props}>
      <HStack mb={`${20 / 19.2}vw`} spacing={`${40 / 19.2}vw`}>
        <Box
          w={{ lg: `${110 / 10.2}vw`, xl: `${180 / 19.2}vw` }}
        >{`現在の名前`}</Box>
        <Box fontWeight={`400`}>{account.name}</Box>
      </HStack>

      <HStack mb={`${30 / 19.2}vw`} spacing={`${40 / 19.2}vw`}>
        <Box
          w={{ lg: `${110 / 10.2}vw`, xl: `${180 / 19.2}vw` }}
        >{`変更後の名前`}</Box>
        <Box>
          <AccountInput
            // id={`name`}
            type={`text`}
            registers={register('name')}
          />
          {errors.name?.message && (
            <Box color={`red`}>{errors.name?.message}</Box>
          )}
        </Box>
      </HStack>
    </InputForm>
  );
};
