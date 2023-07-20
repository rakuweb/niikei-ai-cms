import type { NextPage } from 'next';
import { Box, Spinner } from '@chakra-ui/react';

import { Sidebar } from 'components/Sidebar';
import { auth, db } from '@/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  DocumentReference,
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { CollectionTrash } from '@/components/CollectionTrash';
import { Category } from '@/firebase/firestore/sites';
import { INFORMATION_COLLECTION } from '@/firebase/firestore/information';

type UserData = {
  created_at: Timestamp;
  message: string;
  title: string;
  status: string;
  category: Category;
  url: string;
  site_ref: DocumentReference;
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
          const allowedEmailsRef = collection(ref, INFORMATION_COLLECTION);

          const q = query(
            allowedEmailsRef,
            where('status', '==', 'is_deleted')
          );
          const querySnapshot = await getDocs(q);

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
          setData(fetchedData.filter((item) => !!item));
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
        <CollectionTrash titles="ゴミ箱" data={data} />
      </Box>
    </>
  );
};
export default Home;
