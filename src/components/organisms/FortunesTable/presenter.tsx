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
  Switch,
} from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { WideButton } from 'components/Button/WideButton';
import { GrayButton } from 'components/Button/GrayButton';
import { css } from '@emotion/react';
import { Timestamp } from 'firebase/firestore';
import dayjs from 'dayjs';
import { selectUid, useCompanyStore } from '@/features/company';
import {
  FortunesLogType,
  deleteFortunesLogs,
  fetchFortunesLogs,
  updateFortunesLog,
} from '@/firebase/firestore/fortuneLogs';
import { ContentContainer } from '@/components/Container/ContentContainer';
import { Pagination } from '@/components/Pagination';
import { ExternalLink } from '@/components/links/ExternalLink';

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

export const Presenter: FC<PresenterProps> = () => {
  const itemsPerPage = 10;
  const [list, setList] = useState<FortunesLogType[]>([]);
  const companyID = useCompanyStore(selectUid);
  const [displayList, setDisplayList] = useState<FortunesLogType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    const start = (newPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayList(list.slice(start, end));

    setCurrentPage(newPage);
  };

  useEffect(() => {
    const handler = async () => {
      const res = await fetchFortunesLogs(companyID).catch((err) => {
        console.error(err);
        return null;
      });
      if (res === null) return;

      setList(res);

      setDisplayList(res.slice(0, itemsPerPage));
    };

    handler();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteFortunesLogs(companyID, id).catch((err) => {
      console.error(err);
      alert('削除に失敗しました。時間経ってからもう一度お試しください。');
      return null;
    });
    if (res === null) return;
    alert('画像を削除しました。');
    location.reload();
  };
  const handleSwitchChange = async (id: string, used: boolean) => {
    const checkOnly = (id: string) => {
      const group = document.querySelectorAll('.used_checkbox');
      group.forEach((elem: HTMLInputElement) => {
        if (elem.id === `switch-${id}`) {
          elem.checked = true;
        } else {
          elem.checked = false;
        }
      });
    };
    const usedList = list.filter((log) => !!log.used);
    if (usedList.length === 1 && usedList[0].id === id) {
      alert('現在使用されている画像です。');
      checkOnly(id);
      return;
    }
    await updateFortunesLog({ companyID, fortunesLogID: id }, { used });
    await updateFortunesLog(
      { companyID, fortunesLogID: usedList[0].id },
      { used: !usedList[0].used }
    );
    const res = await fetchFortunesLogs(companyID).catch((err) => {
      console.error(err);
      return null;
    });
    if (res === null) return;

    const newList = list.map((log) => {
      if (log.id === id) {
        const updatedLog = { ...log, used: used };
        console.log('Updated log:', updatedLog);
        return updatedLog;
      } else if (log.id === usedList[0].id) {
        return { ...log, used: false };
      } else {
        return log;
      }
    });
    setList(newList);

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayList(newList.slice(start, end));

    checkOnly(id);
  };

  useEffect(() => {
    const handler = async () => {
      const res = await fetchFortunesLogs(companyID).catch((err) => {
        console.error(err);
        return null;
      });
      if (res === null) return;

      setList(res);
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
                      <Th w={`${70 / 19.2}vw`}>画像選択</Th>
                      <Th w={`${100 / 19.2}vw`}>日時</Th>
                      <Th w={`${400 / 19.2}vw`}>タイトル</Th>
                      <Th w={`${400 / 19.2}vw`}>お知らせ</Th>
                      <Th w={`${140 / 19.2}vw`}>アクション</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {displayList.map((log, index) => (
                      <Tr key={index} css={tdstyles}>
                        <Td
                          w={`${52 / 19.2}vw`}
                          h={`${59 / 19.2}vw`}
                          borderLeft={`1px`}
                        >
                          {log.filename && (
                            <Switch
                              className={`used_checkbox`}
                              id={`switch-${log.id}`}
                              size={{ lg: `sm`, xl: `md`, '2xl': `lg` }}
                              sx={{
                                '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]':
                                {
                                  backgroundColor: '#49BAC0',
                                },
                              }}
                              onChange={(e) =>
                                handleSwitchChange(log.id, e.target.checked)
                              }
                              isChecked={log.used}
                            />
                          )}
                        </Td>
                        <Td>
                          {log.date &&
                            dayjs(log.date.toDate()).format('YYYY/MM/DD')}
                        </Td>
                        <Td>{log.title}</Td>
                        <Td>{log.message}</Td>

                        <Td>
                          <Box display={'flex'} justifyContent={'space-around'}>
                            <ExternalLink href={log.url}>
                              <WideButton
                                text={`確認する`}
                                w={`${140 / 19.2}vw`}
                              />
                            </ExternalLink>
                            <GrayButton
                              onClick={() => handleDelete(log.id)}
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
      <Pagination
        currentPage={currentPage}
        totalData={list ? list.length : 0}
        itemsPerPage={10}
        handlePageChange={handlePageChange}
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
