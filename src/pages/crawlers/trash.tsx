import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Sidebar } from 'components/Sidebar';
import { Trash } from 'components/Trash';

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
      <Box>
        <Trash titles="ゴミ箱" />
      </Box>
    </>
  );
};

export default Home;
