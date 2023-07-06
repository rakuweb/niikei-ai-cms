import { StateCreator } from 'zustand';

import { NotificationsSlice } from './types';

export const createNotificationsSlice: StateCreator<
  NotificationsSlice,
  [],
  [],
  NotificationsSlice
> = (set) => ({
  siteManagement: [],
  articleManagement: { inReview: [], checking: [], fixing: [] },
  autoPostManagement: [],
  originalContentManagement: [],

  setSiteManagementNotifications: (notifications) => {
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
