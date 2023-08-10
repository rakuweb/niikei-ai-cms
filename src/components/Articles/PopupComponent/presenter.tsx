import { FC, useState } from 'react';
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
  Box,
} from '@chakra-ui/react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { WideButton } from './WideButton';
import { db } from 'src/firebase';
import { useAccountStore, selectAccountItem } from 'features/account';

const documentSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),

  category: z
    .string()
    .min(1, { message: 'カテゴリーを選択してください' })
    .transform((value) => Number(value)),
});
type DocumentSchema = z.infer<typeof documentSchema>;

export type PresenterProps = {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  setText: (text: string) => void;
  list: { id: string; name: string }[];
  onChangeArticle?: (id: string) => void;
};

export const Presenter: FC<PresenterProps> = ({
  isOpen,
  onClose,
  text,
  list,
}) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DocumentSchema>({
    resolver: zodResolver(documentSchema),
  });
  const account = useAccountStore(selectAccountItem);

  const handleCreateDocument: SubmitHandler<DocumentSchema> = async (data) => {
    setIsCreating(true);
    const { title, category } = data;
    try {
      const response = await fetch('/api/create-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          text,
        }),
      });

      if (response.ok) {
        const { documentId, url } = await response.json();

        const employeeDocRef = doc(db, 'users', account.uid);
        const employeeDocSnap = await getDoc(employeeDocRef);
        const ref = employeeDocSnap.data()?.company_ref;
        const allowedEmailsRef = collection(ref, 'articles');
        const documentRef = doc(allowedEmailsRef, documentId);
        await setDoc(documentRef, {
          document_id: documentId || '',
          category: list.filter((item) => Number(item.id) === category)?.[0],
          url: url || '',
          status: 'editing',
          due_date: null,
          wp_url: null,
          wp_id: null,
          created_by: doc(ref, 'employees', account.uid),
        });

        onClose();
        reset();
        window.open(url, '_blank');
      } else {
        window.alert('Googleドキュメントの作成に失敗しました');
      }
    } catch (error) {
      window.alert(error);
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="100vw">
        <ModalOverlay />
        <ModalContent p={{ base: '3vw 1.5vw' }} w={{ base: '40%' }}>
          <form onSubmit={handleSubmit(handleCreateDocument)}>
            <ModalHeader fontSize={{ base: '1.8vw' }}>
              記事の新規作成
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="title">
                <FormLabel fontSize={{ base: '1.2vw' }}>タイトル</FormLabel>
                <Input
                  borderRadius={0}
                  fontSize={{ base: '1vw' }}
                  {...register('title')}
                />
                {errors.title && (
                  <Box color={`red`} fontSize={{ base: '1vw' }} mt={`0.25vw`}>
                    {errors.title.message}
                  </Box>
                )}
              </FormControl>
              <FormControl id="category" mt={{ base: '1.5vw' }}>
                <FormLabel fontSize={{ base: '1.2vw' }}>カテゴリ</FormLabel>
                <Select
                  placeholder="カテゴリを選択"
                  borderRadius={0}
                  fontSize={{ base: '1vw' }}
                  {...register('category')}
                >
                  {list.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
                {errors.category && (
                  <Box color={`red`} fontSize={{ base: '1vw' }} mt={`0.25vw`}>
                    {errors.category.message}
                  </Box>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <WideButton
                type="submit"
                text={'Googleドキュメントで記事を作成する'}
                fontSize={{ base: '1.2vw' }}
                isLoading={!!isCreating}
                cursor={isCreating ? 'not-allowed' : 'pointer'}
                _hover={{
                  cursor: isCreating ? `not-allowed` : `pointer`,
                  transition: `0.3s`,
                  filter: `opacity(80%)`,
                }}
              />
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
