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
  };
};

export const Presenter: FC<PresenterProps> = ({ data }) => {
  const title = `アカウント情報`;

  return (
    <>
      <Box bg={`#EAEAEA`} h={'auto'} pb={'2.5vw'}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`サイト管理`} pagename2={title} />
            <Flex justify={`space-between`}>
              <Title title={title} />
            </Flex>
            <ContentContainer h={'auto'}>
              <RenewForm data={data} id={''} />
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
