import {
  Box,
  Input,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { InternalLink } from 'components/links/InternalLink';
import { Text } from 'components/texts/Text';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from 'src/firebase';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const PasswordPopupComponent: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { onOpen, onClose } = useDisclosure({ defaultIsOpen: isOpen });
  const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
    setErrorEmail('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrorPass('');
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [isOpen, onOpen, onClose]);

  const signInWithEmailAndPasswordHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, userEmail, password);
      document.location.reload();
    } catch (error) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/user-not-found'
      ) {
        setErrorEmail('メールアドレスが無効、または存在しません。');
      } else {
        setErrorPass('パスワードが間違っています。');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>パスワードを再入力してください</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>パスワード</FormLabel>
            <Input
              value={userEmail}
              onChange={handleEmailChange}
              placeholder="メールアドレス"
              isInvalid={!!errorEmail}
              errorBorderColor="red.300"
            />
            <Text color="red.500">{errorEmail}</Text>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="パスワード"
              isInvalid={!!errorPass}
              errorBorderColor="red.300"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={signInWithEmailAndPasswordHandler}
          >
            ログイン
          </Button>
          {/* <Button variant="ghost" onClick={onClose}>
            キャンセル
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
