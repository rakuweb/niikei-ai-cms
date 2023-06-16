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
import { FortunesTable } from '../organisms/FortunesTable';

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
  const title = `コンテンツ一覧`;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const list = [
    {
      status: true,
      created_at: '2023/05/24',
      title: `記事の公開`,
      content: `占い記事を公開しました`,
    },
    {
      status: true,
      created_at: '2023/05/24',
      title: `記事の公開`,
      content: `占い記事を公開しました`,
    },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={`#EAEAEA`} h={`100%`} minH={`100vh`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`オリジナル配信管理`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />

              <WideButton
                onClick={onOpen}
                w={`${200 / 19.2}vw`}
                mt={`${13 / 19.2}vw`}
                text={`新規作成する`}
              />
            </Flex>

            <ContentContainer h={`${702 / 19.2}vw`}>
              <TableContainer>
                <FortunesTable list={list} />
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
