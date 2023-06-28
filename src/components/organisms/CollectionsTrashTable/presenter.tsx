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
import { ExternalLink } from '@/components/links/ExternalLink';
import {
  Timestamp,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { user } from 'firebase-functions/v1/auth';
import { getAuth } from 'firebase/auth';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

export type PresenterProps = {
  data?: {
    created_at: Timestamp;
    message: string;
    title: string;
    status: string;
    category: string;
    id: string;
    url: string;
  }[];

  currentPage: number;
};

export const Presenter: FC<PresenterProps> = ({ data }) => {
  const itemsPerPage = 10;

  const [selectedItems, setSelectedItems] = useState<{ [id: string]: boolean }>(
    {}
  );

  const handleCheckboxClick = (id: string) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('本当に削除しますか？')) {
      return;
    }
    const auth = getAuth();
    const user = auth.currentUser;
    const employeeDocRef = doc(db, 'users', user.uid as string);
    const employeeDocSnap = await getDoc(employeeDocRef);
    const ref = employeeDocSnap.data()?.company_ref;
    const docRef = doc(ref, 'infomation', id);
    await deleteDoc(docRef);
    window.alert('選択項目を削除しました');
    location.reload();
  };

  const handleDeleteSelectedItems = async () => {
    if (!window.confirm('本当に削除しますか？')) {
      return;
    }
    const auth = getAuth();
    const user = auth.currentUser;
    const employeeDocRef = doc(db, 'users', user.uid as string);
    const employeeDocSnap = await getDoc(employeeDocRef);
    const ref = employeeDocSnap.data()?.company_ref;

    for (const id of Object.keys(selectedItems)) {
      if (selectedItems[id]) {
        console.log(id);
        const docRef = doc(ref, 'infomation', id);
        await deleteDoc(docRef);
      }
    }

    window.alert('選択項目を削除しました');
    location.reload();
  };
  const handleExecute = () => {
    if (selectedValue === 'まとめて削除する') {
      handleDeleteSelectedItems();
    } else if (selectedValue === 'まとめて元に戻す') {
      handleUndoSelectedItems();
    }
  };
  const [selectedValue, setSelectedValue] = useState('');

  // in_reviewに戻す

  const handleUndo = async (id: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const employeeDocRef = doc(db, 'users', user.uid as string);
    const employeeDocSnap = await getDoc(employeeDocRef);
    const ref = employeeDocSnap.data()?.company_ref;
    const docRef = doc(ref, 'infomation', id);

    await updateDoc(docRef, {
      status: 'in_review',
    });

    window.alert('新着情報一覧に戻しました。');
    location.reload();
  };
  const handleUndoSelectedItems = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const employeeDocRef = doc(db, 'users', user.uid as string);
    const employeeDocSnap = await getDoc(employeeDocRef);
    const ref = employeeDocSnap.data()?.company_ref;

    for (const id of Object.keys(selectedItems)) {
      if (selectedItems[id]) {
        const docRef = doc(ref, 'infomation', id);
        await updateDoc(docRef, {
          status: 'in_review',
        });
      }
    }

    window.alert('選択項目を新着情報一覧に戻しました。');
    location.reload();
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
                                checked={selectedItems[data.id || '']}
                                onChange={() =>
                                  handleCheckboxClick(data.id || '')
                                }
                              />
                            </Flex>
                          </Td>
                          <Td>
                            {dayjs(data.created_at.toDate()).format(
                              'YYYY/MM/DD'
                            )}
                          </Td>
                          <Td>{data.category || ''}</Td>
                          <Td>{data?.title || ''}</Td>
                          <Td>{data?.url || ''}</Td>

                          <Td>
                            <Box
                              display={'flex'}
                              justifyContent={'space-around'}
                            >
                              <WideButton
                                text={`元に戻す`}
                                w={`${140 / 19.2}vw`}
                                onClick={() => handleUndo(data.id)}
                              />

                              <GrayButton
                                text={`削除する`}
                                w={`${140 / 19.2}vw`}
                                onClick={() => handleDelete(data.id)}
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
            selectedValue={selectedValue}
            handleSelect={setSelectedValue}
            handleExecute={handleExecute}
            options={['まとめて元に戻す', 'まとめて削除する']}
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
