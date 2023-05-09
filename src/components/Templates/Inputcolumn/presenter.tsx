import React, { FC } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';

import Subtitle from './Subtitle';
import { WideButton } from 'components/Button/WideButton';
import AccountInput from './AccountInput';
import Password from './Password';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const list = [
    `0歳`,
    `1~4歳`,
    `5~9歳`,
    `10歳代`,
    `20歳代`,
    `30歳代`,
    `40歳代`,
    `50歳代`,
    `60歳代`,
    `70歳代`,
    `80歳代`,
    `90歳代`,
  ];

  return (
    <>
      <Text
        letterSpacing={`0`}
        fontSize={`${16 / 19.2}vw`}
        py={`${40 / 19.2}vw`}
        px={`${30 / 19.2}vw`}
      >
        <Box mb={`${15 / 19.2}vw`}>
          <Subtitle title={`年代別患者数`} />
          {list.map((list) => (
            <HStack key={list} mb={`${30 / 19.2}vw`} spacing={`${40 / 19.2}vw`}>
              <Box w={{ lg: `${110 / 10.2}vw`, xl: `${180 / 19.2}vw` }}>
                {list}
              </Box>
              <AccountInput />
            </HStack>
          ))}

          <WideButton text={`公開する`} w={`${200 / 19.2}vw`} />
        </Box>
      </Text>
    </>
  );
};
