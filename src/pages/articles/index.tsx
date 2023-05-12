import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Sidebar } from 'components/Sidebar';
import { Articles } from 'components/Articles';

const Home: NextPage = () => {
  return (
    <>
      <Box>
        <Sidebar />
        <Articles />
      </Box>
    </>
  );
};

export default Home;
