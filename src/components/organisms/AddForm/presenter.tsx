import React, { FC, useEffect } from 'react';
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
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as admin from 'firebase-admin';
import router from 'next/router';

import { WideButton } from 'components/Button/WideButton';
import { NameLabel } from './NameLabel';
import { db, auth } from 'src/firebase';
import { NameLabel2 } from './NameLabel2';

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
  id?: string;
};
type FormData = {
  id: string;
  name: string;
  url: string;
  xpath: string;
  category: string;
  interval1: string;
  interval2: string;
  is_notified: boolean;
  is_renewal: boolean;
};

export const Presenter: FC<PresenterProps> = ({ data, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: data?.name || '',
      url: data?.url || '',
      xpath: data?.xpath || '',
      category: data?.category || '',
      interval1: data?.interval1 || '',
      interval2: data?.interval2 || '',
      is_notified: data?.is_notified || false,
      is_renewal: data?.is_renewal || false,
    },
  });

  useEffect(() => {
    if (data?.name) {
      setValue('name', data.name);
    }
    if (data?.url) {
      setValue('url', data.url);
    }
    if (data?.xpath) {
      setValue('xpath', data.xpath);
    }
    if (data?.category) {
      setValue('category', data.category);
    }
    if (data?.interval1) {
      setValue('interval1', data.interval1);
    }
    if (data?.interval2) {
      setValue('interval2', data.interval2);
    }
    setValue('is_notified', data?.is_notified || false);
    setValue('is_renewal', data?.is_renewal || false);
  }, [
    data?.name,
    data?.url,
    data?.xpath,
    data?.category,
    data?.interval1,
    data?.interval2,
    data?.is_notified,
    data?.is_renewal,
    setValue,
  ]);

  const onSubmit = async (data: FormData) => {
    if (!window.confirm('この内容で登録しますか？')) {
      return;
    }
    const user = auth.currentUser;

    try {
      const userDocRef = doc(db, 'users', user?.uid);
      const userDoc = await getDoc(userDocRef);
      const refFieldString = userDoc.data().company_ref;
      const companyEmployeeDocRef = collection(
        db,
        'companies',
        refFieldString,
        'sites'
      );

      const updatedData = {
        ...data,
        url: `https://${data.url}`,
      };

      if (id) {
        const docRef = doc(companyEmployeeDocRef, id);
        await updateDoc(docRef, updatedData);
      } else {
        await addDoc(companyEmployeeDocRef, updatedData);
      }

      window.alert('登録しました。');
      router.push('/crawlers');
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
        w={'40vw'}
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
              <Box fontSize={'0.8vw'} mr={'1vw'}>
                https://
              </Box>
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

        <FormControl isInvalid={!!errors.category} mb={'1vw'} w={'30vw'}>
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

        <FormControl isInvalid={!!errors.interval1} mb={'1vw'} w={'30vw'}>
          <FormLabel>
            <NameLabel name="巡回頻度" />
            <Flex mt={'0.5vw'} alignItems={'center'}>
              <Select
                className="interval1"
                placeholder="頻度を選択"
                {...register('interval1', { required: true })}
                borderRadius={'none'}
                mr={'0.5vw'}
              >
                <option value="毎月">毎月</option>
                <option value="毎週">毎週</option>
                <option value="毎日">毎日</option>
              </Select>
              <Input
                className="interval2"
                borderRadius={'none'}
                ml={'0.5vw'}
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
            <NameLabel2 name="自動処理" />
            <Switch
              {...register('is_renewal')}
              sx={{
                '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]': {
                  backgroundColor: '#49BAC0',
                },
              }}
            />
          </FormLabel>
        </FormControl>

        <FormControl mb={'1vw'}>
          <FormLabel>
            <NameLabel2 name="通知の有無" />
            <Switch
              {...register('is_notified')}
              sx={{
                '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]': {
                  backgroundColor: '#49BAC0',
                },
              }}
            />
          </FormLabel>
        </FormControl>

        <Box as={'button'} w={`${140 / 19.2}vw`} type="submit">
          <WideButton text={`登録する`} w={`${140 / 19.2}vw`} />
        </Box>
      </Box>
    </>
  );
};
