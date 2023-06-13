import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  Input,
  Select,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { WideButton } from 'components/Button/WideButton';
import { NameLabel } from './NameLabel';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db, auth } from 'src/firebase';
import { NameLabel2 } from './NameLabel2';
import * as admin from 'firebase-admin';

export type PresenterProps = {
  data?: {
    id?: string;
    name?: string;
    url?: string;
    xpath?: string;
    interval1?: string;
    interval2?: string;
    created_at?: admin.firestore.Timestamp;
    category?: string;
    is_notified?: boolean;
    is_renewal?: boolean;
  };
};
type FormData = {
  name: string;
  url: string;
  xpath: string;
  category: string;
  interval1: string;
  interval2: string;
  is_notified: boolean;
};
export const Presenter: FC<PresenterProps> = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  // console.log(data?.name);
  const [category, setCategory] = useState<string>('');
  const onSubmit = async (data: FormData) => {
    if (!window.confirm('この内容で新規作成しますか？')) {
      return;
    }
    const user = auth.currentUser;
    const id = user?.uid;
    try {
      const userDocRef = doc(db, 'users', id);
      const userDoc = await getDoc(userDocRef);
      const refFieldString = userDoc.data().company_ref;
      const companyEmployeeDocRef = collection(
        db,
        'companies',
        refFieldString,
        'sites'
      );

      await addDoc(companyEmployeeDocRef, data);
    } catch (error) {
      console.error('Error creating user: ', error);
      alert(error);
    }
  };

  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        w={'30vw'}
        color={'#222526'}
      >
        <FormControl isInvalid={!!errors.name} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="登録名" />
            <Input
              mt={'0.5vw'}
              type="text"
              placeholder={'登録名を入力'}
              {...register('name', { required: true })}
              borderRadius={'none'}
              // value={data.name}
            />
          </FormLabel>
          <FormErrorMessage fontSize={'0.5vw'}>
            登録名を入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.url} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="URL" />
            <Flex alignItems={'center'}>
              https://
              <Input
                mt={'0.5vw'}
                // type="url"
                placeholder="URLを入力"
                {...register('url', {
                  required: true,
                })}
                borderRadius={'none'}
              />
            </Flex>
          </FormLabel>
          <FormErrorMessage fontSize={'0.5vw'}>
            URLを入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl mb={'1vw'}>
          <FormLabel>
            <NameLabel2 name="対象範囲(Xpath)" />
            <Input
              mt={'0.5vw'}
              type="xpath"
              placeholder="xpathを入力"
              {...register('xpath', {
                required: false,
              })}
              borderRadius={'none'}
            />
          </FormLabel>
          <FormErrorMessage fontSize={'0.5vw'}>
            Xpathを入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.category} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="カテゴリ" />
            <Select
              mt={'0.5vw'}
              placeholder="カテゴリを選択"
              {...register('category', { required: true })}
              borderRadius={'none'}
            >
              <option value="社会">社会</option>
              <option value="政治">政治</option>
              <option value="経済">経済</option>
              <option value="文化">文化</option>
              <option value="生活">生活</option>
              <option value="ビジネス">ビジネス</option>
            </Select>
          </FormLabel>
          <FormErrorMessage fontSize={'0.5vw'}>
            カテゴリを入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.interval1} mb={'1vw'}>
          <FormLabel>
            <NameLabel name="巡回頻度" />
            <Flex mt={'0.5vw'} alignItems={'center'}>
              <Select
                className="interval1"
                placeholder="頻度を選択"
                {...register('interval1', { required: true })}
                borderRadius={'none'}
              >
                <option value="毎月">毎月</option>
                <option value="毎週">毎週</option>
                <option value="毎日">毎日</option>
              </Select>
              <Input
                className="interval2"
                borderRadius={'none'}
                type="time"
                {...register('interval2', { required: true })}
              />
            </Flex>
          </FormLabel>
          {errors.interval1 && (
            <FormErrorMessage fontSize={'0.5vw'}>
              頻度を入力してください
            </FormErrorMessage>
          )}
          {errors.interval2 && (
            <FormErrorMessage fontSize={'0.5vw'}>
              時間を入力してください
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl mb={'1vw'}>
          <FormLabel>
            <NameLabel2 name="通知の有無" />
            <Switch className="is_notified" {...register('is_notified')} />
          </FormLabel>
        </FormControl>

        <Box as={'button'} w={`${140 / 19.2}vw`} type="submit">
          <WideButton text={`送信する`} w={`${140 / 19.2}vw`} />
        </Box>
      </Box>
    </>
  );
};
