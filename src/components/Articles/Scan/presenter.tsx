import React, { FC, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import Fileselect from './Fileselect';
import Read from './Read';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const title = `データを読み込む`;
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  return (
    <>
      <Box bg={`#EAEAEA`} h={`${1080 / 19.2}vw`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`記事管理`} pagename2={title} />

            <Title title={title} />
            <ContentContainer px={`0`}>
              <Flex
                fontSize={`${16 / 19.2}vw`}
                letterSpacing={`0`}
                borderBottom={`1px solid #D6D6D6`}
                px={`${30 / 19.2}vw`}
              >
                <Box
                  w={`${71 / 19.2}vw`}
                  textAlign={`center`}
                  pb={`${12 / 19.2}vw`}
                  borderBottom={`3px solid #49BAC0`}
                >
                  PDF
                </Box>
                <Box
                  w={`${71 / 19.2}vw`}
                  textAlign={`center`}
                  color={`#D6D6D6`}
                >
                  音声
                </Box>
              </Flex>
              <Flex
                w={`${1310 / 19.2}vw`}
                pt={`${60.5 / 19.2}vw`}
                pl={`${30 / 19.2}vw`}
                justify={`space-between`}
              >
                <Fileselect setSelectedFileContent={setSelectedFileContent} />
                <Read text={selectedFileContent} />
              </Flex>
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
