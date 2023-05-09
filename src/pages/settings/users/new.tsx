import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { New } from 'components/New';
import { Sidebar } from 'components/Sidebar';

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
      <Box>
        <New />
      </Box>
    </>
  );
};

export default Home;
