import { StateCreator } from 'zustand';

import { NotificationsSlice } from './types';

export const createNotificationsSlice: StateCreator<
  NotificationsSlice,
  [],
  [],
  NotificationsSlice
> = (set, get) => ({
  siteManagement: [],
  articleManagement: {
    standby: [],
    checking: [],
    fixing: [],
  },
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
  deleteSiteManagementByID: (id) => {
    const { siteManagement } = get();
    set(() => ({
      siteManagement: siteManagement.filter((item) => item !== id),
    }));
  },
  deleteAutoPostManagementByID: (id) => {
    const { autoPostManagement } = get();
    set(() => ({
      autoPostManagement: autoPostManagement.filter((item) => item !== id),
    }));
  },
  deleteOriginalContentManagementByID: (id) => {
    const { originalContentManagement } = get();
    set(() => ({
      originalContentManagement: originalContentManagement.filter(
        (item) => item !== id
      ),
    }));
  },
  deleteArticleManagementByKindAndID: (kind, id) => {
    const { articleManagement } = get();
    set(() => ({
      articleManagement: articleManagement[kind]?.filter((item) => item !== id),
    }));
  },
});
