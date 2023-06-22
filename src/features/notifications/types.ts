export type Notification = {
  id: string;
};

export type NotificationsSliceData = {
  siteManagement: Notification[];
  articleManagement: Notification[];
  autoPostManagement: Notification[];
  originalContentManagement: Notification[];
};

export type NotificationsSlice = NotificationsSliceData & {
  setSiteManagementNotifications: (notifications: Notification[]) => void;
  setArticleManagementNotifications: (notifications: Notification[]) => void;
  setAutoPostManagementNotifications: (notifications: Notification[]) => void;
  setOriginalContentManagementNotifications: (
    notifications: Notification[]
  ) => void;
};
