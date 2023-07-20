import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { Timestamp } from 'firebase/firestore';
import { AddForm } from 'components/organisms/AddForm';
import { Category } from '@/firebase/firestore/sites';

export type PresenterProps = {
  data?: {
    id?: string;
    name?: string;
    url?: string;
    xpath?: string;
    interval1?: string;
    interval2?: string;
    created_at?: Timestamp;
    category?: Category;
    is_notified?: boolean;
    is_renewal?: boolean;
    is_auto_patrol?: boolean;
  };
  id?: string;
};

export const Presenter: FC<PresenterProps> = ({ data, id }) => {
  const title = `サイトを登録`;

  return (
    <>
      <Box bg={`#EAEAEA`} h={`100%`} minH={'100vh'} pb={'2vw'}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`サイト管理`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />
            </Flex>
            <ContentContainer h={`auto`}>
              <AddForm data={data} id={id} />
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
