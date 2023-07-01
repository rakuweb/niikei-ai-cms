// import layer
import { FC, useState } from 'react';
import { Box, FlexProps, HStack, Select } from '@chakra-ui/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { WideButton } from '@/components/Button/WideButton';
import Subtitle from '../Subtitle';
import {
  useAccountStore,
  selectAccountItem,
  Role,
  selectSetAccount,
} from '@/features/account';
import type { Role as TRole } from '@/features/account';
import { useCompanyStore, selectUid } from '@/features/company';
import { updateEmployee } from '@/firebase/firestore/employees';

// type layer
export type StyleProps = FlexProps;
export type DataProps = Record<string, unknown>;
export type PresenterProps = StyleProps & DataProps;

const schema = z.object({
  role: z.string(),
});
type Schema = z.infer<typeof schema>;

// presenter
export const Presenter: FC<PresenterProps> = () => {
  const account = useAccountStore(selectAccountItem);
  const setAccount = useAccountStore(selectSetAccount);
  const companyID = useCompanyStore(selectUid);

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { role: account.role },
  });

  const submitHandler = async (data: Schema) => {
    const { role } = data;

    const res = await updateEmployee(
      { companyID, employeeID: account.uid },
      { role: role as TRole }
    ).catch((err) => {
      console.error(err);
      return null;
    });
    if (res === null) {
      alert('更新に失敗しました。時間が経ってからもう一度お試しください。');
      return;
    }
    setAccount({ role: role as TRole });
    alert('権限を更新しました。');
  };

  return (
    <Box
      mb={`${50 / 19.2}vw`}
      as={`form`}
      onSubmit={methods.handleSubmit(submitHandler)}
    >
      <Subtitle title={`権限`} />
      <HStack mb={`${30 / 19.2}vw`} spacing={`${40 / 19.2}vw`}>
        <Box
          w={{ lg: `${110 / 10.2}vw`, xl: `${180 / 19.2}vw` }}
        >{`ユーザ権限`}</Box>
        <Select
          w={{ lg: `${110 / 10.2}vw`, xl: `22vw` }}
          borderRadius={'none'}
          fontSize={`${16 / 19.2}vw`}
          {...methods.register('role')}
        >
          <option value={Role.Writer}>記者</option>
          <option value={Role.Editor}>編集者</option>
        </Select>
      </HStack>
      <WideButton text={`変更する`} w={`${200 / 19.2}vw`} type={`submit`} />
    </Box>
  );
};
