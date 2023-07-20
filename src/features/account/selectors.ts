import { AccountSlice } from './types';

export const selectUid = (state: AccountSlice) => state.uid;

export const selectSetAccount = (state: AccountSlice) => state.setAccount;
export const selectSignout = (state: AccountSlice) => state.signout;
export const selectSetNotification = (state: AccountSlice) =>
  state.setNotification;
export const selectAccountItem = (state: AccountSlice) => {
  // eslint-disable-next-line
  const { setAccount, signout, setNotification, ...remain } = state;

  return remain;
};
