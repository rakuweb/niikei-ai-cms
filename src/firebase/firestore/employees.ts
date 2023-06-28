import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from '..';
import { COMPANY_COLLECTION } from './companies';
import type { Role } from 'features/account';

export type EmployeeType = {
  name: string;
  email: string;
  role: Role;
  new_info_notification: boolean;
  auto_publish_notification: boolean;
  fortune_notification: boolean;
};

export const EMPLOYEE_COLLECTION = 'employees';

export const getEmployee = async (companyID: string, employeeID: string) => {
  const docRef = getEmployeeDocRef(companyID, employeeID);
  const snapshot = await getDoc(docRef);

  return snapshot.exists() ? snapshot.data() : null;
};

export const updateEmployee = async (
  IDs: { companyID: string; eomployeeID: string },
  data: Partial<EmployeeType>
) => {
  const docRef = getEmployeeDocRef(IDs.companyID, IDs.eomployeeID);

  await updateDoc(docRef, data);
};

export const getEmployeeDocRef = (companyID: string, employeeID: string) => {
  const docRef = doc(
    db,
    COMPANY_COLLECTION,
    companyID,
    EMPLOYEE_COLLECTION,
    employeeID
  );

  return docRef;
};
