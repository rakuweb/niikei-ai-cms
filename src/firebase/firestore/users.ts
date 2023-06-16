import { db } from '..';
import { doc, getDoc,  } from 'firebase/firestore';

export type UserType = {
  is_company: boolean;
};

export const USERS_COLLECTION = 'users';

export const getUser = async (uid: string) => {
  const ref = doc(db, USERS_COLLECTION, uid);
  const result = await getDoc(ref);

  return result.exists ? result.data() : undefined;
};
