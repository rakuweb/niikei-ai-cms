import { ArticleNotificationKind } from '@/firebase/firestore/employees';

export type Notification = string;

export type NotificationsSliceData = {
  siteManagement: Notification[];
  articleManagement: {
    standby: Notification[];
    checking: Notification[];
    fixing: Notification[];
  };
  autoPostManagement: Notification[];
  originalContentManagement: Notification[];
};

export type NotificationsSlice = NotificationsSliceData & {
  setSiteManagementNotifications: (notifications: Notification[]) => void;
  setArticleManagementNotifications: (notifications: {
    standby: Notification[];
    checking: Notification[];
    fixing: Notification[];
  }) => void;
  setAutoPostManagementNotifications: (notifications: Notification[]) => void;
  setOriginalContentManagementNotifications: (
    notifications: Notification[]
  ) => void;
  deleteSiteManagementByID: (id: string) => void;
  deleteAutoPostManagementByID: (id: string) => void;
  deleteOriginalContentManagementByID: (id: string) => void;
  deleteArticleManagementByKindAndID: (
    kind: ArticleNotificationKind,
    id: string
  ) => void;
};
