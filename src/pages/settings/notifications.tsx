import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { New } from 'components/New';
import { Sidebar } from 'components/Sidebar';
import { Notifications } from '@/components/Notifications';

const Home: NextPage = () => {
  return (
    <>
      <Box>
        <Sidebar />
        <Notifications />
      </Box>
    </>
  );
};

export default Home;
