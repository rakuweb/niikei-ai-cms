import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  FormErrorMessage,
  Text,
  Box,
  IconButton,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { WideButton } from 'components/Button/WideButton';
import { useEffect, useState } from 'react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { auth, db } from 'src/firebase';
import { updateEmail, updatePassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { PresenterProps } from './presenter';
import { useRouter } from 'next/router';
import { PasswordPopupComponent } from './PasswordPopupComponent';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
type FormData = {
  password: string;
};

type PasswordComponentProps = PresenterProps & {
  id: string;
};
export const PasswordComponent: FC<PasswordComponentProps> = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [password, setPassword] = useState(data.password);
  useEffect(() => {
    setPassword(data.password);
  }, [data.password]);
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
        await updatePassword(user, data.password);
        const docRef = doc(
          db,
          'companies',
          'employees',
          'employees',
          id as string
        );
        await setDoc(docRef, { password: data.password }, { merge: true });
        setPassword(data.password);
      }
    } catch (error) {
      console.error('Error updating password: ', error);
      setShowPopup(true);
      window.alert('パスワードが更新されました');
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = (e) => {
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
      className="password"
    >
      <FormControl isInvalid={!!errors.password} mb={'20px'}>
        <FormLabel>
          <Flex alignItems={'center'}>
            <Text w={'35%'}>変更後のパスワード</Text>
            <InputGroup w={'65%'}>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="パスワードを入力"
                {...register('password', {
                  required: 'パスワードを入力してください',
                  minLength: {
                    value: 6,
                    message: 'パスワードは6文字以上で入力してください',
                  },
                })}
                borderRadius={'none'}
              />
              <InputRightElement width="3rem">
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  h="1.75rem"
                  variant="ghost"
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
          </Flex>

          {errors.password && (
            <FormErrorMessage fontSize={'10px'}>
              {errors.password.message}
            </FormErrorMessage>
          )}
        </FormLabel>
      </FormControl>
      <Box
        as={'button'}
        w={`${140 / 19.2}vw`}
        type="submit"
        onClick={handlePasswordSubmit}
      >
        <WideButton text={`変更する`} w={`${140 / 19.2}vw`} />
      </Box>
      {showPopup && <PasswordPopupComponent isOpen={true} />}
    </Box>
  );
};
