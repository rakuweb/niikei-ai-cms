export type CompanySliceData = {
  uid: string;
  name: string;
  twitterId: string;
  facebookId: string;
};

export type CompanySlice = CompanySliceData & {
  setCompany: (props) => void;
};
