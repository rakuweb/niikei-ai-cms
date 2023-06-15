import React, { FC, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  Flex,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ja';

import { Text } from 'components/texts/Text';
import { WideButton } from 'components/Button/WideButton';
import { GrayButton } from 'components/Button/GrayButton';
import { ContentContainer } from 'components/Container/ContentContainer';
import { Pagination } from 'components/Pagination';
import { DropDown } from '../DropDown';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

export type PresenterProps = {
  data?: {
    title: string;
    url: string;
    document_id: string;
    status: string;
    category: string;
    wp_url: string;
    created_at: Date;
    due_date: Date;
    name?: string;
  }[];
  currentPage: number;
};

export const Presenter: FC<PresenterProps> = ({ data }) => {
  const itemsPerPage = 10;

  const [selectedItems, setSelectedItems] = useState<{
    [url: string]: boolean;
  }>({});
  const handleCheckboxClick = (url: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [url]: !prevState[url],
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <ContentContainer h={`${702 / 19.2}vw`}>
        <TableContainer>
          <Box>
            <Text letterSpacing={`0`} fontSize={`${16 / 19.2}vw`}>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr css={thstyles}>
                      <Th w={`${52 / 19.2}vw`} h={`${20 / 19.2}vw`} />
                      <Th w={`${52 / 19.2}vw`}>更新日時</Th>
                      <Th w={`${30 / 19.2}vw`}>カテゴリ</Th>
                      <Th w={`${350 / 19.2}vw`}>タイトル</Th>
                      <Th w={`${350 / 19.2}vw`}>URL</Th>
                      <Th w={`${10 / 19.2}vw`}>アクション</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {data
                      ?.slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((data, index) => (
                        <Tr key={index} css={tdstyles}>
                          <Td
                            w={`${52 / 19.2}vw`}
                            h={`${59 / 19.2}vw`}
                            borderLeft={`1px`}
                          >
                            <Flex justify={`center`} alignItems={`center`}>
                              <Checkbox
                                borderColor={`#707070`}
                                size={{ lg: `sm`, '2xl': `md` }}
                                sx={{
                                  '.css-qeepwd[aria-checked=true], .css-qeepwd[data-checked]':
                                  {
                                    backgroundColor: '#49BAC0',
                                    borderColor: `#49BAC0`,
                                  },
                                }}
                                checked={selectedItems[data.url || '']}
                                onChange={() =>
                                  handleCheckboxClick(data.url || '')
                                }
                              />
                            </Flex>
                          </Td>
                          <Td>test</Td>
                          <Td>{data?.category || ''}</Td>
                          <Td>test</Td>
                          <Td>{data?.name || ''}</Td>

                          <Td>
                            <Box
                              display={'flex'}
                              justifyContent={'space-around'}
                            >
                              <WideButton
                                text={`確認する`}
                                w={`${140 / 19.2}vw`}
                              />
                              <WideButton
                                text={`記事化する`}
                                w={`${140 / 19.2}vw`}
                              />

                              <GrayButton
                                text={`削除する`}
                                w={`${140 / 19.2}vw`}
                              />
                            </Box>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Text>
          </Box>
        </TableContainer>
      </ContentContainer>
      <Flex alignItems={'center'} position={'relative'}>
        <Box position={'absolute'}>
          <DropDown
            selectedValue={''}
            handleSelect={function(value: string): void {
              throw new Error('Function not implemented.');
            }}
            handleExecute={function(): void {
              throw new Error('Function not implemented.');
            }}
          />
        </Box>
        <Pagination
          currentPage={currentPage}
          totalData={data ? data.length : 0}
          itemsPerPage={10}
          handlePageChange={handlePageChange}
        />
      </Flex>
    </>
  );
};

const thstyles = css`
  th {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: ${14 / 19.2}vw;
    letter-spacing: 0;
    border-color: #d6d6d6;
    padding: 0 ${20 / 19.2}vw ${12 / 19.2}vw;
  }
`;

const tdstyles = css`
  td {
    letter-spacing: 0;
    border-color: #d6d6d6;
    border-right: 1px solid #d6d6d6;
    padding: 0 ${20 / 19.2}vw;
  }
`;
