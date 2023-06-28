import type { NextPage } from 'next';
import { Box, Spinner } from '@chakra-ui/react';
import { New } from 'components/New';
import { Sidebar } from 'components/Sidebar';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth, db } from 'src/firebase';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';

type UserData = {
  role: string;
  password: string;
  email: string;
  name: string;
};
type EmployeeData = UserData & {
  is_company: boolean;
};

const Home: NextPage = () => {
  const [data, setData] = useState<UserData[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUserData = async () => {
          try {
            const employeeRef = doc(db, 'users', user.uid);
            const employeeDoc = await getDoc(employeeRef);

            if (employeeDoc.exists()) {
              const employeeData = employeeDoc.data() as EmployeeData;

              if (!employeeData.is_company) {
                return;
              }
            } else {
              return;
            }

            const allowedEmailsRef = collection(db, 'users');
            const querySnapshot = await getDocs(allowedEmailsRef);
            const fetchedData: UserData[] = [];
            querySnapshot.forEach((doc) => {
              fetchedData.push(doc.data() as UserData);
            });
            setData(fetchedData);
          } catch (error) {
            window.alert(error);
            router.push('/');
          }
        };

        fetchUserData();
      } else {
        router.push('/signin');
      }
    });

    return () => unsubscribe();
  }, []);

  if (!data) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#49BAC0"
          size="xl"
        />
      </Box>
    );
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
