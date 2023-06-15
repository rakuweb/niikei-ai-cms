import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';

import { Sidebar } from 'components/Sidebar';
import { Collections } from 'components/Collections';

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
      <Box>
        <Collections titles="公開記事一覧" />
      </Box>
    </>
  );
};

export default Home;
