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
import { TemplatesContainer } from 'components/Container/TemplatesContainer';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const title = `新規作成する`;

  return (
    <>
      <Text pt={`${40 / 19.2}vw`} letterSpacing={`0`}>
        <Box color={`#49BAC0`} fontSize={`${28 / 19.2}vw`} textAlign={`center`}>
          Preview
        </Box>
      </Text>
    </>
  );
};
