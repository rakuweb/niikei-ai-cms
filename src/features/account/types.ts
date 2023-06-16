export const Role = {
  Editor: 'editor',
  Writer: 'writer',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export type AccountSliceData = {
  uid: string;
  name: string;
  email: string;
  role: string;
  newInfoNotification: boolean;
  autoPublishNotification: boolean;
};

type SetAccountInfoProps = {
  uid: string;
  name: string;
  email: string;
  role: string;
};

export type AccountSlice = AccountSliceData & {
  setAccount: (props: SetAccountInfoProps) => void;
  signout: () => void;
};
