import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { WideButton } from 'components/Button/WideButton';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { InternalLink } from 'components/links/InternalLink';
import { ArticlesTrashTable } from '../organisms/ArticlesTrashTable';
import { Category } from '@/firebase/firestore/sites';
import { routes } from '@/constants/routes';

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
  }>[];
  titles?: string;
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

              <InternalLink href={'/articles/new'}>
                <WideButton
                  w={`${200 / 19.2}vw`}
                  mt={`${13 / 19.2}vw`}
                  text={`新規作成する`}
                />
              </InternalLink>
            </Flex>

            <ArticlesTrashTable data={data} currentPage={0} />
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
