import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Add } from 'components/Add';
import { Sidebar } from 'components/Sidebar';

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
      <Box>
        <Add />
      </Box>
    </>
  );
};

export default Home;
