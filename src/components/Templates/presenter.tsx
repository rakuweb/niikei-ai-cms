import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { TemplatesContainer } from 'components/Container/TemplatesContainer';
import { Preview } from './Preview';
import { Inputcolumn } from './Inputcolumn';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const title = `新規作成する`;

  return (
    <>
      <Box bg={`#EAEAEA`} h={`auto`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`テンプレート管理`} pagename2={title} />

            <Title title={title} />

            <TemplatesContainer>
              <Flex>
                <Box w={`${786 / 19.2}vw`}>
                  <Inputcolumn />
                </Box>
                <Box w={`${786 / 19.2}vw`} bg={`#F8F8F8`}>
                  <Preview />
                </Box>
              </Flex>
            </TemplatesContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
