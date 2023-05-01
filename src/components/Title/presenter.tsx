/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Text } from 'components/texts/Text';

export type PresenterProps = { title: string };

export const Presenter: FC<PresenterProps> = ({ title }) => {
  return (
    <Text
      fontSize={`${34 / 19.2}vw`}
      color={`#444857`}
      lineHeight={`${49 / 19.2}vw`}
      letterSpacing={`0`}
      alignItems={`center`}
      mb={`${30 / 19.2}vw`}
      fontWeight={`bold`}
    >
      {title}
    </Text>
  );
};
