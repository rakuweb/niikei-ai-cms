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
import { InternalLink } from 'components/links/InternalLink';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from 'src/firebase';
import { getAuth } from 'firebase/auth';

export type PresenterProps = {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  setText: (text: string) => void;
};

export const Presenter: FC<PresenterProps> = ({
  isOpen,
  onClose,
  text,
  setText,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleCreateDocument = async () => {
    try {
      text = text || '';
      const response = await fetch('/api/createDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, text }),
      });
      console.log(response);
      if (response.ok) {
        const { documentId, url } = await response.json();
        const auth = getAuth();
        const user = auth.currentUser;
        const employeeDocRef = doc(db, 'users', user.uid);
        const employeeDocSnap = await getDoc(employeeDocRef);
        const ref = employeeDocSnap.data()?.company_ref;
        const allowedEmailsRef = collection(db, 'companies', ref, 'articles');

        await addDoc(allowedEmailsRef, {
          document_id: documentId || '',
          category: category || '',
          url: url || '',
          created_by: doc(db, 'companies', ref, 'employees', user.uid),
        });
        console.log(documentId);
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
                <option value="ビジネス">ビジネス</option>
                <option value="社会">社会</option>
                <option value="政治">政治</option>
                <option value="文化">文化</option>
                <option value="生活">生活</option>
                <option value="経済">経済</option>
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
