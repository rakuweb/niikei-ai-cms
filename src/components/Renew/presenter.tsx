import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { WideButton } from 'components/Button/WideButton';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { CrawlerTable } from 'components/ContentTable/CrawlerTable';
import { Pagination } from 'components/Pagination';
import { RenewForm } from 'components/organisms/RenewForm';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const title = `登録情報一覧`;

  return (
    <>
      <Box bg={`#EAEAEA`} h={`${1080 / 19.2}vw`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`サイト管理`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />
            </Flex>
            <ContentContainer h={`${702 / 19.2}vw`}>
              <RenewForm />
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
