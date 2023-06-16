import React, { FC } from 'react';
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
  Switch,
} from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { WideButton } from 'components/Button/WideButton';
import { GrayButton } from 'components/Button/GrayButton';
import { InternalLink } from 'components/links/InternalLink';
import { css } from '@emotion/react';

export type PresenterProps = {
  list: {
    status: boolean;
    created_at: string;
    title: string;
    content: string;
  }[];
};

export const Presenter: FC<PresenterProps> = ({ list }) => {
  const url = '/settings/users';
  const itemsPerPage = 10;

  const handleDelete = async (id: string) => {
    console.log('Handle delete for id:', id);
  };
  return (
    <>
      <Box>
        <Text letterSpacing={`0`} fontSize={`${16 / 19.2}vw`}>
          <TableContainer>
            <Table>
              <Thead>
                <Tr css={thstyles}>
                  <Th w={`${70 / 19.2}vw`}>自動処理</Th>
                  <Th w={`${100 / 19.2}vw`}>日時</Th>
                  <Th w={`${400 / 19.2}vw`}>タイトル</Th>
                  <Th w={`${400 / 19.2}vw`}>お知らせ</Th>
                  <Th w={`${140 / 19.2}vw`}>アクション</Th>
                </Tr>
              </Thead>

              <Tbody>
                {list.map((user, index) => (
                  <Tr key={index} css={tdstyles}>
                    <Td
                      w={`${52 / 19.2}vw`}
                      h={`${59 / 19.2}vw`}
                      borderLeft={`1px`}
                    >
                      <Switch
                        size={{ lg: `sm`, xl: `md`, '2xl': `lg` }}
                        isChecked={user.status || false}
                        sx={{
                          '.css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]':
                            {
                              backgroundColor: '#49BAC0',
                            },
                        }}
                      />
                    </Td>
                    <Td>{user.created_at}</Td>
                    <Td>{user.title}</Td>
                    <Td>{user.content}</Td>

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
