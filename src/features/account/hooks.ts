import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createAccountSlice } from './slice';
import { AccountSlice } from './types';

export const useAccountStore = create<AccountSlice>()(
  persist(
    (...a) => ({
      ...createAccountSlice(...a),
    }),
    { name: `account` }
  )
);
