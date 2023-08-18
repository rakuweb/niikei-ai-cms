import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { Timestamp } from 'firebase/firestore';
import { AddAutoPostForm } from '../organisms/AddAutoPostForm';
import { Category } from '@/firebase/firestore/sites';
import { routes } from '@/constants/routes';

export type PresenterProps = {
  data?: {
    id?: string;
    name?: string;
    url?: string;
    xpath?: string;
    interval1?: string;
    interval2?: string;
    created_at?: Timestamp;
    category?: Category;
    is_notified?: boolean;
    is_renewal?: boolean;
    is_auto_posts: boolean;
  };
  id?: string;
};

export const Presenter: FC<PresenterProps> = ({ data, id }) => {
  const title = `サイトを登録`;

  return (
    <>
      <Box bg={`#EAEAEA`} h={`100%`} minH={'100vh'} pb={'2vw'}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs
              pagename1={`サイト管理`}
              pagelink1={routes.autoPostsArticles}
              pagename2={title}
            />
            <Flex justify={`space-between`}>
              <Title title={title} />
            </Flex>
            <ContentContainer h={`auto`}>
              <AddAutoPostForm data={data} id={id} />
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
