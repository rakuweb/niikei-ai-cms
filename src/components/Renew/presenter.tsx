import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import { RenewForm } from 'components/organisms/RenewForm';

export type PresenterProps = {
  data: {
    role: string;
    email: string;
    name: string;
    password: string;
  }[];
};

export const Presenter: FC<PresenterProps> = ({ data }) => {
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
              <RenewForm data={data} />
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
