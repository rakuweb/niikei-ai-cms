import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import { Sidebar } from 'components/Sidebar';
import { db } from '../../src/firebase';
import { collection, getDocs } from 'firebase/firestore';

type HomeProps = Record<string, never>;

type UserData = {
  role: string;
  password: string;
  email: string;
  name: string;
};

const Home: NextPage<HomeProps> = () => {
  const [data, setData] = useState<UserData[] | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const allowedEmailsRef = collection(db, 'allowedEmails');
      const querySnapshot = await getDocs(allowedEmailsRef);

      const fetchedData: UserData[] = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push(doc.data() as UserData);
      });

      setData(fetchedData);
    };

    fetchUserData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <Box className={styles.description}>Get started by editing </Box>
        </main>
      </div>
    </>
  );
};

export default Home;
