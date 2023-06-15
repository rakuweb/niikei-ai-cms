import { create } from 'zustand';

import { createAccountSlice } from './slice';
import { AccountSlice } from './types';

export const useAccountStore = create<AccountSlice>((...a) => ({
  ...createAccountSlice(...a),
}));
