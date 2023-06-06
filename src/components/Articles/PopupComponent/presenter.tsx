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
import { FC } from 'react';
import { WideButton } from './WideButton';
import { InternalLink } from 'components/links/InternalLink';
// popupコンポーネント
export type PresenterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Presenter: FC<PresenterProps> = ({ isOpen, onClose }) => {
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
              <Input type="text" borderRadius={0} fontSize={{ base: '1vw' }} />
            </FormControl>
            <FormControl id="category" mt={{ base: '1.5vw' }}>
              <FormLabel fontSize={{ base: '1.2vw' }}>カテゴリ</FormLabel>
              <Select
                placeholder="カテゴリを選択"
                borderRadius={0}
                fontSize={{ base: '1vw' }}
              >
                <option value="category1">カテゴリ1</option>
                <option value="category2">カテゴリ2</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <InternalLink href="/articles/document">
              <WideButton
                onClick={onClose}
                text=" Googleドキュメントで記事を作成する"
                fontSize={{ base: '1.2vw' }}
              />
            </InternalLink>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
