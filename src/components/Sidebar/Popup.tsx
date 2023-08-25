import { ArticleManagement } from '@/features/notifications';
import type { Notification as NotificationType } from '@/features/notifications';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Link,
} from '@chakra-ui/react';

import { Notification } from 'components/Notification';
import { sidebarItems } from 'constants/routes';

const Popup = ({ title, logo, links, href, notifications = undefined }) => {
  const displayNotification = (title: string, linkText: string) => {
    if (title === sidebarItems.crawlers) {
      if (linkText === '新着情報一覧') {
        return true;
      }
    } else if (title === sidebarItems.autoPost) {
      if (linkText === '記事一覧') {
        return true;
      }
    } else if (title === sidebarItems.originalPost) {
      if (linkText === '占い記事一覧') {
        return true;
      }
    } else if (title === '') return false;

    return false;
  };
  const displayArticleNotification = (
    title: string,
    linkText: string,
    notifications: NotificationType[] | ArticleManagement
  ) => {
    if (title === sidebarItems.createArticle) {
      notifications = notifications as ArticleManagement;
      if (linkText === '記事化リスト' && notifications?.standby?.length > 0) {
        return true;
      } else if (
        linkText === '確認記事一覧' &&
        notifications?.checking?.length > 0
      ) {
        return true;
      } else if (
        linkText === '修正記事一覧' &&
        notifications?.fixing?.length > 0
      ) {
        return true;
      }
    }

    return false;
  };
  const showArticleNotification = (
    linkText: string,
    notifications: ArticleManagement
  ) => {
    if (linkText === '記事化リスト') {
      return notifications.standby.length;
    } else if (linkText === '確認記事一覧') {
      return notifications.checking.length;
    } else if (linkText === '修正記事一覧') {
      return notifications.fixing.length;
    }

    return 0;
  };

  const countNotification = (
    title: string,
    notifications: NotificationType[] | ArticleManagement
  ) => {
    if (title === sidebarItems.crawlers) {
      notifications = notifications as NotificationType[];
      return notifications.length;
    } else if (title === sidebarItems.autoPost) {
      notifications = notifications as NotificationType[];
      return notifications.length;
    } else if (title === sidebarItems.originalPost) {
      notifications = notifications as NotificationType[];
      return notifications.length;
    } else if (title === sidebarItems.createArticle) {
      notifications = notifications as ArticleManagement;
      return (
        notifications?.standby?.length ??
        0 + notifications?.checking?.length ??
        0 + notifications?.fixing?.length ??
        0
      );
    }
  };

  return (
    <Popover trigger="hover" placement="right-start">
      <PopoverTrigger>
        <Link
          color={'#BABABA'}
          display={'flex'}
          alignItems={'center'}
          href={href}
          position={`relative`}
        >
          {logo}
          {title}
          {notifications && notifications?.length > 0 && (
            <Notification
              position={title === '' ? 'absolute' : 'initial'}
              w={{ lg: title === '' ? `${10 / 19.2}vw` : `${20 / 19.2}vw` }}
              h={{ lg: title === '' ? `${10 / 19.2}vw` : `${20 / 19.2}vw` }}
              right={`0.5vw`}
            >
              {countNotification(title, notifications)}
            </Notification>
          )}
        </Link>
      </PopoverTrigger>
      {links.length > 0 && (
        <PopoverContent
          backgroundColor={'#353845'}
          border={'0.5vw solid #353845'}
          borderRadius={'0'}
          boxShadow={'none'}
          w={'15vw'}
          minH={'6vw'}
          top={'-2.3vw'}
        >
          <PopoverArrow
            backgroundColor={'#353845'}
            border={'2vw solid #353845'}
            boxShadow={'none'}
          />

          <PopoverBody mt={`0.5vw`}>
            {links.map((link: { text: string; url: string }) => (
              <Link
                key={link.text}
                w={`fit-content`}
                href={link.url}
                color="#fff"
                fontSize="1vw"
                mt={`0.5vw`}
              >
                {link.text}
                {displayNotification(title, link.text) &&
                  notifications.length > 0 && (
                    <Notification>{notifications.length}</Notification>
                  )}
                {displayArticleNotification(
                  title,
                  link.text,
                  notifications
                ) && (
                    <Notification>
                      {showArticleNotification(link.text, notifications)}
                    </Notification>
                  )}
              </Link>
            ))}
          </PopoverBody>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Popup;
