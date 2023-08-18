import React, { FC, useEffect, useState } from 'react';
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
import { doc, getDoc } from '@firebase/firestore';
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
import { ExternalLink } from 'components/links/ExternalLink';
import { db, auth } from 'src/firebase';
import { updateDoc } from 'firebase/firestore';
import { Category } from '@/firebase/firestore/sites';
import { Status } from '@/firebase/firestore/articles';
import {
  NotificationKind,
  deleteArticleNotificationByID,
  updateArticleNotification,
} from '@/firebase/firestore/employees';
import { selectUid, useCompanyStore } from '@/features/company';
import { selectAccountItem, useAccountStore } from '@/features/account';
import {
  selectDeleteArticleManagementByKindAndID,
  useNotificationsStore,
} from '@/features/notifications';
import { formatDate } from '@/lib';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

export type PresenterProps = {
  data?: Partial<{
    id: string;
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
  currentPage: number;
  isPublish: boolean;
};

export const Presenter: FC<PresenterProps> = ({ data, isPublish }) => {
  const companyID = useCompanyStore(selectUid);
  const { uid: employeeID } = useAccountStore(selectAccountItem);
  const deleteArticleManagementByKindAndID = useNotificationsStore(
    selectDeleteArticleManagementByKindAndID
  );
  const user = auth.currentUser;
  const id = user?.uid;
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

  const handleDeleteSelected = async () => {
    const selectedUrls = Object.keys(selectedItems).filter(
      (url) => selectedItems[url]
    );
    if (!window.confirm('ゴミ箱へ移動しますか？')) {
      return;
    }

    const userDocRef = doc(db, 'users', id);
    const userDoc = await getDoc(userDocRef);
    const refFieldString = userDoc.data().company_ref;

    for (const url of selectedUrls) {
      const index = data.findIndex((item) => item.url === url);
      const document_id = data[index]?.document_id;

      const companyEmployeeDocRef = doc(
        refFieldString,
        'articles',
        document_id
      );
      const companyEmployeeDoc = await getDoc(companyEmployeeDocRef);

      if (userDoc.exists() && companyEmployeeDoc.exists()) {
        await updateDoc(companyEmployeeDocRef, {
          status: 'is_deleted',
        });
      } else {
        alert(
          'サーバへのアクセスに失敗しました。ログアウト後にもう一度ログインしてください。'
        );
        return;
      }
    }

    window.alert('ゴミ箱へ移動しました');
    location.reload();

    setSelectedItems({});
  };

  // DeleteSelected

  // single
  const handleDeleteSingle = async (url: string) => {
    if (!window.confirm('ゴミ箱へ移動しますか？')) {
      return;
    }

    const userDocRef = doc(db, 'users', id);
    const userDoc = await getDoc(userDocRef);
    const refFieldString = userDoc.data().company_ref;

    const index = data.findIndex((item) => item.url === url);
    const document_id = data[index]?.document_id;

    const companyEmployeeDocRef = doc(refFieldString, 'articles', document_id);
    const companyEmployeeDoc = await getDoc(companyEmployeeDocRef);

    if (userDoc.exists() && companyEmployeeDoc.exists()) {
      await updateDoc(companyEmployeeDocRef, {
        status: 'is_deleted',
      });
    } else {
      alert(
        'サーバへのアクセスに失敗しました。ログアウト後にもう一度ログインしてください。'
      );
      return;
    }

    window.alert('ゴミ箱へ移動しました');
    location.reload();
  };

  // 修正依頼
  const handleChangeStatus = async (url: string) => {
    if (!window.confirm('修正依頼を出しますか。')) {
      return;
    }

    const userDocRef = doc(db, 'users', id);
    const userDoc = await getDoc(userDocRef);
    const refFieldString = userDoc.data().company_ref;

    const index = data.findIndex((item) => item.url === url);
    const document_id = data[index]?.document_id;

    const companyEmployeeDocRef = doc(refFieldString, 'articles', document_id);
    const companyEmployeeDoc = await getDoc(companyEmployeeDocRef);

    if (userDoc.exists() && companyEmployeeDoc.exists()) {
      await updateDoc(companyEmployeeDocRef, {
        status: Status.Fixing,
      });
      await updateArticleNotification(
        companyID,
        employeeID,
        NotificationKind.Article.Fixing,
        document_id
      );
    } else {
      alert(
        'サーバへのアクセスに失敗しました。ログアウト後にもう一度ログインしてください。'
      );
      return;
    }

    window.alert('修正記事にしました。');
    location.reload();
  };

  // single

  // DropDown
  const [selectedValue, setSelectedValue] = useState('');

  const handleExecute = () => {
    if (selectedValue === 'まとめて削除する') {
      handleDeleteSelected();
    }
  };
  // DropDown

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const [titles, setTitles] = useState<{ [url: string]: string }>({});
  const [times, setTimes] = useState<{ [url: string]: string }>({});

  useEffect(() => {
    const fetchTitles = async () => {
      const newTitles = {};
      for (const item of data) {
        const title = await getTitle(item.url);
        newTitles[item.url] = title;
      }
      setTitles(newTitles);
    };

    fetchTitles();
  }, [data]);

  useEffect(() => {
    const fetchTimes = async () => {
      const newTimes = {};
      for (const item of data) {
        const times = await getTimes(item.url);
        newTimes[item.url] = times;
      }
      setTimes(newTimes);
    };

    fetchTimes();
  }, [data]);

  async function getTitle(url: string) {
    const response = await fetch(`/api/title?url=${url}`);
    const data2 = await response.json();

    return data2.title;
  }
  async function getTimes(url: string) {
    const response = await fetch(`/api/modified-time?url=${url}`);
    const data2 = await response.json();

    return data2.modifiedTime;
  }

  // 時間ソート
  useEffect(() => {
    const fetchTimes = async () => {
      const newTimes = {};
      for (const item of data) {
        const times = await getTimes(item.url);
        newTimes[item.url] = times;
      }
      setTimes(newTimes);
    };

    fetchTimes();
  }, [data]);

  const timesArray = Object.entries(times);

  timesArray.sort((a, b) => {
    return dayjs(b[1]).valueOf() - dayjs(a[1]).valueOf();
  });

  const sortedData = [...data].sort((a, b) => {
    return dayjs(times[b.url]).valueOf() - dayjs(times[a.url]).valueOf();
  });

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
                      <Th w={`${52 / 19.2}vw`}>アップロード日時</Th>
                      <Th w={`${30 / 19.2}vw`}>カテゴリ</Th>
                      <Th w={`${350 / 19.2}vw`}>タイトル</Th>
                      <Th w={`${350 / 19.2}vw`}>作成者</Th>
                      <Th w={`${10 / 19.2}vw`}>アクション</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {sortedData
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
                          <Td>{formatDate(times[data.url || ''])}</Td>
                          <Td>{data?.category.name || ''}</Td>
                          <Td>{titles[data?.url || '']}</Td>
                          <Td>{data?.name || ''}</Td>

                          <Td>
                            <Box
                              display={'flex'}
                              justifyContent={'space-around'}
                            >
                              <ExternalLink
                                href={`${data?.wp_url || ''}`}
                                onClick={async () => {
                                  await deleteArticleNotificationByID(
                                    companyID,
                                    employeeID,
                                    NotificationKind.Article.Checking,
                                    data.id
                                  );
                                  deleteArticleManagementByKindAndID(
                                    NotificationKind.Article.Checking,
                                    data.id
                                  );
                                }}
                              >
                                <WideButton
                                  text={`確認する`}
                                  w={`${140 / 19.2}vw`}
                                />
                              </ExternalLink>
                              {!isPublish && (
                                <WideButton
                                  mx={`0.5vw`}
                                  text={`修正依頼を出す`}
                                  w={`${140 / 19.2}vw`}
                                  onClick={async () => {
                                    await handleChangeStatus(data.url);
                                    await deleteArticleNotificationByID(
                                      companyID,
                                      employeeID,
                                      NotificationKind.Article.Checking,
                                      data.id
                                    );
                                    deleteArticleManagementByKindAndID(
                                      NotificationKind.Article.Checking,
                                      data.id
                                    );
                                  }}
                                />
                              )}
                              <GrayButton
                                text={`削除する`}
                                w={`${140 / 19.2}vw`}
                                onClick={async () => {
                                  await handleDeleteSingle(data?.url || '');
                                  await deleteArticleNotificationByID(
                                    companyID,
                                    employeeID,
                                    NotificationKind.Article.Checking,
                                    data.id
                                  );
                                  deleteArticleManagementByKindAndID(
                                    NotificationKind.Article.Checking,
                                    data.id
                                  );
                                }}
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
            options={['まとめて削除する']}
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
