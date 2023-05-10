import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Users } from 'components/Users';
import { Sidebar } from 'components/Sidebar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../src/firebase';

type HomeProps = {
  data: {
    role: string;
    email: string;
    name: string;
  }[];
};

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <>
      <Sidebar />
      <Box>
        <Users data={data} />
      </Box>
    </>
  );
};

export const getStaticProps = async () => {
  const allowedEmailsRef = collection(db, 'allowedEmails');
  const querySnapshot = await getDocs(allowedEmailsRef);

  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return {
    props: {
      data,
    },
  };
};

export default Home;
