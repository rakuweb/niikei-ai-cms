import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Sidebar } from 'components/Sidebar';
import { Upload } from '@/components/Upload';

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
      <Box>
        <Upload />
      </Box>
    </>
  );
};

export default Home;
