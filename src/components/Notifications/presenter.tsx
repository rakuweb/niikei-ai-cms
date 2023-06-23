import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { NotificationsForm } from '../organisms/NotificationsForm';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC<PresenterProps> = () => {
  const title = `メール設定`;

  return (
    <>
      <Box bg={`#EAEAEA`} h={`100vh`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`設定`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />
            </Flex>
            <ContentContainer h={`${702 / 19.2}vw`}>
              <NotificationsForm />
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
