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
import { useAccountStore, selectAccountItem } from 'features/account';
import { fetchFreeDocuments } from '@/firebase/firestore/documents';

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const account = useAccountStore(selectAccountItem);
  const handleCreateDocument = async () => {
    try {
      text = text || '';
      const response = await fetch('/api/create-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, text }),
      });
      console.log(response);
      if (response.ok) {
        const { documentId, url } = await response.json();

        const employeeDocRef = doc(db, 'users', account.uid);
        console.log(account.uid);
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
          created_by: doc(ref, 'employees', account.uid),
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
