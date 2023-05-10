import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Crawlers } from 'components/Crawlers';
import { Sidebar } from 'components/Sidebar';

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
      <Box>
        <Crawlers />
      </Box>
    </>
  );
};

export default Home;
