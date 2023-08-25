import { Notifications } from 'src/firebase/firestore/employees';

export const Role = {
  Editor: 'editor',
  Writer: 'writer',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export type AccountSliceData = {
  uid: string;
  name: string;
  email: string;
  role: Role | null;
  newInfoNotification: boolean;
  autoPublishNotification: boolean;
  fortuneNotification: boolean;
  notifications: Notifications;
};

type SetAccountInfoProps = {
  uid: string;
  name: string;
  email: string;
  role: Role;
  newInfoNotification: boolean;
  autoPublishNotification: boolean;
  fortuneNotification: boolean;
  notifications: Notifications;
};

export type AccountSlice = AccountSliceData & {
  setAccount: (props: Partial<SetAccountInfoProps>) => void;
  signout: () => void;
  setNotification: (props: {
    newInfoNotification: boolean;
    autoPublishNotification: boolean;
    fortuneNotification: boolean;
  }) => void;
};
