import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { WideButton } from 'components/Button/WideButton';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { CrawlerTable } from 'components/ContentTable/CrawlerTable';
import { Pagination } from 'components/Pagination';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const title = `登録情報一覧`;
  const list = [
    {
      category: `企業`,
      name: `pr times`,
      url: `https://prtimes.jp/main/html/index/pagenum/1`,
      frequency: `毎日12:00`,
    },
    {
      category: `企業`,
      name: `google`,
      url: `https://www.google.com/`,
      frequency: `毎日12:00`,
    },
    {
      category: `企業`,
      name: `ラクウェブ`,
      url: `https://rakuweb.jp/`,
      frequency: `毎日12:00`,
    },
    {
      category: `企業`,
      name: `サンプル`,
      url: `https://sample.jp/`,
      frequency: `毎日12:00`,
    },
    {
      category: `企業`,
      name: `テスト`,
      url: `https://test.jp/news`,
      frequency: `毎日12:00`,
    },
  ];
  return (
    <>
      <Box bg={`#EAEAEA`} h={`${1080 / 19.2}vw`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`サイト管理`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />
              <WideButton
                w={`${200 / 19.2}vw`}
                mt={`${13 / 19.2}vw`}
                text={`新規登録する`}
              />
            </Flex>
            <ContentContainer h={`${702 / 19.2}vw`}>
              <CrawlerTable list={list} />
            </ContentContainer>
            <Pagination />
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
