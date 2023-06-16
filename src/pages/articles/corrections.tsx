import { NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import { Sidebar } from 'components/Sidebar';
import { useEffect, useState } from 'react';
import { Drafts } from 'components/Drafts';
import { selectCompanyItem, useCompanyStore } from '@/features/company';
import { fetchArticlesWhere, Status } from '@/firebase/firestore/articles';
import { DocumentData } from 'firebase/firestore';

const Draftslist: NextPage = () => {
  const [data, setData] = useState<DocumentData[] | null>(null);
  const company = useCompanyStore(selectCompanyItem);

  useEffect(() => {
    const fetchArticlesData = async () => {
      if (!company?.uid) return;

      try {
        const fetchedData = await fetchArticlesWhere(
          company.uid,
          Status.Fixing
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
