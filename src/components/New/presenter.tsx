import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { NewForm } from 'components/organisms/NewForm';
import { routes } from '@/constants/routes';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC<PresenterProps> = () => {
  const title = `ユーザー新規作成`;

  return (
    <>
      <Box bg={`#EAEAEA`} h={`100vh`}>
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
            <ContentContainer h={`${702 / 19.2}vw`}>
              <NewForm />
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
