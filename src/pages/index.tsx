import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import { Sidebar } from 'components/Sidebar';
import { db } from '../../src/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

type HomeProps = {
  data: {
    email: string;
    password: string;
    name: string;
  };
};

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <Box className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>{data.password}</code>
          </Box>
        </main>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const allowedEmailsRef = collection(db, 'allowedEmails');
  const cityRef = doc(allowedEmailsRef, 'kUquv8UHgNTimBsoqWG5');
  const docSnap = await getDoc(cityRef);

  if (!docSnap.exists()) {
    return {
      props: {},
    };
  }

  const data = docSnap.data();

  return {
    props: {
      data,
    },
  };
};

export default Home;
