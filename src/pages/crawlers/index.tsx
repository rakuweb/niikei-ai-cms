import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import * as admin from 'firebase-admin';
import { Sidebar } from 'components/Sidebar';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../../../src/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Sites } from 'components/Sites';

type UserData = {
  id?: string;
  name?: string;
  url?: string;
  xpath?: string;
  interval1?: string;
  interval2?: string;
  created_at?: admin.firestore.Timestamp;
  category?: string;
  is_notified?: boolean;
  is_renewal?: boolean;
};

const Draftslist: NextPage = () => {
  const [data, setData] = useState<UserData[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      try {
        if (user) {
          const employeeDocRef = doc(db, 'users', user.uid);
          const employeeDocSnap = await getDoc(employeeDocRef);
          const ref = employeeDocSnap.data()?.company_ref;
          const sitesRef = collection(db, 'companies', ref, 'sites');
          const querySnapshot = await getDocs(sitesRef);

          const fetchedData: UserData[] = [];
          for (const doc of querySnapshot.docs) {
            const data = doc.data();
            fetchedData.push({
              id: doc.id,
              ...(data as UserData),
            });
          }

          setData(fetchedData);
        } else {
          router.push('/');
        }
      } catch (error) {
        window.alert(error);
        console.log(error);
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
        <Sites data={data} titles={'登録サイト一覧'} />
      </Box>
    </>
  );
};

export default Draftslist;
