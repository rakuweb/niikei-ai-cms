import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { AccountTable } from 'components/ContentTable/AccountTable';
import { routes } from '@/constants/routes';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const title = `アカウント情報`;

  return (
    <>
      <Box bg={`#EAEAEA`} h={'auto'} minH={`100vh`} pb={'2.5vw'}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs
              pagename1={`設定`}
              pagelink1={routes.settingsAccount}
              pagename2={title}
            />
            <Flex justify={`space-between`}>
              <Title title={title} />
            </Flex>
            <ContentContainer minH={`${781 / 19.2}vw`}>
              <AccountTable />
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
