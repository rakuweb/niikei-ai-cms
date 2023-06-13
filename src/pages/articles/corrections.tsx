import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import * as admin from 'firebase-admin';
import { Sidebar } from 'components/Sidebar';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db, auth } from '../../../src/firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Drafts } from 'components/Drafts';
type UserData = {
  title: string;
  url: string;
  document_id: string;
  status: string;
  category: string;
  wp_url: string;
  created_at: Date;
  updated_at: admin.firestore.Timestamp;
  due_date: Date;
  created_by?: admin.firestore.DocumentReference;
  name?: string;
};
type UserDataType = {
  name?: string;
  titles: string;
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
          const allowedEmailsRef = collection(db, 'companies', ref, 'articles');
          const q = query(allowedEmailsRef, where('status', '==', 'fixing'));
          const querySnapshot = await getDocs(q);

          const fetchedData: UserData[] = [];
          for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const createdByRef = data.created_by;
            const createdByDocSnap = await getDoc(createdByRef);
            const createdByDocSnapData =
              createdByDocSnap.data() as UserDataType;
            fetchedData.push({
              ...(data as {
                title: string;
                url: string;
                document_id: string;
                status: string;
                category: string;
                wp_url: string;
                created_at: Date;
                updated_at: admin.firestore.Timestamp;
                due_date: Date;
              }),
              created_by: data.created_by,
              name: createdByDocSnapData.name,
            });
          }

          setData(fetchedData);
          console.log(fetchedData);
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
  }, [router]);
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <Box>
        <Drafts data={data} titles={'修正記事一覧'} />
      </Box>
    </>
  );
};

export default Draftslist;
