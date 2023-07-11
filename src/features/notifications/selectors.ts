import { NotificationsSlice } from './types';

export const selectNotificationsAll = (state: NotificationsSlice) => ({
  siteManamgement: state.siteManagement,
  articleManagement: state.articleManagement,
  autoPostManagement: state.autoPostManagement,
  originalContentManamgement: state.originalContentManagement,
});

export const selectSetNotificationsAll = (state: NotificationsSlice) => ({
  setSiteManamgementNotifications: state.setSiteManagementNotifications,
  setArticleManagementNotifications: state.setArticleManagementNotifications,
  setAutoPostManagementNotifications: state.setAutoPostManagementNotifications,
  setOriginalContentManamgementNotifications:
    state.setOriginalContentManagementNotifications,
});

export const selectDeleteSiteNotificationByID = (state: NotificationsSlice) =>
  state.deleteSiteManagementByID;
export const selectDeleteAutoPostNotificationByID = (
  state: NotificationsSlice
) => state.deleteAutoPostManagementByID;
export const selectDeleteOriginalContentNotificationByID = (
  state: NotificationsSlice
) => state.deleteOriginalContentManagementByID;
