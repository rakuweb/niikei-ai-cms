import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Account } from 'components/settings/Account';
import { Sidebar } from 'components/Sidebar';

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
      <Box>
        <Account />
      </Box>
    </>
  );
};

export default Home;
