import { WideButton } from '@/components/Button/WideButton';
import { Box, Switch, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

export const Presenter: FC<PresenterProps> = () => {
  return (
    <>
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
    </>
  );
};
