import React, { FC } from 'react';
import { Box } from '@chakra-ui/react';
import { Text } from 'components/texts/Text';

import Subtitle from './Subtitle';
import { NameForm } from './NameForm';
import { PasswordForm } from './PasswordForm';
import { useCompanyStore, selectCompanyItem } from 'features/company';
import { RoleSelect } from './RoleSelect';
import { EmailComponent } from './EmailComponent';

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

        <RoleSelect />
        <EmailComponent id={''} />
        <PasswordForm />
      </Text>
    </>
  );
};
