import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Account } from 'components/settings/Account';

const Home: NextPage = () => {
  return (
    <>
      <Box>
        <Account />
      </Box>
    </>
  );
};

export default Home;
