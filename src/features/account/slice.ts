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
  notifications: [],

  setAccount: (props) => {
    const result = props;
    set(() => ({ ...result }));
  },
  signout: () => {
    const result = {
      uid: '',
      name: '',
      email: '',
      role: '',
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
