import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Users } from 'components/Users';
import { Sidebar } from 'components/Sidebar';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from 'src/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

type UserData = {
  role: string;
  email: string;
  name: string;
  id: string;
};

const Home: NextPage = () => {
  const [data, setData] = useState<UserData[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      try {
        if (user) {
          const allowedEmailsRef = collection(
            db,
            'companies',
            user.uid,
            'employees'
          );
          const querySnapshot = await getDocs(allowedEmailsRef);

          const fetchedData: UserData[] = [];
          querySnapshot.forEach((doc) => {
            fetchedData.push({
              id: doc.id,
              ...(doc.data() as { role: string; email: string; name: string }),
            });
          });

          setData(fetchedData);
        } else {
          router.push('/');
        }
      } catch (error) {
        window.alert(error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, () => {
      fetchUserData();
    });

    return () => unsubscribe();
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
