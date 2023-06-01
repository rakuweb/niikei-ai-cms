import { create } from 'zustand';
import { User } from 'firebase/auth';

type Open = {
  open: boolean;
  toggleOpen: () => void;
};

export const useStore = create<Open>((set) => ({
  open: false,
  toggleOpen: () =>
    set((state) => {
      return { open: !state.open };
    }),
}));

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
};

export const useNameStore = create<State>((set) => ({
  userName: '',
  userPassword: '',
  setUserName: (name) => set({ userName: name }),
  setUserPassword: (password) => set({ userPassword: password }),
  currentUserUid: '',
  setCurrentUserUid: (uid: string) => set({ currentUserUid: uid }),
}));
