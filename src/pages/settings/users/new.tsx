import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
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
            const employeeRef = doc(db, 'employees', user.uid);
            const employeeDoc = await getDoc(employeeRef);

            if (employeeDoc.exists()) {
              const employeeData = employeeDoc.data() as EmployeeData;

              if (!employeeData.is_company) {
                return;
              }
            } else {
              return;
            }

            const allowedEmailsRef = collection(db, 'employees');
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
