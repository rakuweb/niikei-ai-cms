import React, { FC, useState } from 'react';
import { Box, Flex, TableContainer, useDisclosure } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { WideButton } from 'components/Button/WideButton';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { Pagination } from 'components/Pagination';
import { ArticlesTable } from 'components/organisms/ArticlesTable';
import { DraftsTable } from 'components/organisms/DraftsTable';
import * as admin from 'firebase-admin';
import { Popup } from 'components/Articles/PopupComponent';
import { InternalLink } from 'components/links/InternalLink';

export type PresenterProps = {
  data?: {
    title: string;
    url: string;
    document_id: string;
    status: string;
    category: string;
    wp_url: string;
    created_at: Date;
    updated_at: admin.firestore.Timestamp;
    due_date: Date;
    created_by?: admin.firestore.DocumentReference;
    name?: string;
  }[];
};
export const Presenter: FC<PresenterProps> = ({ data }) => {
  const title = `下書き記事一覧`;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Box bg={`#EAEAEA`} h={`auto`} minH={`100vh`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`設定`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />

              <InternalLink href={'/articles/new'}>
                <WideButton
                  w={`${200 / 19.2}vw`}
                  mt={`${13 / 19.2}vw`}
                  text={`新規作成する`}
                />
              </InternalLink>
            </Flex>

            <DraftsTable data={data} currentPage={currentPage} />
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
