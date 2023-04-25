import create from 'zustand';

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
