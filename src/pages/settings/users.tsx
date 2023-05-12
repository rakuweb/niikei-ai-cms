import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Users } from 'components/Users';
import { Sidebar } from 'components/Sidebar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../src/firebase';
import { useEffect, useState } from 'react';

type UserData = {
  role: string;
  string: any;
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
      <Sidebar />
      <Box>
        <Users data={data} />
      </Box>
    </>
  );
};

export default Home;
