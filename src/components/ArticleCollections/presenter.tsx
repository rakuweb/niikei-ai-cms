import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';

import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ArticleCollectionsTable } from '../organisms/ArticleCollectionsTable';
import { Category } from '@/firebase/firestore/sites';
import { routes } from '@/constants/routes';

export type PresenterProps = {
  data?: {
    created_at: Timestamp;
    message: string;
    title: string;
    status: string;
    category: Category;
    url: string;
    id: string;
  }[];
  titles: string;
};

export const Presenter: FC<PresenterProps> = ({ data, titles }) => {
  return (
    <>
      <Box bg={`#EAEAEA`} h={`auto`} minH={`100vh`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs
              pagename1={`記事管理`}
              pagelink1={routes.articlesNew}
              pagename2={titles}
            />
            <Flex justify={`space-between`}>
              <Title title={titles} />
            </Flex>

            <ArticleCollectionsTable data={data} currentPage={0} />
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
