import React, { FC } from 'react';
import { NameComponent } from './NameComponent';
import { EmailComponent } from './EmailComponent';
import { RoleComponent } from './RoleComponent';
import { PasswordComponent } from './PasswordComponent';

type FormData = {
  name: string;
  email: string;
  role: string;
  password: string;
};
export type PresenterProps = {
  data: FormData;
  id: string;
};

export const Presenter: FC<PresenterProps> = ({ data, id }) => {
  return (
    <>
      <NameComponent data={data} id={id} />
      <RoleComponent data={data} id={id} />
      <EmailComponent data={data} id={id} />
      <PasswordComponent data={data} id={id} />
    </>
  );
};
