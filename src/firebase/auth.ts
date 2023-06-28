import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

import { auth } from '.';

export const changePassword = async (password: string, newPassword: string) => {
  const user = auth.currentUser;

  // credential取得
  const credential = EmailAuthProvider.credential(user.email, password);
  user && (await reauthenticateWithCredential(user, credential));

  await updatePassword(user, newPassword);
};
