import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createCompanySlice } from './slice';
import { CompanySlice } from './types';

export const useCompanyStore = create<CompanySlice>()(
  persist(
    (...a) => ({
      ...createCompanySlice(...a),
    }),
    { name: `company` }
  )
);
