import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { WideButton } from 'components/Button/WideButton';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { DraftsTable } from 'components/organisms/DraftsTable';
import { InternalLink } from 'components/links/InternalLink';

export type PresenterProps = {
  data?: {
    title: string;
    url: string;
    document_id: string;
    status: string;
    category: string;
    wp_url: string;
    created_at: Date;
    due_date: Date;
    name?: string;
  }[];
  titles?: string;
};
export const Presenter: FC<PresenterProps> = ({ data, titles }) => {
  return (
    <>
      <Box bg={`#EAEAEA`} h={`auto`} minH={`100vh`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`設定`} pagename2={titles} />
            <Flex justify={`space-between`}>
              <Title title={titles} />

              <InternalLink href={'/articles/new'}>
                <WideButton
                  w={`${200 / 19.2}vw`}
                  mt={`${13 / 19.2}vw`}
                  text={`新規作成する`}
                />
              </InternalLink>
            </Flex>

            <DraftsTable data={data} currentPage={0} />
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
