import { CompanySlice } from './types';

export const selectUid = (state: CompanySlice) => state.uid;
export const selectCompanyItem = (state: CompanySlice) => {
  // eslint-disable-next-line
  const { setCompany, ...remain } = state;

  return remain;
};

export const selectSetCompany = (state: CompanySlice) => state.setCompany;
