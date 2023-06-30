import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Input, IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { InternalLink } from 'components/links/InternalLink';
import { Text } from 'components/texts/Text';

import { auth } from 'src/firebase';
import { getUser } from 'src/firebase/firestore/users';
import { getEmployee } from 'src/firebase/firestore/employees';
import { routes } from 'constants/routes';
import { selectSetAccount, useAccountStore } from 'features/account';
import { selectSetCompany, useCompanyStore } from 'features/company';
import { fetchCompanyByPath } from '@/firebase/firestore/companies';
import {
  useNotificationsStore,
  selectSetNotificationsAll,
} from '@/features/notifications';

export type StyleProps = Record<string, unknown>;
export type PresenterProps = StyleProps;

export const Presenter: FC<PresenterProps> = () => {
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const setAccount = useAccountStore(selectSetAccount);
  const setCompany = useCompanyStore(selectSetCompany);
  const {
    setSiteManamgementNotifications,
    setArticleManagementNotifications,
    setAutoPostManagementNotifications,
    setOriginalContentManamgementNotifications,
  } = useNotificationsStore(selectSetNotificationsAll);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
    setErrorEmail('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrorPass('');
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signInWithEmailAndPasswordHandler = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userEmail,
        password
      );

      const user = userCredential.user;
      const own = await getUser(user.uid);

      const companyPath = own.company_ref.path;
      console.log(companyPath);
      const company = await fetchCompanyByPath(companyPath);
      const companyData = company.data();
      const companyInfo = {
        uid: company.id,
        name: companyData.name,
        twitterId: companyData.twitter_id,
        facebookId: companyData.facebook_id,
      };
      setCompany(companyInfo);

      const employee = await getEmployee(company.id, user.uid);
      const accountInfo = {
        uid: user.uid,
        name: employee.name,
        email: user.email,
        role: employee.role,
        newInfoNotification: employee.new_info_notification,
        autoPublishNotification: employee.auto_publish_notification,
        fortuneNotification: employee.fortune_notification,
        notifications: employee.notifications,
      };
      setAccount(accountInfo);

      const { notifications } = employee;
      notifications?.length > 0 &&
        setSiteManamgementNotifications(notifications[0]);
      notifications?.length > 1 &&
        setArticleManagementNotifications(notifications[1]);
      notifications?.length > 2 &&
        setAutoPostManagementNotifications(notifications[2]);
      notifications?.length > 3 &&
        setOriginalContentManamgementNotifications(notifications[3]);

      router.push(routes.articlesNew);
    } catch (error) {
      console.error(error);
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/user-not-found'
      ) {
        setErrorEmail('メールアドレスが無効、または存在しません。');
      } else {
        setErrorPass('パスワードが間違っています。');
      }
    }
  };

  // account,company保存処理は下記内に記載した方が良い可能性があるためとってある
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       router.push(routes.articlesNew);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [router]);

  return (
    <>
      <Text
        letterSpacing={`0`}
        w={`${650 / 19.2}vw`}
        pt={`${315 / 19.2}vw`}
        mx={`auto`}
        fontSize={`${16 / 19.2}vw`}
        lineHeight={`${26 / 19.2}vw`}
      >
        <Box mb={`${10 / 19.2}vw`}>
          <Box
            as={`h1`}
            fontWeight={`bold`}
            fontSize={`${36 / 19.2}vw`}
            lineHeight={`${49 / 19.2}vw`}
            mb={`2.3vw`}
            textAlign={`center`}
          >
            管理者ログイン
          </Box>
          <Box mb={`${10 / 19.2}vw`}>メールアドレス</Box>
          <Input
            type="email"
            value={userEmail}
            onChange={handleEmailChange}
            placeholder="メールアドレスを入力"
            bg={`white`}
            h={`${50 / 19.2}vw`}
            fontSize={`${16 / 19.2}vw`}
            borderRadius={`0`}
            mb={'1.2vw'}
          />
          {errorEmail && <Box color={'red'}>{errorEmail}</Box>}
        </Box>

        <Box mb={`${10 / 19.2}vw`}>パスワード</Box>
        <Box mb={`${30 / 19.2}vw`}>
          <Box position="relative" mb={`2.8vw`}>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="パスワードを入力"
              bg={`white`}
              h={`${50 / 19.2}vw`}
              fontSize={`${16 / 19.2}vw`}
              borderRadius={`0`}
            />
            <IconButton
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              position="absolute"
              onClick={handlePasswordVisibility}
              variant="ghost"
              aria-label={''}
            />
          </Box>
          {errorPass && <Box color={'red'}>{errorPass}</Box>}
        </Box>

        <Box
          as="button"
          onClick={signInWithEmailAndPasswordHandler}
          display={`flex`}
          w={`100%`}
          h={`${50 / 19.2}vw`}
          bg={`#49BAC0`}
          color={`white`}
          justifyContent={`center`}
          alignItems={`center`}
          borderRadius={`${50 / 19.2}vw`}
          transition={`all .3s`}
          _hover={{
            cursor: `pointer`,
            filter: `opacity(80%)`,
          }}
        >
          ログイン
        </Box>
        <Box mt={`${20 / 19.2}vw`}>
          <InternalLink href={`/password-reset`} fontWeight={`bold`}>
            パスワードをお忘れですか?
          </InternalLink>
        </Box>
      </Text>
    </>
  );
};
