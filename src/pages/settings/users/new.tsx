import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { New } from 'components/New';
import { Sidebar } from 'components/Sidebar';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from 'src/firebase';
type UserData = {
  role: string;
  password: string;
  email: string;
  name: string;
};

const Home: NextPage = () => {
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
      <Box>
        <Sidebar />
        <New />
      </Box>
    </>
  );
};

export default Home;
