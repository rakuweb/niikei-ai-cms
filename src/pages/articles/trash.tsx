import { NextPage } from 'next';
import { Box, Spinner } from '@chakra-ui/react';
import { Sidebar } from 'components/Sidebar';
import { useEffect, useState } from 'react';
import { selectCompanyItem, useCompanyStore } from '@/features/company';
import { fetchArticlesWhere, Status } from '@/firebase/firestore/articles';
import { DocumentData } from 'firebase/firestore';
import { ArticlesTrash } from '@/components/ArticlesTrash';

const Draftslist: NextPage = () => {
  const [data, setData] = useState<DocumentData[]>([]);
  const company = useCompanyStore(selectCompanyItem);

  useEffect(() => {
    const fetchArticlesData = async () => {
      if (!company?.uid) return;

      try {
        const fetchedData = await fetchArticlesWhere(
          company.uid,
          Status.IsDeleted
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
        <ArticlesTrash data={data} titles={'ゴミ箱'} />
      </Box>
    </>
  );
};

export default Draftslist;
