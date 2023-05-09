import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import { Sidebar } from 'components/Sidebar';

const Home: NextPage = () => {
  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <Box className={styles.description} bgColor={'#333'}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.tsx</code>
          </Box>
        </main>
      </div>
    </>
  );
};

export default Home;
