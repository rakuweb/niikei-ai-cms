import React, { FC, useState } from 'react';
import { Box, Flex, Input } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Title } from 'components/Title';
import { OutsideContainer } from 'components/Container/OutsideContainer';
import { ContentContainer } from 'components/Container/ContentContainer';
import Fileselect from './Fileselect';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const title = `アップロードする`;
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  const [isPDFSelected, setIsPDFSelected] = useState(true);

  const handlePDFButtonClick = () => {
    setIsPDFSelected(true);
  };

  const handleMP3ButtonClick = () => {
    setIsPDFSelected(false);
  };
  const handleFileSelection = (selectedFile) => {
    setSelectedFileContent(selectedFile);
  };

  return (
    <>
      <Box bg={`#EAEAEA`} h={`100vh`}>
        <OutsideContainer>
          <Text>
            <Breadcrumbs pagename1={`オリジナル配信管理`} pagename2={title} />

            <Title title={title} />
            <ContentContainer px={`0`}>
              <Box w={`${400 / 19.2}vw`} ml={`${30 / 19.2}vw`}>
                <Text fontSize={'1vw'} mb={'0.5vw'}>
                  タイトル
                </Text>
                <Input type="text" borderRadius={'none'} />
              </Box>
              <Box
                w={`${1310 / 19.2}vw`}
                pt={`${60.5 / 19.2}vw`}
                pl={`${30 / 19.2}vw`}
              >
                {' '}
                <Text fontSize={'1vw'} mb={'0.5vw'}>
                  カバー画像
                </Text>
                <Fileselect setSelectedFileContent={setSelectedFileContent} />
              </Box>
            </ContentContainer>
          </Text>
        </OutsideContainer>
      </Box>
    </>
  );
};
