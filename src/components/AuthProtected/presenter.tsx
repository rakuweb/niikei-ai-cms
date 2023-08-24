// import layer
import { FC, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

import { useAccountStore, selectUid } from 'features/account';
import { routes, pathsAnonymous } from 'constants/routes';

// type layer
export type PresenterProps = { children: ReactNode };

// presenter
export const Presenter: FC<PresenterProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();
  const uid = useAccountStore(selectUid);

  useEffect(() => {
    if (pathsAnonymous.includes(router.asPath)) {
      if (uid) {
        router.push(routes.articlesNew);
        return;
      }
    } else {
      if (uid === '' || uid === null) {
        router.push(routes.signin);
        return;
      }
    }

    setIsVisible(true);
    // eslint-disable-next-line
  }, [uid, router?.asPath]);

  return isVisible ? <>{children}</> : <></>;
};
