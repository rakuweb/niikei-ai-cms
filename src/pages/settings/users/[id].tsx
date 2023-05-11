import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from 'src/firebase';
import { Sidebar } from 'components/Sidebar';
import { Renew } from 'components/Renew';
type DocumentProps = {
  data: {
    role: string;
    email: string;
    name: string;
    password: string;
  };
};

const DocumentPage: NextPage<DocumentProps> = ({ data }) => {
  return (
    <>
      <Sidebar />
      <Box>
        <Renew data={data} />
      </Box>
    </>
  );
};

export const getStaticPaths = async () => {
  const allowedEmailsRef = collection(db, 'allowedEmails');
  const querySnapshot = await getDocs(allowedEmailsRef);

  const paths = querySnapshot.docs.map((doc) => ({
    params: { id: doc.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const docRef = doc(db, 'allowedEmails', params.id);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      data: docSnap.data(),
    },
  };
};

export default DocumentPage;
