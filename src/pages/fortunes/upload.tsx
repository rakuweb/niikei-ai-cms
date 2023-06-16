import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Sidebar } from 'components/Sidebar';
import { Uplord } from '@/components/Uplord';

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
      <Box>
        <Uplord currentPage={undefined} />
      </Box>
    </>
  );
};

export default Home;
