import React, { FC, useState } from 'react';
import { Box, Flex, TableContainer, useDisclosure } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { WideButton } from 'components/Button/WideButton';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { Pagination } from 'components/Pagination';
import { FortunesTable } from '../organisms/FortunesTable';
import { Timestamp } from 'firebase/firestore';
import { InternalLink } from '../links/InternalLink';
import { routes } from '@/constants/routes';

export type PresenterProps = {
  data?: {
    created_at: Timestamp;
    content: string;
    title: string;
    status: string;
    image: string;
    url: string;
    id: string;
  }[];
  currentPage: number;
};
export const Presenter: FC<PresenterProps> = ({ data }) => {
  const title = `コンテンツ一覧`;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const { onOpen } = useDisclosure();
  return (
    <>
      <Box bg={`#EAEAEA`} h={`100%`} minH={`100vh`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`オリジナル配信管理`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />

              <InternalLink href={routes.fortunesUpload}>
                <WideButton
                  onClick={onOpen}
                  w={`${200 / 19.2}vw`}
                  mt={`${13 / 19.2}vw`}
                  text={`アップロードする`}
                />
              </InternalLink>
            </Flex>

            <ContentContainer h={`${702 / 19.2}vw`}>
              <TableContainer>
                <FortunesTable data={data} currentPage={undefined} />
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
