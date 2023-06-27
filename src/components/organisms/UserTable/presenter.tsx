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
import { Text } from 'components/texts/Text';
import { css } from '@emotion/react';
import { WideButton } from 'components/Button/WideButton';
import { GrayButton } from 'components/Button/GrayButton';
import { InternalLink } from 'components/links/InternalLink';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from 'src/firebase';
import { DropDown } from '../DropDown';
import { ContentContainer } from 'components/Container/ContentContainer';
import { Pagination } from 'components/Pagination';

export type PresenterProps = {
  data?: {
    role: string;
    email: string;
    name: string;
    id: string;
  }[];
  currentPage: number;
};

export const Presenter: FC<PresenterProps> = ({ data }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const url = '/settings/users';
  const itemsPerPage = 10;

  const handleDelete = async (id: string) => {
    if (!window.confirm('本当に削除しますか？')) {
      return;
    }

    const response = await fetch('/api/delete-users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: id }),
    });

    const userDocRef = doc(db, 'users', id);
    const userDoc = await getDoc(userDocRef);
    const refFieldString = userDoc.data().company_ref;

    const companyEmployeeDocRef = doc(
      db,
      'companies',
      refFieldString,
      'employees',
      id
    );
    const companyEmployeeDoc = await getDoc(companyEmployeeDocRef);

    if (userDoc.exists() && companyEmployeeDoc.exists()) {
      await deleteDoc(userDocRef);
      await deleteDoc(companyEmployeeDocRef);

      if (!response.ok) {
        throw new Error('認証情報の削除に失敗しました');
      }
    } else {
      throw new Error('指定したユーザー情報が存在しません');
    }
  };

  const handleSelectUser = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    }
  };

  const handleSingleDelete = async (id: string) => {
    if (!window.confirm('このユーザーを削除しますか？')) {
      return;
    }

    try {
      await handleDelete(id);
      window.alert('ユーザーの削除が成功しました');
      location.reload();
    } catch (error) {
      window.alert(`ユーザーの削除に失敗しました: ${error}`);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('本当に選択された全てのユーザーを削除しますか？')) {
      return;
    }

    const deletePromises = selectedUsers.map((id) => handleDelete(id));
    try {
      await Promise.all(deletePromises);
      window.alert('全てのユーザーの削除が成功しました');
      location.reload();
    } catch (error) {
      window.alert(`一部のユーザーの削除に失敗しました: ${error}`);
    }
  };

  const [selectedValue, setSelectedValue] = useState('');

  const handleExecute = async () => {
    if (selectedValue === 'まとめて削除する') {
      await handleDeleteAll();
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <>
      <ContentContainer h={`${702 / 19.2}vw`}>
        <Box>
          <Text letterSpacing={`0`} fontSize={`${16 / 19.2}vw`}>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr css={thstyles}>
                    <Th w={`${52 / 19.2}vw`} h={`${20 / 19.2}vw`} />
                    <Th w={`${261 / 19.2}vw`}>ユーザー名</Th>
                    <Th w={`${617 / 19.2}vw`}>メールアドレス</Th>
                    <Th w={`${73 / 19.2}vw`}>ステータス</Th>
                    <Th w={`${140 / 19.2}vw`}>アクション</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data
                    ?.slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((user, index) => (
                      <Tr key={index} css={tdstyles}>
                        <Td
                          w={`${52 / 19.2}vw`}
                          h={`${59 / 19.2}vw`}
                          borderLeft={`1px`}
                        >
                          <Flex justify={`center`} alignItems={`center`}>
                            <Checkbox
                              onChange={(e) =>
                                handleSelectUser(user.id, e.target.checked)
                              }
                              borderColor={`#707070`}
                              size={{ lg: `sm`, '2xl': `md` }}
                              sx={{
                                '.css-qeepwd[aria-checked=true], .css-qeepwd[data-checked]':
                                  {
                                    backgroundColor: '#49BAC0',
                                    borderColor: `#49BAC0`,
                                  },
                              }}
                            />
                          </Flex>
                        </Td>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>
                          {user.role === 'editor'
                            ? '編集者'
                            : user.role === 'writer'
                            ? '記者'
                            : user.role}
                        </Td>

                        <Td>
                          <Box display={'flex'} justifyContent={'space-around'}>
                            <InternalLink href={`${url}/${user.id}`}>
                              <WideButton
                                text={`編集する`}
                                w={`${140 / 19.2}vw`}
                              />
                            </InternalLink>
                            <GrayButton
                              text={`削除する`}
                              w={`${140 / 19.2}vw`}
                              onClick={() => handleSingleDelete(user.id)}
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
      </ContentContainer>
      <Flex alignItems={'center'} position={'relative'}>
        <Box position={'absolute'}>
          <DropDown
            selectedValue={selectedValue}
            handleSelect={setSelectedValue}
            handleExecute={handleExecute}
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
