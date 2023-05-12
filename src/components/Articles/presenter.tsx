import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { WideButton } from 'components/Button/WideButton';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { Pagination } from 'components/Pagination';
import { ArticlesTable } from 'components/ContentTable/ArticlesTable';
import { Batchselect } from 'components/Batchselect';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const title = `記事一覧`;
  const list = [
    {
      date: `2023/02/01`,
      category: `企業`,
      title: `チャットサービスをリリースしました。`,
      status: `公開`,
    },
    {
      date: `2023/02/01`,
      category: `企業`,
      title: `チャットサービスをリリースしました。`,
      status: `公開`,
    },
    {
      date: `2023/02/01`,
      category: `企業`,
      title: `チャットサービスをリリースしました。`,
      status: `公開`,
    },
    {
      date: `2023/02/01`,
      category: `企業`,
      title: `チャットサービスをリリースしました。`,
      status: `公開`,
    },
    {
      date: `2023/02/01`,
      category: `企業`,
      title: `チャットサービスをリリースしました。`,
      status: `公開`,
    },
    {
      date: `2023/02/01`,
      category: `企業`,
      title: `チャットサービスをリリースしました。`,
      status: `公開`,
    },
    {
      date: `2023/02/01`,
      category: `企業`,
      title: `チャットサービスをリリースしました。`,
      status: `公開`,
    },
    {
      date: `2023/02/01`,
      category: `企業`,
      title: `チャットサービスをリリースしました。`,
      status: `公開`,
    },
    {
      date: `2023/02/01`,
      category: `企業`,
      title: `チャットサービスをリリースしました。`,
      status: `公開`,
    },
    {
      date: `2023/02/01`,
      category: `企業`,
      title: `チャットサービスをリリースしました。`,
      status: `公開`,
    },
  ];
  return (
    <>
      <Box bg={`#EAEAEA`} h={`${1080 / 19.2}vw`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`記事管理`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />
              <WideButton
                w={`${200 / 19.2}vw`}
                mt={`${13 / 19.2}vw`}
                text={`新規作成する`}
              />
            </Flex>
            <ContentContainer h={`${702 / 19.2}vw`}>
              <ArticlesTable list={list} />
            </ContentContainer>
            <Flex position={`relative`}>
              <Box position={`absolute`} bottom={`${5 / 19.2}vw`} left={`0`}>
                <Batchselect />
              </Box>
              <Pagination />
            </Flex>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
