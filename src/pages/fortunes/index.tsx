import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';

import { Sidebar } from 'components/Sidebar';
import { Fortunes } from '@/components/Fortunes';

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
      <Box>
        <Fortunes currentPage={undefined} />
      </Box>
    </>
  );
};

export default Home;
