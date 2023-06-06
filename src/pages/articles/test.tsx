import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Sidebar } from 'components/Sidebar';

import Test from 'components/test';

const Home: NextPage = () => {
  return (
    <>
      <Box>
        {/* <Sidebar /> */}
        <Test />
      </Box>
    </>
  );
};

export default Home;
