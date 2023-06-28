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
import { Timestamp } from 'firebase/firestore';
import router from 'next/router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { NameLabel } from './NameLabel';
import { NameLabel2 } from './NameLabel2';
import { apiRoutes, routes } from 'constants/routes';
import { SiteType, addSites, updateSites } from '@/firebase/firestore/sites';
import { useCompanyStore, selectUid } from 'features/company';
import { BigWideButton } from '@/components/Button/BigWideButton';

export type PresenterProps = {
  data?: {
    id?: string;
    name?: string;
    url?: string;
    xpath?: string;
    interval1?: string;
    interval2?: string;
    created_at?: Timestamp;
    category?: string;
    is_notified?: boolean;
    is_renewal?: boolean;
    is_auto_patrol?: boolean;
  };
  id?: string;
};
export const schema = z.object({
  name: z.string().min(1, '入力してください'),
  url: z.string().min(1, '入力してください'),
  xpath: z.string(),
  category: z.string().min(1, '入力してください'),
  interval1: z.string().min(1, '入力してください'),
  interval2: z.string(),
  is_notified: z.boolean(),
  is_auto_patrol: z.boolean(),
});
type Schema = z.infer<typeof schema>;

export const Presenter: FC<PresenterProps> = ({ data, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      url: '',
      xpath: '',
      category: '',
      interval1: '',
      interval2: '',
      is_notified: false,
      is_auto_patrol: false,
    },
  });
  const [categories, setCategories] = useState<string[]>([
    '社会',
    '政治',
    '経済',
  ]);
  const companyID = useCompanyStore(selectUid);

  useEffect(() => {
    // TODO
    const handler = async () => {
      const url = apiRoutes.wpCategories;
      const res = await axios.get(url).catch((err) => {
        console.error(err);
        return null;
      });

      if (res === null) return;

      setCategories((prev) => res?.data?.categories ?? prev);
    };

    handler();
  }, []);

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
    setValue('is_auto_patrol', data?.is_auto_patrol || false);
  }, [
    data?.name,
    data?.url,
    data?.xpath,
    data?.category,
    data?.interval1,
    data?.interval2,
    data?.is_notified,
    data?.is_auto_patrol,
    setValue,
  ]);

  const submitHandler = async (formData: Schema) => {
    if (!window.confirm('この内容で登録しますか？')) {
      return;
    }
    try {
      const data: Partial<SiteType> = {
        ...formData,
        // NOTE
        url: id ? formData.url : `${formData.url}`,
      };
      if (id) {
        updateSites(companyID, id, data);
        window.alert('更新しました。');
      } else {
        addSites(companyID, data);
        window.alert('登録しました。');
      }
      router.push(routes.crawlers);
    } catch (error) {
      console.error('Error creating user: ', error);
      alert(error);
    }
  };

  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit(submitHandler)}
        w={'32vw'}
        color={'#222526'}
      >
        <FormControl isInvalid={!!errors.name} mb={'1.5vw'}>
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

        <FormControl isInvalid={!!errors.url} mb={'1.5vw'}>
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

        <FormControl mb={'1.5vw'}>
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

        <FormControl isInvalid={!!errors.category} mb={'1.5vw'} w={'20vw'}>
          <FormLabel>
            <NameLabel name="カテゴリ" />
            <Select
              mt={'0.5vw'}
              placeholder="カテゴリを選択"
              {...register('category', { required: true })}
              borderRadius={'none'}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormLabel>
          <FormErrorMessage fontSize={'0.5vw'}>
            カテゴリを入力してください
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.interval1} mb={'1.5vw'} w={'20vw'}>
          <FormLabel>
            <NameLabel name="巡回頻度" />
            <Flex mt={'0.5vw'} alignItems={'center'}>
              <Select
                className="interval1"
                placeholder="--"
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

        <FormControl mb={'1.5vw'}>
          <FormLabel>
            <NameLabel2 name="自動処理" />
            <Box mb={'0.5vw'} />
            <Switch
              size={{ lg: `md`, xl: `lg`, '2xl': `lg` }}
              {...register('is_auto_patrol')}
              sx={{
                '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]': {
                  backgroundColor: '#49BAC0',
                },
              }}
            />
          </FormLabel>
        </FormControl>

        <FormControl mb={'1.5vw'}>
          <FormLabel>
            <NameLabel2 name="通知の有無" />
            <Box mb={'0.5vw'} />
            <Switch
              size={{ lg: `md`, xl: `lg`, '2xl': `lg` }}
              {...register('is_notified')}
              sx={{
                '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]': {
                  backgroundColor: '#49BAC0',
                },
              }}
            />
          </FormLabel>
        </FormControl>

        <Box w={`${140 / 19.2}vw`}>
          <BigWideButton text={`登録する`} w={`15vw`} />
        </Box>
      </Box>
    </>
  );
};
