import { StateCreator } from 'zustand';

import { NotificationsSlice } from './types';

export const createNotificationsSlice: StateCreator<
  NotificationsSlice,
  [],
  [],
  NotificationsSlice
> = (set) => ({
  siteManagement: [],
  articleManagement: [],
  autoPostManagement: [],
  originalContentManagement: [],

  setSiteMamagementNotifications: (notifications) => {
    set(() => ({ siteManagement: notifications }));
  },
  setArticleManagementNotifications: (notifications) => {
    set(() => ({ articleManagement: notifications }));
  },
  setAutoPostManagementNotifications: (notifications) => {
    set(() => ({ autoPostManagement: notifications }));
  },
  setOriginalContentManagementNotifications: (notifications) => {
    set(() => ({ originalContentManagement: notifications }));
  },
});
