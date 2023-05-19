import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Document } from '../../../components/Document';
const Home: NextPage = () => {
  return (
    <>
      <Box>
        <Document />
      </Box>
    </>
  );
};

export default Home;
