import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Crawlers } from 'components/Crawlers';

const Home: NextPage = () => {
  return (
    <>
      <Box>
        <Crawlers />
      </Box>
    </>
  );
};

export default Home;
