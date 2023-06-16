import { CompanySlice } from './types';

export const selectUid = (state: CompanySlice) => state.uid;

export const selectSetCompany = (state: CompanySlice) => state.setCompany;
