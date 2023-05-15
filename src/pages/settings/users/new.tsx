import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { New } from 'components/New';
import { Sidebar } from 'components/Sidebar';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from 'src/firebase';
import { useRouter } from 'next/router';

type UserData = {
  role: string;
  password: string;
  email: string;
  name: string;
};

const Home: NextPage = () => {
  const [data, setData] = useState<UserData[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const allowedEmailsRef = collection(
          db,
          'companies',
          'employees',
          'employees'
        );
        const querySnapshot = await getDocs(allowedEmailsRef);
        const fetchedData: UserData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push(doc.data() as UserData);
        });
        setData(fetchedData);
      } catch (error) {
        router.push('/signin');
      }
    };

    fetchUserData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Box>
        <Sidebar />
        <New />
      </Box>
    </>
  );
};

export default Home;
