import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import {
  DocumentData,
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { Sidebar } from 'components/Sidebar';
import { Sites } from 'components/Sites';
import { auth, db } from '@/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

type UserData = {
  id: string;
  name: string;
  url: string;
  xpath: string;
  interval1: string;
  interval2: string;
  created_at: Timestamp;
  category: string;
  is_notified: boolean;
  is_renewal: boolean;
  is_auto_posts: boolean;
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
          const employeeDocRef = doc(db, 'users', user.uid as string);
          const employeeDocSnap = await getDoc(employeeDocRef);
          const ref = employeeDocSnap.data()?.company_ref;
          const allowedEmailsRef = collection(ref, 'registered_sites');
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
        <Sites
          data={data}
          titles={'登録サイト一覧'}
          titles2={'自動投稿管理'}
          urls={'/auto-posts/sites'}
        />
      </Box>
    </>
  );
};

export default Draftslist;
