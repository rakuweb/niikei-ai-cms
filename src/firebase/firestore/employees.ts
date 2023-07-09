import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

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
  notifications: any;
};

export const EMPLOYEE_COLLECTION = 'employees';

export const getEmployee = async (companyID: string, employeeID: string) => {
  const docRef = getEmployeeDocRef(companyID, employeeID);
  const snapshot = await getDoc(docRef);

  return snapshot.exists() ? snapshot.data() : null;
};

export const updateEmployee = async (
  IDs: { companyID: string; employeeID: string },
  data: Partial<EmployeeType>
) => {
  const docRef = getEmployeeDocRef(IDs.companyID, IDs.employeeID);

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

export const deleteSiteNotificationByID = async (
  companyID: string,
  employeeID: string,
  notification_id: string
) => {
  const employeeDocRef = getEmployeeDocRef(companyID, employeeID);
  const currentData = await getDoc(employeeDocRef);
  const { notifications } = currentData.data();

  const newData = {
    notifications: {
      ...notifications,
      site: notifications.site.filter(
        (item: string) => item !== notification_id
      ),
    },
  };
  await updateEmployee({ companyID, employeeID }, newData);
};
