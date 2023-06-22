import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createNotificationsSlice } from './slice';
import { NotificationsSlice } from './types';

export const useNotificationsStore = create<NotificationsSlice>()(
  persist(
    (...a) => ({
      ...createNotificationsSlice(...a),
    }),
    { name: `notifications` }
  )
);
