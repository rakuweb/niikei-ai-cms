// import layer
import { FC } from 'react';
import { FlexProps } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { InputForm } from '../InputForm';
import Password from '../Password';
import { apiRoutes } from '@/constants/routes';
import axios from 'axios';
import { useAccountStore } from '@/features/account';

// type layer
export type StyleProps = FlexProps;
export type DataProps = Record<string, unknown>;
export type PresenterProps = StyleProps & DataProps;

const schema = z
  .object({
    newPassword: z
      .string({ required_error: `入力してください。` })
      .min(1, `入力してください。`),
    confirmedPassword: z
      .string({ required_error: `入力してください。` })
      .min(1, `入力してください。`),
  })
  .superRefine(({ newPassword, confirmedPassword }, ctx) => {
    if (newPassword !== confirmedPassword) {
      ctx.addIssue({
        path: ['confirmedPassword'],
        code: 'custom',
        message: `パスワードが一致しません。`,
      });
    }
  });
type Schema = z.infer<typeof schema>;

// presenter
export const Presenter: FC<PresenterProps> = ({ ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: '',
      confirmedPassword: '',
    },
  });
  const uid = useAccountStore((state) => state.uid);

  const submitHandler = async (data: Schema) => {
    const { newPassword } = data;
    const url = apiRoutes.updateUserPassword;
    const res = await axios.post(url, { uid, newPassword }).catch((err) => {
      console.error(err);
      return null;
    });
    if (res === null) {
      alert(
        'パスワードの更新に失敗しました。しばらく経ってからもう一度お試しください。'
      );
      return;
    }

    alert('パスワードを更新しました。');
  };

  return (
    <InputForm
      onSubmit={handleSubmit(submitHandler)}
      title={`パスワード`}
      {...props}
    >
      <Password
        registers={register(`newPassword`)}
        message={errors?.newPassword?.message}
        text={`変更後のパスワード`}
      />
      <Password
        registers={register(`confirmedPassword`)}
        message={errors?.confirmedPassword?.message}
        text={`パスワードの確認`}
      />
    </InputForm>
  );
};
