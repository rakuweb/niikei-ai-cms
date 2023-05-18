import React, { FC, useState } from 'react';
import { Box, Flex, TableContainer } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { WideButton } from 'components/Button/WideButton';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { Pagination } from 'components/Pagination';
import { UserTable } from 'components/organisms/UserTable';
import { InternalLink } from 'components/links/InternalLink';
import { ArticlesTable } from 'components/organisms/ArticlesTable';

// Articlesコンポーネント
export type PresenterProps = {
  data?: {
    role: string;
    email: string;
    name: string;
    id: string;
  }[];
  currentPage: any;
};
export const Presenter: FC<PresenterProps> = ({ data }) => {
  const title = `記事一覧`;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <Box bg={`#EAEAEA`} h={`${1080 / 19.2}vw`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`設定`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />
              <InternalLink href={'/settings/users/new'}>
                <WideButton
                  w={`${200 / 19.2}vw`}
                  mt={`${13 / 19.2}vw`}
                  text={`新規登録する`}
                />
              </InternalLink>
            </Flex>

            <ContentContainer h={`${702 / 19.2}vw`}>
              <TableContainer>
                <ArticlesTable data={data} currentPage={currentPage as any} />
              </TableContainer>
            </ContentContainer>

            <Pagination
              currentPage={currentPage}
              totalData={data ? data.length : 0}
              itemsPerPage={10}
              handlePageChange={handlePageChange}
            />
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
