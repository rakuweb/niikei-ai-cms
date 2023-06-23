import type { NextPage } from 'next';
import { Box } from '@chakra-ui/react';

import { Sidebar } from 'components/Sidebar';
import { Fortunes } from '@/components/Fortunes';
import { auth, db } from '@/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  Timestamp,
  DocumentReference,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
type UserData = {
  created_at: Timestamp;
  content: string;
  title: string;
  status: string;
  image: string;
  url: string;
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
          const allowedEmailsRef = collection(ref, 'fortunes');

          const querySnapshot = await getDocs(allowedEmailsRef);

          const fetchedData: UserData[] = [];
          await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              const docData = doc.data() as UserData;

              fetchedData.push({
                ...docData,
                id: doc.id,
              });
            })
          );
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
        <Fortunes currentPage={undefined} data={data} />
      </Box>
    </>
  );
};

export default Home;
