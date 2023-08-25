import React, { FC, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import Fileselect from './Fileselect';
import Read from './Read';
import Mp3select from './Mp3select';
import { routes, sidebarItems } from '@/constants/routes';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const title = `新規作成する`;
  const [selectedFileContent, setSelectedFileContent] = useState('');
  const [isPDFSelected, setIsPDFSelected] = useState(true);

  const handlePDFButtonClick = () => {
    setIsPDFSelected(true);
  };

  const handleMP3ButtonClick = () => {
    setIsPDFSelected(false);
  };
  // const handleFileSelection = (selectedFile) => {
  //   setSelectedFileContent(selectedFile);
  // };

  return (
    <>
      <Box bg={`#EAEAEA`} h={`100%`} minH={'100vh'} paddingBottom={'2vw'}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs
              pagename1={sidebarItems.createArticle}
              pagelink1={routes.articlesNew}
              pagename2={title}
            />

            <Title title={title} />
            <ContentContainer px={`0`}>
              <Flex
                letterSpacing={`0`}
                borderBottom={`1px solid #D6D6D6`}
                px={`${30 / 19.2}vw`}
              >
                <Box
                  as="button"
                  w={`${71 / 19.2}vw`}
                  textAlign={`center`}
                  pb={`${12 / 19.2}vw`}
                  color={isPDFSelected ? '#1a202c' : '#D6D6D6'}
                  borderBottom={`3px solid ${
                    isPDFSelected ? '#49BAC0' : '#D6D6D6'
                  }`}
                  onClick={handlePDFButtonClick}
                >
                  PDF
                </Box>
                <Box
                  as="button"
                  w={`${71 / 19.2}vw`}
                  textAlign={`center`}
                  color={isPDFSelected ? '#D6D6D6' : '#1a202c'}
                  pb={`${12 / 19.2}vw`}
                  // mb={'3px'}
                  borderBottom={`3px solid ${
                    isPDFSelected ? '#D6D6D6' : '#49BAC0'
                  }`}
                  onClick={handleMP3ButtonClick}
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
                {isPDFSelected ? (
                  <Fileselect setSelectedFileContent={setSelectedFileContent} />
                ) : (
                  <Mp3select setSelectedFileContent={setSelectedFileContent} />
                )}
                <Read text={selectedFileContent} />
              </Flex>
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
