import { NextPage } from 'next';
import { Box, Spinner } from '@chakra-ui/react';
import { Sidebar } from 'components/Sidebar';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { selectCompanyItem, useCompanyStore } from '@/features/company';
import { fetchArticlesWhere, Status } from '@/firebase/firestore/articles';
import { Checking } from '@/components/Checking';

const Draftslist: NextPage = () => {
  const [data, setData] = useState<DocumentData[] | null>(null);
  const company = useCompanyStore(selectCompanyItem);

  useEffect(() => {
    const fetchArticlesData = async () => {
      if (!company?.uid) return;

      try {
        const fetchedData = await fetchArticlesWhere(
          company.uid,
          Status.Published
        );
        setData(fetchedData);
      } catch (error) {
        window.alert(error);
        console.log(error);
      }
    };

    fetchArticlesData();
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
        <Checking data={data} titles={'公開記事一覧'} />
      </Box>
    </>
  );
};

export default Draftslist;
