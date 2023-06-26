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
import { InternalLink } from 'components/links/InternalLink';
import { css } from '@emotion/react';
import { Timestamp } from 'firebase/firestore';
import dayjs from 'dayjs';
import { selectUid, useCompanyStore } from '@/features/company';
import { fetchFortuneLogs } from '@/firebase/firestore/fortuneLogs';

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
  currentPage: any;
};
export const Presenter: FC<PresenterProps> = () => {
  const itemsPerPage = 10;
  const [list, setList] = useState<any[]>([]);
  const companyID = useCompanyStore(selectUid);

  const handleDelete = async (id: string) => {
    console.log('Handle delete for id:', id);
  };

  useEffect(() => {
    const handler = async () => {
      const res = await fetchFortuneLogs(companyID).catch((err) => {
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
                {list.map((log, index) => (
                  <Tr key={index} css={tdstyles}>
                    <Td
                      w={`${52 / 19.2}vw`}
                      h={`${59 / 19.2}vw`}
                      borderLeft={`1px`}
                    >
                      {log.file_name && (
                        <Switch
                          size={{ lg: `sm`, xl: `md`, '2xl': `lg` }}
                          // isChecked={user.status || false}
                          sx={{
                            '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]':
                            {
                              backgroundColor: '#49BAC0',
                            },
                          }}
                        />
                      )}
                    </Td>
                    <Td>{dayjs(log.date.toDate()).format('YYYY/MM/DD')}</Td>
                    <Td>{log.title}</Td>
                    <Td>{log.message}</Td>

                    <Td>
                      <Box display={'flex'} justifyContent={'space-around'}>
                        <InternalLink href={``}>
                          <WideButton text={`編集する`} w={`${140 / 19.2}vw`} />
                        </InternalLink>
                        <GrayButton text={`削除する`} w={`${140 / 19.2}vw`} />
                      </Box>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Text>
      </Box>
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
