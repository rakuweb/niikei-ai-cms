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
  notifications: Notifications;
};
export type Notifications = {
  site: [];
  article: { standby: []; checking: []; fixing: [] };
  auto_post: [];
  fortune: [];
};
export const NotificationKind = {
  Site: 'site',
  Article: { Standby: 'standby', Checking: 'checking', Fixing: 'fixing' },
  AutoPost: 'auto_post',
  Fortune: 'fortune',
};

export type ArticleNotificationKind =
  (typeof NotificationKind.Article)[keyof typeof NotificationKind.Article];

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

export const updateArticleNotification = async (
  companyID: string,
  employeeID: string,
  kind: ArticleNotificationKind,
  id: string
) => {
  const employee = await getEmployee(companyID, employeeID).catch((err) => {
    throw err;
  });
  const { notifications } = employee;
  const newData = {
    notifications: {
      ...notifications,
      article: {
        ...notifications.article,
        [kind]: [...notifications.article[kind], id],
      },
    },
  };
  await updateEmployee({ companyID, employeeID }, newData);
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

export const deleteNotificationByID = async (
  ids: {
    companyID: string;
    employeeID: string;
    notificationID: string;
  },
  kind: string
) => {
  const { companyID, employeeID, notificationID } = ids;
  const employeeDocRef = getEmployeeDocRef(companyID, employeeID);
  const currentData = await getDoc(employeeDocRef);
  const { notifications } = currentData.data();

  const newData = {
    notifications: {
      ...notifications,
      [NotificationKind[kind]]: notifications[kind].filter(
        (item: string) => item !== notificationID
      ),
    },
  };
  await updateEmployee({ companyID, employeeID }, newData);
};

export const deleteArticleNotificationByID = async (
  companyID: string,
  employeeID: string,
  kind: ArticleNotificationKind,
  notification_id: string
) => {
  const employeeDocRef = getEmployeeDocRef(companyID, employeeID);
  const currentData = await getDoc(employeeDocRef);
  const { notifications } = currentData.data();

  const newData = {
    notifications: {
      ...notifications,
      article: {
        [kind]: notifications.article[kind].filter(
          (item: string) => item !== notification_id
        ),
      },
    },
  };
  await updateEmployee({ companyID, employeeID }, newData);
};

export const fetchNotifications = async (
  companyID: string,
  employeeID: string
) => {
  const employee = await getEmployee(companyID, employeeID).catch((err) => {
    throw err;
  });
  const data = employee.data() as EmployeeType;

  const { notifications } = data;

  return notifications;
};
