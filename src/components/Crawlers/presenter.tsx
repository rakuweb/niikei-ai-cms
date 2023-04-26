import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { WideButton } from 'components/Button/WideButton';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { CrawlerTable } from 'components/ContentTable/CrawlerTable';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const title = `登録情報一覧`;
  return (
    <>
      <Box bg={`#EAEAEA`} h={`100vh`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs />
            <Flex justify={`space-between`}>
              <Title title={title} />
              <WideButton
                w={`${200 / 19.2}vw`}
                mt={`${13 / 19.2}vw`}
                text={`新規登録する`}
              />
            </Flex>
            <ContentContainer h={`${702 / 19.2}vw`}>
              <CrawlerTable />
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
