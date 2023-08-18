import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { RenewForm } from 'components/organisms/RenewForm';
import Subtitle from '../ContentTable/AccountTable/Subtitle';
import { useCompanyStore, selectCompanyItem } from 'features/company';
import { routes } from '@/constants/routes';

export type PresenterProps = {
  data: {
    role: string;
    email: string;
    name: string;
    password: string;
  };
};

export const Presenter: FC<PresenterProps> = ({ data }) => {
  const title = `アカウント情報`;
  const company = useCompanyStore(selectCompanyItem);
  return (
    <>
      <Box bg={`#EAEAEA`} h={'auto'} minH={'100vh'} pb={'2.5vw'}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs
              pagename1={`サイト管理`}
              pagelink1={routes.crawlersCollections}
              pagename2={title}
            />
            <Flex justify={`space-between`}>
              <Title title={title} />
            </Flex>
            <ContentContainer h={'auto'}>
              <Box fontSize={'1vw'} mb={`1vw`}>
                会社名
              </Box>
              <Box
                lineHeight={`1.5em`}
                mb={`${50 / 19.2}vw`}
                fontSize={'0.8vw'}
              >
                {company.name}
              </Box>
              <RenewForm data={data} id={''} />
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
