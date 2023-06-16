import { db } from '..';
import { doc, getDoc } from 'firebase/firestore';

export const COMPANY_COLLECTION = 'companies';

export const fetchCompany = async (companyUid: string) => {
  const ref = getCompanyDocRef(companyUid);
  const snapshot = await getDoc(ref);

  return snapshot;
};

export const fetchCompanyByPath = async (path: string) => {
  const ref = doc(db, path);
  const result = await getDoc(ref);

  return result.exists() ? result : null;
};

export const getCompanyDocRef = (companyID: string) => {
  const ref = doc(db, COMPANY_COLLECTION, companyID);

  return ref;
};
