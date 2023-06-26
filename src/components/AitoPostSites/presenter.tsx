import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { WideButton } from 'components/Button/WideButton';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { InternalLink } from 'components/links/InternalLink';
import * as admin from 'firebase-admin';
import { SitesTable } from 'components/organisms/SitesTable';
import { AutoPostSitesTable } from '../organisms/AutoPostSitesTable';

export type PresenterProps = {
  data?: {
    id?: string;
    name?: string;
    url?: string;
    xpath?: string;
    interval1?: string;
    interval2?: string;
    created_at?: admin.firestore.Timestamp;
    category?: string;
    is_notified?: boolean;
    is_renewal?: boolean;
    is_auto_posts?: boolean;
  }[];
  titles?: string;
  titles2?: string;
  urls?: string;
};

export const Presenter: FC<PresenterProps> = ({
  data,
  titles,
  titles2,
  urls,
}) => {
  return (
    <>
      <Box bg={`#EAEAEA`} h={`auto`} minH={`100vh`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={titles2} pagename2={titles} />
            <Flex justify={`space-between`}>
              <Title title={titles} />
            </Flex>

            <AutoPostSitesTable data={data} urls={urls} />
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
