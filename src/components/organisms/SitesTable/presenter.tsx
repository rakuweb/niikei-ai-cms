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
  Flex,
  Switch,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { doc, getDoc, deleteDoc } from '@firebase/firestore';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ja';
import * as admin from 'firebase-admin';

import { Text } from 'components/texts/Text';
import { WideButton } from 'components/Button/WideButton';
import { GrayButton } from 'components/Button/GrayButton';
import { ContentContainer } from 'components/Container/ContentContainer';
import { Pagination } from 'components/Pagination';
import { db, auth } from 'src/firebase';
import { InternalLink } from 'components/links/InternalLink';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

export type PresenterProps = {
  data?: {
    id?: string;
    name?: string;
    url?: string;
    xpath?: string;
    interval1?: string;
    interval2?: string;
    created_at?: admin.firestore.Timestamp;
    category?: string;
    is_notified?: boolean;
    is_renewal?: boolean;
    is_auto_posts?: boolean;
  }[];
  titles?: string;
  urls?: string;
};

export const Presenter: FC<PresenterProps> = ({ data = [], urls }) => {
  const user = auth.currentUser;
  const itemsPerPage = 10;

  const handleDeleteSingle = async (id: string) => {
    if (!window.confirm('削除しますか？')) {
      return;
    }
    try {
      if (id && user) {
        const employeeDocRef = doc(db, 'users', user.uid);
        const employeeDocSnap = await getDoc(employeeDocRef);
        const ref = employeeDocSnap.data()?.company_ref;
        const docRef = doc(ref, 'registered_sites', id);
        await deleteDoc(docRef);
      }
      window.alert('選択項目を削除しました');
      location.reload();
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
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
                      <Th w={`${52 / 19.2}vw`}>自動処理</Th>
                      <Th w={`${52 / 19.2}vw`}>カテゴリ</Th>
                      <Th w={`${261 / 19.2}vw`}>登録名</Th>
                      <Th w={`${617 / 19.2}vw`}>URL</Th>
                      <Th w={`${73 / 19.2}vw`}>巡回頻度</Th>
                      <Th w={`${61 / 19.2}vw`}>通知</Th>
                      <Th w={`${140 / 19.2}vw`}>アクション</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {(data || [])
                      .slice(
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
                            <Switch
                              size={{ lg: `sm`, xl: `md`, '2xl': `lg` }}
                              isChecked={data?.is_renewal || false}
                              sx={{
                                '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]':
                                  {
                                    backgroundColor: '#49BAC0',
                                  },
                              }}
                            />
                          </Td>
                          <Td>{data?.category || ''}</Td>
                          <Td>{data?.name || ''}</Td>
                          <Td>{data?.url || ''}</Td>
                          <Td>
                            {data?.interval1 || ''}
                            {data?.interval2 || ''}
                          </Td>

                          <Td>
                            <Switch
                              size={{ lg: `sm`, xl: `md`, '2xl': `lg` }}
                              isChecked={data?.is_notified || false}
                              isReadOnly
                              sx={{
                                '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]':
                                  {
                                    backgroundColor: '#49BAC0',
                                  },
                              }}
                            />
                          </Td>
                          <Td>
                            <Box
                              display={'flex'}
                              justifyContent={'space-around'}
                            >
                              <InternalLink href={`${urls}/${data?.id}`}>
                                <WideButton
                                  text={`編集する`}
                                  w={`${110 / 19.2}vw`}
                                />
                              </InternalLink>
                              <GrayButton
                                text={`削除する`}
                                w={`${110 / 19.2}vw`}
                                onClick={() =>
                                  handleDeleteSingle(data?.id || '')
                                }
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
