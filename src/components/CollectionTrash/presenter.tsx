import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { Timestamp } from 'firebase/firestore';
import { CollectionsTrashTable } from '../organisms/CollectionsTrashTable';
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
              pagename1={`サイト管理`}
              pagelink1={routes.crawlersCollections}
              pagename2={titles}
            />
            <Flex justify={`space-between`}>
              <Title title={titles} />
            </Flex>

            <CollectionsTrashTable data={data} currentPage={0} />
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
