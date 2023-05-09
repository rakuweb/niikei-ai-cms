import React, { FC, useState } from 'react';
import { Box, Input, Select, FormLabel } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { WideButton } from 'components/Button/WideButton';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from 'src/firebase';

export type PresenterProps = Record<string, unknown>;

const inputStyles = css`
  margin-bottom: 20px;
`;

export const Presenter: FC<PresenterProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Firebase Authにユーザを登録
      await createUserWithEmailAndPassword(auth, email, password);

      // Firestoreにユーザ情報を保存
      const docRef = collection(db, 'allowedEmails');
      await addDoc(docRef, { email, password, name, role });

      // フィールドをクリア
      setEmail('');
      setPassword('');
      setName('');
      setRole('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <>
      <Box as="form" onSubmit={handleSubmit}>
        <FormLabel>
          ユーザ名
          <Input
            css={inputStyles}
            type="text"
            placeholder="ユーザ名を入力"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormLabel>
        <FormLabel>
          Email
          <Input
            css={inputStyles}
            type="email"
            placeholder="Emailを入力"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormLabel>
        <FormLabel>
          Role
          <Select
            css={inputStyles}
            placeholder="Roleを選択"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="確認者">確認者</option>
            <option value="編集者">編集者</option>
          </Select>
        </FormLabel>
        <FormLabel>
          パスワード
          <Input
            css={inputStyles}
            type="password"
            placeholder="パスワードを入力"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormLabel>
        <Box as={'button'} w={`${140 / 19.2}vw`} type="submit">
          送信する
        </Box>
      </Box>
    </>
  );
};
