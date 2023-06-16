import { create } from 'zustand';

import { createCompanySlice } from './slice';
import { CompanySlice } from './types';

export const useCompanyStore = create<CompanySlice>((...a) => ({
  ...createCompanySlice(...a),
}));
