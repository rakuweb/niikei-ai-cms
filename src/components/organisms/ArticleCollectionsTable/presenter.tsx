import React, { FC, useState, useEffect } from 'react';
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
import axios from 'axios';
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
import {
  Timestamp,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { getAuth } from 'firebase/auth';
import { Popup } from 'components/Articles/PopupComponent';
import { apiRoutes } from '@/constants/routes';
import { Category } from '@/firebase/firestore/sites';
import {
  INFORMATION_COLLECTION,
  InformationStatus,
} from '@/firebase/firestore/information';
import { selectUid, useCompanyStore } from '@/features/company';
import { selectAccountItem, useAccountStore } from '@/features/account';
import {
  selectDeleteArticleManagementByKindAndID,
  useNotificationsStore,
} from '@/features/notifications';
import {
  NotificationKind,
  deleteArticleNotificationByID,
} from '@/firebase/firestore/employees';
import { formatDate } from '@/lib';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ja');

export type PresenterProps = {
  data?: {
    created_at: Timestamp;
    message: string;
    title: string;
    status: string;
    category: Category;
    id: string;
    url: string;
    siteName?: string;
  }[];

  currentPage: number;
};

export const Presenter: FC<PresenterProps> = ({ data }) => {
  const companyID = useCompanyStore(selectUid);
  const { uid: employeeID } = useAccountStore(selectAccountItem);
  const deleteArticleManagementByKindAndID = useNotificationsStore(
    selectDeleteArticleManagementByKindAndID
  );
  const itemsPerPage = 10;
  const [target, setTarget] = useState('');

  const [selectedItems, setSelectedItems] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [isOpen, setIsOpen] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [categories, setCategories] = useState([]);
  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

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
    if (!window.confirm('新着情報一覧に移動しますか？')) {
      return;
    }
    const auth = getAuth();
    const user = auth.currentUser;
    const employeeDocRef = doc(db, 'users', user.uid as string);
    const employeeDocSnap = await getDoc(employeeDocRef);
    const ref = employeeDocSnap.data()?.company_ref;
    const docRef = doc(ref, INFORMATION_COLLECTION, id);

    await updateDoc(docRef, {
      status: InformationStatus.InReview,
    });

    window.alert('新着情報一覧に移動しました');
    location.reload();
  };

  const handleDeleteSelectedItems = async () => {
    if (!window.confirm('新着情報一覧に移動しますか？')) {
      return;
    }
    const auth = getAuth();
    const user = auth.currentUser;
    const employeeDocRef = doc(db, 'users', user.uid as string);
    const employeeDocSnap = await getDoc(employeeDocRef);
    const ref = employeeDocSnap.data()?.company_ref;

    for (const id of Object.keys(selectedItems)) {
      if (selectedItems[id]) {
        const docRef = doc(ref, INFORMATION_COLLECTION, id);
        await updateDoc(docRef, {
          status: InformationStatus.InReview,
        });
      }
    }

    window.alert('新着情報一覧に移動しました');
    location.reload();
  };

  const handleExecute = () => {
    if (selectedValue === 'まとめて元に戻す' && handleDeleteSelectedItems) {
      handleDeleteSelectedItems();
    }
    if (selectedValue === 'まとめて記事化する' && handleSetAllStandBy) {
      handleSetAllStandBy();
    }
  };
  const [selectedValue, setSelectedValue] = useState('');

  const handleSetStandBy = async (id: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const employeeDocRef = doc(db, 'users', user.uid as string);
    const employeeDocSnap = await getDoc(employeeDocRef);
    const ref = employeeDocSnap.data()?.company_ref;
    const docRef = doc(ref, 'infomation', id);

    await deleteDoc(docRef);
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
        const docRef = doc(ref, 'infomation', id);
        await updateDoc(docRef, {
          status: InformationStatus.StandBy,
        });
      }
    }
    window.alert('選択項目を記事化しました');
    location.reload();
  };

  useEffect(() => {
    const url = apiRoutes.wpCategories;
    const handler = async () => {
      const res = await axios.get(url);
      const data = res.data;

      setCategories(
        data.categories.map((category) => ({
          id: category.id,
          name: category.name,
        }))
      );
    };

    handler();
  }, []);

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
                          {formatDate(data.created_at.toDate().toString()) || ''}
                          </Td>
                          <Td>{data.category.name || ''}</Td>
                          <Td>
                            {`${data?.siteName}の記事が更新されました。` || ''}
                          </Td>
                          {/*
                          <Td>{data?.title || ''}</Td>
                          */}
                          <Td>{data?.url || ''}</Td>

                          <Td>
                            <Box
                              display={'flex'}
                              justifyContent={'space-around'}
                            >
                              <WideButton
                                text={`記事にする`}
                                w={`${140 / 19.2}vw`}
                                onClick={async () => {
                                  setTarget(data.id);
                                  deleteArticleNotificationByID(
                                    companyID,
                                    employeeID,
                                    NotificationKind.Article.Standby,
                                    data.id
                                  );
                                  deleteArticleManagementByKindAndID(
                                    NotificationKind.Article.Standby,
                                    data.id
                                  );
                                  openPopup();
                                }}
                              />

                              <GrayButton
                                ml={`0.5vw`}
                                text={`元に戻す`}
                                w={`${140 / 19.2}vw`}
                                onClick={async () => {
                                  await handleDelete(data.id);
                                  await deleteArticleNotificationByID(
                                    companyID,
                                    employeeID,
                                    NotificationKind.Article.Standby,
                                    data.id
                                  );
                                  await deleteArticleManagementByKindAndID(
                                    NotificationKind.Article.Standby,
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
            handleSetAllStandBy={handleSetAllStandBy}
            options={['まとめて元に戻す']}
          />
        </Box>
        <Pagination
          currentPage={currentPage}
          totalData={data ? data.length : 0}
          itemsPerPage={10}
          handlePageChange={handlePageChange}
        />
      </Flex>
      <Popup
        isOpen={isOpen}
        onClose={closePopup}
        text={popupText}
        setText={setPopupText}
        list={categories}
        onChangeArticle={() => handleSetStandBy(target)}
      />
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
