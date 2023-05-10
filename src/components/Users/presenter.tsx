import React, { FC } from 'react';
import { Box, Flex, Select } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { WideButton } from 'components/Button/WideButton';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { CrawlerTable } from 'components/ContentTable/CrawlerTable';
import { Pagination } from 'components/Pagination';
import { UserTable } from 'components/organisms/UserTable';
import { InternalLink } from 'components/links/InternalLink';

export type PresenterProps = {
  data: {
    password: string;
    email: string;
    name: string;
  }[];
};

export const Presenter: FC<PresenterProps> = ({ data }) => {
  const title = `ユーザ情報`;

  return (
    <>
      <Box bg={`#EAEAEA`} h={`${1080 / 19.2}vw`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`設定`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />
              <InternalLink href={'/settings/users/new'}>
                <WideButton
                  w={`${200 / 19.2}vw`}
                  mt={`${13 / 19.2}vw`}
                  text={`新規登録する`}
                />
              </InternalLink>
            </Flex>

            <ContentContainer h={`${702 / 19.2}vw`}>
              <UserTable data={data} />
            </ContentContainer>

            <Pagination />
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
