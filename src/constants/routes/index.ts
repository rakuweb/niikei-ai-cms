export const routes = {
  signin: `/signin`,
  passwordReset: `/password-reset`,
  crawlers: `/crawlers`,
  crawlersSitesId: (id: string) => `/crawlers/sites/${id}`,
  crawlersAdd: `/crawlers/add`,
  crawlersCollections: `/crawlers/collections`,
  crawlersCollectionsId: (id: string) => `/crawlers/collections/${id}`,
  crawlersTrash: `/crawlers/trash`,
  articlesNew: `/articles/new`,
  articlesDrafts: `/articles/drafts`,
  articlesCollections: `/articles/collections`,
  articlesReviews: `/articles/reviews`,
  articlesCorrections: `/articles/corrections`,
  articlesPublished: `/articles/published`,
  articlesTrash: `/articles/trash`,
  autoPostsSites: `/auto-posts/sites`,
  autoPostsArticles: `/auto-posts/articles`,
  fortunes: `/fortunes`,
  fortunesUpload: `/fortunes/upload`,
  settingsAccount: `/settings/account`,
  settingsAccountId: (id: string) => `/settings/account/${id}`,
  settingsUsers: `/settings/users`,
  settingsUsersNew: `/settings/users/new`,
  settingsUsersId: (id: string) => `/settings/users/${id}`,
  settingsNotifications: `/settings/notifications`,
};

export const apiRoutes = {
  wpCategories: `/api/wp/categories`,
  wpMedia: `/api/wp/media`,
  updateUserPassword: `/api/update-user-password`,
};

export const niikeiURL = `https://www.niikei.jp/`;

export const pathsAnonymous = [routes.signin, routes.passwordReset];
