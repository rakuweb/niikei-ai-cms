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
import { GrayButton } from 'components/Button/GrayButton';

export type PresenterProps = {
  data?: {
    role: string;
    email: string;
    name: string;
    password: string;
  }[];
};

export const Presenter: FC<PresenterProps> = ({ data }) => {
  return (
    <>
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
                {data?.map((user, index) => (
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
                        />
                      </Flex>
                    </Td>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      <Box display={'flex'} justifyContent={'space-around'}>
                        <WideButton text={`編集する`} w={`${140 / 19.2}vw`} />
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
