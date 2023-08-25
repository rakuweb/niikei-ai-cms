import { StateCreator } from 'zustand';

import { AccountSlice } from './types';

export const createAccountSlice: StateCreator<
  AccountSlice,
  [],
  [],
  AccountSlice
> = (set) => ({
  uid: null,
  name: null,
  email: null,
  role: null,
  newInfoNotification: false,
  autoPublishNotification: false,
  fortuneNotification: false,
  notifications: {
    site: [],
    article: { standby: [], checking: [], fixing: [] },
    auto_post: [],
    fortune: [],
  },

  setAccount: (props) => {
    const result = props;
    set(() => ({ ...result }));
  },
  signout: () => {
    const result = {
      uid: '',
      name: '',
      email: '',
      role: null,
      newInfoNotification: false,
      autoPublishNotification: false,
      fortuneNotification: false,
    };
    set(() => ({ ...result }));
  },
  setNotification: (props) => {
    const result = props;
    set(() => ({ ...result }));
  },
});
