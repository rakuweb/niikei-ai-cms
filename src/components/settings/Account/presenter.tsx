import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { AccountTable } from 'components/ContentTable/AccountTable';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const title = `アカウント情報`;
  const list = [
    {
      category: `企業`,
      name: `pr times`,
      url: `https://prtimes.jp/main/html/index/pagenum/1`,
      frequency: `毎日12:00`,
    },
  ];
  return (
    <>
      <Box bg={`#EAEAEA`} h={`${1080 / 19.2}vw`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`設定`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />
            </Flex>
            <ContentContainer h={`${781 / 19.2}vw`}>
              <AccountTable />
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
