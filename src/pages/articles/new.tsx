import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Sidebar } from 'components/Sidebar';
import { Scan } from 'components/Articles/Scan';

const Home: NextPage = () => {
  return (
    <>
      <Box>
        <Sidebar />
        <Scan />
      </Box>
    </>
  );
};

export default Home;
