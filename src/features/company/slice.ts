import { StateCreator } from 'zustand';

import { CompanySlice } from './types';

export const createCompanySlice: StateCreator<
  CompanySlice,
  [],
  [],
  CompanySlice
> = (set) => ({
  uid: '',
  name: '',
  facebookId: '',
  twitterId: '',
  email: '',

  setCompany: (props) => {
    const result = props;
    set(() => ({ ...result }));
  },
});
