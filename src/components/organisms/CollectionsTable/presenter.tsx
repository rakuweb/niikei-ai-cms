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
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
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
    if (!window.confirm('ゴミ箱に移動しますか？')) {
      return;
    }
    const auth = getAuth();
    const user = auth.currentUser;
    const employeeDocRef = doc(db, 'users', user.uid as string);
    const employeeDocSnap = await getDoc(employeeDocRef);
    const ref = employeeDocSnap.data()?.company_ref;
    const docRef = doc(ref, 'infomation', id);

    await updateDoc(docRef, {
      status: 'is_deleted',
    });

    window.alert('ゴミ箱に移動しました');
    location.reload();
  };

  const handleDeleteSelectedItems = async () => {
    if (!window.confirm('ゴミ箱に移動しますか？')) {
      return;
    }
    const auth = getAuth();
    const user = auth.currentUser;
    const employeeDocRef = doc(db, 'users', user.uid as string);
    const employeeDocSnap = await getDoc(employeeDocRef);
    const ref = employeeDocSnap.data()?.company_ref;

    for (const id of Object.keys(selectedItems)) {
      if (selectedItems[id]) {
        const docRef = doc(ref, 'infomation', id);
        await updateDoc(docRef, {
          status: 'is_deleted',
        });
      }
    }

    window.alert('ゴミ箱に移動しました');
    location.reload();
  };

  const handleExecute = () => {
    if (selectedValue === 'まとめて削除する' && handleDeleteSelectedItems) {
      handleDeleteSelectedItems();
    }
    if (selectedValue === 'まとめて記事化する' && handleSetAllStandBy) {
      handleSetAllStandBy();
    }
  };
  const [selectedValue, setSelectedValue] = useState('');

  // 状態をstand_byへ
  const handleSetStandBy = async (id: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const employeeDocRef = doc(db, 'users', user.uid as string);
    const employeeDocSnap = await getDoc(employeeDocRef);
    const ref = employeeDocSnap.data()?.company_ref;
    const docRef = doc(ref, 'infomation', id);

    await updateDoc(docRef, {
      status: 'stand_by',
    });

    window.alert('ステータスを変更しました');
    location.reload();
  };
  const handleSetAllStandBy = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const employeeDocRef = doc(db, 'users', user.uid as string);
    const employeeDocSnap = await getDoc(employeeDocRef);
    const ref = employeeDocSnap.data()?.company_ref;

    for (const id of Object.keys(selectedItems)) {
      if (selectedItems[id]) {
        console.log(id);
        const docRef = doc(ref, 'infomation', id);
        await updateDoc(docRef, {
          status: 'stand_by',
        });
      }
    }
    window.alert('選択項目を記事化しました');
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
                              <ExternalLink href={data?.url || ''}>
                                <WideButton
                                  text={`確認する`}
                                  w={`${140 / 19.2}vw`}
                                />
                              </ExternalLink>
                              <WideButton
                                text={`記事化する`}
                                w={`${140 / 19.2}vw`}
                                onClick={() => handleSetStandBy(data.id)}
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
            handleSetAllStandBy={handleSetAllStandBy}
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
