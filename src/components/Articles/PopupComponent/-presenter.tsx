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
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'src/firebase';
import { getAuth } from 'firebase/auth';
import { useAccountStore, selectAccountItem } from 'features/account';
import { fetchFreeDocument } from './documents';
import {
  DOCUMENT_COLLECTION,
  DocumentStatus,
} from '@/firebase/firestore/documents';
import { ARTICLE_COLLECTION, Status } from '@/firebase/firestore/articles';
import { apiRoutes, routes } from '@/constants/routes';
import { Category } from '@/firebase/firestore/sites';

export type PresenterProps = {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  setText: (text: string) => void;
  list: Category[];
  onChangeArticle?: () => void;
};

export const Presenter: FC<PresenterProps> = ({
  isOpen,
  onClose,
  text,
  list,
  onChangeArticle,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>({
    id: undefined,
    name: '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = list.find((item) => String(item.id) === e.target.value);
    setCategory(target);
  };
  const account = useAccountStore(selectAccountItem);
  const handleCreateDocument = async () => {
    try {
      const freeDocRef = collection(db, DOCUMENT_COLLECTION);

      const freeDocsSnap = await getDocs(freeDocRef);

      const freeDoc = freeDocsSnap.docs.find(
        (doc) => doc.data().status === DocumentStatus.Free
      );
      if (!freeDoc) {
        window.alert('利用可能なGoogleドキュメントがありません');
        return;
      }

      const { document_id, url } = freeDoc.data();
      const response = await fetch(apiRoutes.createDocument, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          title,
          text,
          documentId: document_id,
          url: url,
        }),
      });
      if (response.ok) {
        const { documentId, url } = await response.json();

        const employeeDocRef = doc(db, 'users', account.uid);
        const employeeDocSnap = await getDoc(employeeDocRef);
        const ref = employeeDocSnap.data()?.company_ref;
        const allowedEmailsRef = collection(ref, ARTICLE_COLLECTION);
        const documentRef = doc(allowedEmailsRef, documentId);
        await setDoc(documentRef, {
          document_id: documentId || '',
          category: category || '',
          url: url || '',
          status: 'editing',
          due_date: '',
          wp_url: '',
          created_by: doc(ref, 'employees', account.uid),
          created_at: Timestamp.now(),
          updated_at: Timestamp.now(),
        });
        const documenIdRef = doc(db, DOCUMENT_COLLECTION, documentId);
        await updateDoc(documenIdRef, {
          status: DocumentStatus.Using,
        });
        onChangeArticle && onChangeArticle();

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
                value={category.id}
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
