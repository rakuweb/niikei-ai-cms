/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import { Image } from 'components/images/Image';
import { Text } from 'components/texts/Text';
import { InternalLink } from 'components/links/InternalLink';

export type PresenterProps = { pagename1: string; pagename2: string };

export const Presenter: FC<PresenterProps> = ({ pagename1, pagename2 }) => {
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
        <InternalLink
          href={`/`}
          _hover={{
            color: `#49bac0`,
          }}
        >
          {pagename1}
        </InternalLink>

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

        <InternalLink
          href={`/`}
          _hover={{
            color: `#49bac0`,
          }}
        >
          {pagename2}
        </InternalLink>
      </Text>
    </>
  );
};
