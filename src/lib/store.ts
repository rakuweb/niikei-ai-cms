import { StateCreator, create } from 'zustand';
import { User } from 'firebase/auth';
import { persist } from 'zustand/middleware';
type Open = {
  open: boolean;
  toggleOpen: () => void;
};

export const useStore = create<Open>(
  persist(
    (set) => ({
      open: false,
      toggleOpen: () =>
        set((state) => {
          return { open: !state.open };
        }),
    }),
    {
      name: 'sidebar_storage',
    }
  ) as unknown as StateCreator<Open>
);

type UserState = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));

type State = {
  userName: string;
  userPassword: string;
  currentUserUid: string;

  setUserName: (name: string) => void;
  setUserPassword: (password: string) => void;
  setCurrentUserUid: (uid: string) => void;
  users: Record<string, string>;
  setUser: (userId: string, name: string) => void;
};

export const useNameStore = create<State>((set) => ({
  userName: '',
  userPassword: '',
  setUserName: (name) => set({ userName: name }),
  setUserPassword: (password) => set({ userPassword: password }),
  currentUserUid: '',
  setCurrentUserUid: (uid: string) => set({ currentUserUid: uid }),
  users: {},
  setUser: (userId, name) =>
    set((state) => ({ users: { ...state.users, [userId]: name } })),
}));
