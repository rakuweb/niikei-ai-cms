import { doc, getDoc } from 'firebase/firestore';

import { db } from '..';
import { COMPANY_COLLECTION } from './companies';

export const EMPLOYEE_COLLECTION = 'employees';

export const getEmployee = async (companyId: string, employeeId: string) => {
  const docPath = doc(
    db,
    COMPANY_COLLECTION,
    companyId,
    EMPLOYEE_COLLECTION,
    employeeId
  );
  const snapshot = await getDoc(docPath);

  return snapshot.exists() ? snapshot.data() : null;
};
