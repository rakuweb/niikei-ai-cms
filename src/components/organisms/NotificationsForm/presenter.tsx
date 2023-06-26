import { Box, Switch, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { WideButton } from '@/components/Button/WideButton';
import { useAccountStore } from '@/features/account';
import { updateEmployee } from '@/firebase/firestore/employees';
import { selectUid, useCompanyStore } from '@/features/company';

export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

const schema = z.object({
  auto_publish_notification: z.boolean(),
  new_info_notification: z.boolean(),
  fortune_notification: z.boolean(),
});
type Schema = z.infer<typeof schema>;

export const Presenter: FC<PresenterProps> = () => {
  const {
    newInfoNotification,
    autoPublishNotification,
    fortuneNotification,
    uid,
    setNotification,
  } = useAccountStore();
  const companyID = useCompanyStore(selectUid);
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      auto_publish_notification: autoPublishNotification,
      new_info_notification: newInfoNotification,
      fortune_notification: fortuneNotification,
    },
  });

  const submitHandler = async (data: Schema) => {
    const res = await updateEmployee({ companyID, eomployeeID: uid }, data);
    if (res === null) return;

    const props = {
      autoPublishNotification: data.auto_publish_notification,
      newInfoNotification: data.new_info_notification,
      fortuneNotification: data.fortune_notification,
    };
    setNotification(props);
  };

  return (
    <Box as={`form`} onSubmit={methods.handleSubmit(submitHandler)}>
      <Box mb={'1vw'}>
        <Text fontSize={'1vw'}>自動巡回機能の記事更新通知</Text>
        <Switch
          size={{ lg: `sm`, xl: `md`, '2xl': `lg` }}
          // isChecked={user.status || false}
          sx={{
            '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]': {
              backgroundColor: '#49BAC0',
            },
          }}
        />
      </Box>
      <Box mb={'1vw'}>
        <Text fontSize={'1vw'}>自動投稿機能の公開通知</Text>
        <Switch
          size={{ lg: `sm`, xl: `md`, '2xl': `lg` }}
          // isChecked={user.status || false}
          sx={{
            '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]': {
              backgroundColor: '#49BAC0',
            },
          }}
        />
      </Box>
      <Box mb={'1vw'}>
        <Text fontSize={'1vw'}>オリジナルコンテンツ配信機能の公開通知</Text>
        <Switch
          size={{ lg: `sm`, xl: `md`, '2xl': `lg` }}
          // isChecked={user.status || false}
          sx={{
            '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]': {
              backgroundColor: '#49BAC0',
            },
          }}
        />
      </Box>

      <WideButton text={`保存する`} w={`${140 / 19.2}vw`} />
    </Box>
  );
};
