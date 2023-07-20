import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { WideButton } from './WideButton';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from 'src/firebase';
import { getAuth } from 'firebase/auth';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

export type PresenterProps = {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  setText: (text: string) => void;
  list: { id: string; name: string }[];
};

export const Presenter: FC<PresenterProps> = ({
  isOpen,
  onClose,
  text,
  list,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
    if ('tokenId' in response) {
      setToken(response.tokenId);
    }
  };

  const handleLoginFailure = (response: any) => {
    console.error('Failed to log in', response);
    if (response.error === 'popup_closed_by_user') {
      window.alert(
        'ログインがキャンセルされました。再度ログインしてください。'
      );
    }
  };

  // Replace YOUR_CLIENT_ID with your actual client id
  const CLIENT_ID =
    '769478816418-qac386dl97v313u265s1a6urnaa9t6i2.apps.googleusercontent.com';
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleCreateDocument = async () => {
    if (!token) {
      window.alert('Googleにログインしてください');

      return;
    }
    try {
      text = text || '';
      const response = await fetch('/api/create-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, text }),
      });

      if (response.ok) {
        const { documentId, url } = await response.json();
        const auth = getAuth();
        const user = auth.currentUser;
        const employeeDocRef = doc(db, 'users', user.uid);
        const employeeDocSnap = await getDoc(employeeDocRef);
        const ref = employeeDocSnap.data()?.company_ref;
        const allowedEmailsRef = collection(ref, 'articles');
        const documentRef = doc(allowedEmailsRef, documentId);
        await setDoc(documentRef, {
          document_id: documentId || '',
          category: category || '',
          url: url || '',
          status: 'editing',
          due_date: '',
          wp_url: '',
          created_by: doc(ref, 'employees', user.uid),
        });

        onClose();
        window.open(url, '_blank');
      } else {
        window.alert('Googleドキュメントの作成に失敗しました');
      }
    } catch (error) {
      window.alert(error);
      console.log(error);
    }
  };

  return (
    <>
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Googleでログイン"
        onSuccess={handleLogin}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
        uxMode="redirect"
        redirectUri="http://localhost:3000/articles/new"
        isSignedIn={true}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="100vw">
        <ModalOverlay />
        <ModalContent p={{ base: '3vw 1.5vw' }} w={{ base: '40%' }}>
          <ModalHeader fontSize={{ base: '1.8vw' }}>記事の新規作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title">
              <FormLabel fontSize={{ base: '1.2vw' }}>タイトル</FormLabel>
              <Input
                type="text"
                borderRadius={0}
                fontSize={{ base: '1vw' }}
                value={title}
                onChange={handleTitleChange}
              />
            </FormControl>
            <FormControl id="category" mt={{ base: '1.5vw' }}>
              <FormLabel fontSize={{ base: '1.2vw' }}>カテゴリ</FormLabel>
              <Select
                placeholder="カテゴリを選択"
                borderRadius={0}
                fontSize={{ base: '1vw' }}
                value={category}
                onChange={handleCategoryChange}
              >
                {list.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <WideButton
              onClick={handleCreateDocument}
              text=" Googleドキュメントで記事を作成する"
              fontSize={{ base: '1.2vw' }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
