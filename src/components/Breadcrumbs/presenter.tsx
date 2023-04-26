/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Image } from 'components/images/Image';
import { Text } from 'components/texts/Text';
import { Link } from '@chakra-ui/react';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  return (
    <>
      <Text
        display={`flex`}
        fontSize={`${16 / 19.2}vw`}
        color={`#525D6B`}
        lineHeight={`${34 / 19.2}vw`}
        letterSpacing={`0`}
        alignItems={`center`}
        mb={`${15 / 19.2}vw`}
      >
        <Link
          href={`/`}
          _hover={{
            color: `#49bac0`,
          }}
        >
          {`サイト管理`}
        </Link>

        <Image
          w={`${7 / 19.2}vw`}
          h={`${10 / 19.2}vw`}
          mx={`${15 / 19.2}vw`}
          image={{
            src: `/images/breadcrumb/right.png`,
            width: 7,
            height: 10,
            alt: `>`,
          }}
        />

        <Link
          href={`/`}
          _hover={{
            color: `#49bac0`,
          }}
        >
          {`サイト管理`}
        </Link>
      </Text>
    </>
  );
};
