import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { AutoPostArticlesTable } from '../organisms/AutoPostArticlesTable';
import { Category } from '@/firebase/firestore/sites';

export type PresenterProps = {
  data?: Partial<{
    title: string;
    url: string;
    document_id: string;
    status: string;
    category: Category;
    wp_url: string;
    created_at: Date;
    due_date: Date;
    name?: string;
    id: string;
  }>[];
  titles?: string;
};
export const Presenter: FC<PresenterProps> = ({ data, titles }) => {
  return (
    <>
      <Box bg={`#EAEAEA`} h={`auto`} minH={`100vh`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`自動投稿管理`} pagename2={titles} />
            <Flex justify={`space-between`}>
              <Title title={titles} />
            </Flex>

            <AutoPostArticlesTable data={data} currentPage={0} />
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
