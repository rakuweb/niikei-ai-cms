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
import { PresenterProps } from './presenter';
import { useRouter } from 'next/router';
import { PasswordPopupComponent } from './PasswordPopupComponent';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';

type FormData = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
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
    getValues,
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const API_URL = '/api/update-user-password';
  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      window.alert('新しいパスワードと確認のパスワードが一致しません');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: id,
          currentPassword: data.currentPassword,
          newPassword: data.password,
        }),
      });
      if (response.ok) {
        setPassword(data.password);
        window.alert('パスワードが更新されました');
      }
    } catch (error) {
      console.error('Error updating password: ', error);
      setShowPopup(true);
      window.alert('エラーが発生しました。' + error);
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
      w={'35vw'}
      color={'#222526'}
      mb={'1.5vw'}
      className="password"
    >
      <Box fontSize={'1vw'} mt={'3vw'} mb={'0.5vw'}>
        パスワード
      </Box>
      <FormControl isInvalid={!!errors.password} mb={'1vw'}>
        <FormLabel>
          <Flex alignItems={'center'} mb={'1vw'}>
            <Text w={'35%'} fontSize={'0.8vw'}>
              変更後のパスワード
            </Text>
            <Box w={'65%'}>
              <InputGroup>
                <Input
                  fontSize={'0.8vw'}
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
                <InputRightElement width="2.4vw">
                  <IconButton
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    h="1.4vw"
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <FormErrorMessage fontSize={'0.5vw'}>
                  {errors.password.message}
                </FormErrorMessage>
              )}
            </Box>
          </Flex>
        </FormLabel>
      </FormControl>

      <FormControl isInvalid={!!errors.confirmPassword} mb={'1vw'}>
        <FormLabel>
          <Flex alignItems={'center'}>
            <Text w={'35%'} fontSize={'0.8vw'}>
              パスワードの確認
            </Text>
            <Box w={'65%'}>
              <InputGroup>
                <Input
                  fontSize={'0.8vw'}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="新しいパスワードを再度入力"
                  {...register('confirmPassword', {
                    required: 'パスワードを再度入力してください',
                    validate: {
                      matchesPreviousPassword: (value) => {
                        const { password } = getValues();
                        return (
                          password === value || '新しいパスワードと一致しません'
                        );
                      },
                    },
                  })}
                  borderRadius={'none'}
                />
                <InputRightElement width="2.4vw">
                  <IconButton
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    h="1.4vw"
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && (
                <FormErrorMessage fontSize={'0.5vw'}>
                  {errors.confirmPassword.message}
                </FormErrorMessage>
              )}
            </Box>
          </Flex>
        </FormLabel>
      </FormControl>

      <Box
        as={'button'}
        w={`${140 / 19.2}vw`}
        type="submit"
        onClick={handlePasswordSubmit}
        mt={'1vw'}
      >
        <WideButton text={`変更する`} w={`10vw`} />
      </Box>
      {showPopup && <PasswordPopupComponent isOpen={true} />}
    </Box>
  );
};
