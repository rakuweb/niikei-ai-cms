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
} from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { css } from '@emotion/react';
import { WideButton } from 'components/Button/WideButton';

export type PresenterProps = {
  list: { date: string; category: string; title: string; status: string }[];
};

export const Presenter: FC<PresenterProps> = ({ list }) => {
  return (
    <>
      <Box>
        <Text letterSpacing={`0`} fontSize={`${16 / 19.2}vw`}>
          <TableContainer>
            <Table>
              <Thead>
                <Tr css={thstyles}>
                  <Th w={`${52 / 19.2}vw`} h={`${20 / 19.2}vw`} />
                  <Th
                    w={`${85 / 19.2}vw`}
                    px={`20px`}
                    fontFamily={`'Noto Sans JP', sans-serif;`}
                  >
                    更新日時
                  </Th>
                  <Th w={`${68 / 19.2}vw`}>カテゴリ</Th>
                  <Th w={`${743 / 19.2}vw`}>タイトル</Th>
                  <Th w={`${70 / 19.2}vw`}>ステータス</Th>
                  <Th w={`${294 / 19.2}vw`}>アクション</Th>
                </Tr>
              </Thead>
              {list.map((list) => (
                <Tbody key={list.date}>
                  <Tr css={tdstyles}>
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
                        />
                      </Flex>
                    </Td>
                    <Td>{list.date}</Td>
                    <Td>{list.category}</Td>
                    <Td>{list.title}</Td>
                    <Td>{list.status}</Td>
                    <Td>
                      <Flex justify={`space-between`}>
                        <WideButton text={`編集する`} w={`${140 / 19.2}vw`} />
                        <WideButton
                          text={`削除する`}
                          w={`${140 / 19.2}vw`}
                          bg={`#8D9696`}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              ))}
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
