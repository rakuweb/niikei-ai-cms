import React, { FC } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';

import Subtitle from './Subtitle';
import { WideButton } from 'components/Button/WideButton';
import { NameForm } from './NameForm';
import { PasswordForm } from './PasswordForm';

import { useCompanyStore, selectCompanyItem } from 'features/company';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const company = useCompanyStore(selectCompanyItem);

  return (
    <>
      <Text letterSpacing={`0`} fontSize={`${16 / 19.2}vw`}>
        <Subtitle title={`会社名`} />
        <Box lineHeight={`1.5em`} mb={`${50 / 19.2}vw`} fontWeight={`400`}>
          {company.name}
        </Box>

        <NameForm />

        <Box mb={`${50 / 19.2}vw`}>
          <Subtitle title={`権限`} />
          <HStack mb={`${30 / 19.2}vw`} spacing={`${40 / 19.2}vw`}>
            <Box
              w={{ lg: `${110 / 10.2}vw`, xl: `${180 / 19.2}vw` }}
            >{`ユーザ権限`}</Box>
            {/*
            セレクトボックス追加
            <AccountInput />
            */}
          </HStack>
          <WideButton text={`変更する`} w={`${200 / 19.2}vw`} />
        </Box>

        <PasswordForm />
      </Text>
    </>
  );
};
