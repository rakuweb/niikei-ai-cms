import { NextPage } from 'next';
import { Box, Spinner } from '@chakra-ui/react';
import { Users } from 'components/Users';
import { Sidebar } from 'components/Sidebar';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
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
          const employeeDocRef = doc(db, 'users', user.uid as string);
          const employeeDocSnap = await getDoc(employeeDocRef);
          const ref = employeeDocSnap.data()?.company_ref;

          const userRoleRef = doc(ref, 'employees', user.uid as string);
          const userRoleDoc = await getDoc(userRoleRef);
          const role = userRoleDoc.data()?.role;

          if (role === 'editor') {
            const allowedEmailsRef = collection(ref, 'employees');
            const querySnapshot = await getDocs(allowedEmailsRef);

            const fetchedData: UserData[] = [];
            querySnapshot.forEach((doc) => {
              fetchedData.push({
                id: doc.id,
                ...(doc.data() as {
                  role: string;
                  email: string;
                  name: string;
                }),
              });
            });

            setData(fetchedData);
          }
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
      <Sidebar />
      <Box>
        <Users data={data} />
      </Box>
    </>
  );
};

export default Home;
