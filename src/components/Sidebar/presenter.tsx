import React, { FC, useEffect } from 'react';
import { Box, Link } from '@chakra-ui/react';

import { Header } from 'components/Header';
import { SidebarContainer, SidebarToggle, SidebarContent } from './styles';
import Popup from './Popup';

import { useStore } from 'lib/store';
import { routes } from 'constants/routes';
import { useNotificationsStore } from 'features/notifications';

import AutorenewSvg from 'public/svg/autorenew.svg';
import DescriptionSvg from 'public/svg/description.svg';
import RightmarkSvg from 'public/svg/rightmark.svg';
import LeftmarkSvg from 'public/svg/leftmark.svg';
import SpecialeditorSvg from 'public/svg/Specialeditor.svg';
import SSvg from 'public/svg/S.svg';
import AntennaSvg from 'public/svg/antenna.svg';
import RobotSvg from 'public/svg/robot.svg';
import GearSvg from 'public/svg/gear.svg';
import { useAccountStore, Role, selectAccountItem } from 'features/account';
import { fetchNotifications } from '@/firebase/firestore/employees';
import { selectUid, useCompanyStore } from '@/features/company';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const companyID = useCompanyStore(selectUid);
  const account = useAccountStore(selectAccountItem);

  const {
    siteManagement,
    articleManagement,
    autoPostManagement,
    originalContentManagement,
    setSiteManagementNotifications,
    setArticleManagementNotifications,
    setAutoPostManagementNotifications,
    setOriginalContentManagementNotifications,
  } = useNotificationsStore();

  const siteSubPages = [
    { text: '新着情報一覧', url: routes.crawlersCollections },
    { text: 'サイトを登録', url: routes.crawlersAdd },
    { text: '登録サイト一覧', url: routes.crawlers },
    { text: 'ゴミ箱', url: routes.crawlersTrash },
  ];
  const articleSubPages = [
    { text: '新規作成する', url: routes.articlesNew },
    { text: '記事化リスト', url: routes.articlesCollections },
    { text: '下書き記事一覧', url: routes.articlesDrafts },
    { text: '修正記事一覧', url: routes.articlesCorrections },
    { text: 'ゴミ箱', url: routes.articlesTrash },
  ];
  const articleConfirmationSubPages = [
    ...(account.role === Role.Editor
      ? [{ text: '確認記事一覧', url: routes.articlesReviews }]
      : []),
    { text: '公開記事一覧', url: routes.articlesPublished },
    { text: 'ゴミ箱', url: routes.articlesTrash },
  ];
  const autoPostSubPages = [
    { text: '記事一覧', url: routes.autoPostsArticles },
    { text: '登録サイト一覧', url: routes.autoPostsSites },
  ];

  const fortuneSubPages = [
    { text: 'コンテンツ一覧', url: routes.fortunes },
    { text: 'アップロードする', url: routes.fortunesUpload },
  ];
  const settingSubPages = [
    { text: 'アカウント情報', url: routes.settingsAccount },
    ...(account.role === Role.Editor
      ? [
        { text: 'ユーザ一覧', url: routes.settingsUsers },
        { text: 'ユーザ新規作成', url: routes.settingsUsersNew },
      ]
      : []),
    { text: 'メール通知設定', url: routes.settingsNotifications },
  ];

  const isOpen = useStore((state) => state.open);
  const toggleSidebar = useStore((state) => state.toggleOpen);

  const fiftyFifty = () => {
    return Math.random() < 0.5;
  };

  useEffect(() => {
    if (fiftyFifty()) return;

    const handler = async () => {
      const notifications = await fetchNotifications(
        companyID,
        account.uid
      ).catch((err) => {
        console.error(err);
        return null;
      });
      if (notifications === null) return;

      setSiteManagementNotifications(notifications.site);
      setArticleManagementNotifications(notifications.article);
      setAutoPostManagementNotifications(notifications.auto_post);
      setOriginalContentManagementNotifications(notifications.fortune);
    };

    handler();
  });

  return (
    <>
      <Box position={'relative'} zIndex={'10'}>
        <Header />
        <SidebarContainer isOpen={isOpen}>
          <SidebarContent isOpen={isOpen}>
            <Box className="box1">
              <Box p={`${48 / 19.2}vw 0 ${67 / 19.2}vw`}>
                <SSvg />
              </Box>

              <Popup
                title=""
                logo={<RobotSvg />}
                links={siteSubPages}
                href={routes.crawlersCollections}
                notifications={siteManagement}
              />
              <Popup
                title=""
                logo={<DescriptionSvg />}
                links={articleSubPages}
                href={routes.articlesNew}
                notifications={articleManagement}
              />
              <Popup
                title=""
                logo={<DescriptionSvg />}
                links={articleConfirmationSubPages}
                href={routes.articlesReviews}
                notifications={articleManagement}
              />
              <Popup
                title=""
                logo={<AutorenewSvg />}
                links={autoPostSubPages}
                href={routes.autoPostsArticles}
                notifications={autoPostManagement}
              />
              <Popup
                title=""
                logo={<AntennaSvg />}
                links={fortuneSubPages}
                href={routes.fortunes}
                notifications={originalContentManagement}
              />
              <Popup
                title=""
                logo={<GearSvg />}
                links={settingSubPages}
                href={routes.settingsAccount}
              />
              <SidebarToggle onClick={toggleSidebar}>
                <Link>
                  <RightmarkSvg />
                </Link>
              </SidebarToggle>
            </Box>

            <Box className="box2">
              <Box p={`${48 / 19.2}vw 0 ${67 / 19.2}vw ${29 / 19.2}vw`}>
                <SpecialeditorSvg className="se" />
              </Box>

              <Popup
                title="サイト管理"
                logo={<RobotSvg />}
                links={siteSubPages}
                href={routes.crawlersCollections}
                notifications={siteManagement}
              />
              <Popup
                title="記事作成管理"
                logo={<DescriptionSvg />}
                links={articleSubPages}
                href={routes.articlesNew}
                notifications={articleManagement}
              />
              <Popup
                title="確認記事管理"
                logo={<DescriptionSvg />}
                links={articleConfirmationSubPages}
                href={routes.articlesReviews}
                notifications={articleManagement}
              />
              <Popup
                title="自動投稿管理"
                logo={<AutorenewSvg />}
                links={autoPostSubPages}
                href={routes.autoPostsArticles}
                notifications={autoPostManagement}
              />
              <Popup
                title="オリジナル配信管理"
                logo={<AntennaSvg />}
                links={fortuneSubPages}
                href={routes.fortunes}
                notifications={originalContentManagement}
              />
              <Popup
                title="設定"
                logo={<GearSvg />}
                links={settingSubPages}
                href={routes.settingsAccount}
              />
              <SidebarToggle onClick={toggleSidebar}>
                <Box
                  fontFamily={`'Noto Sans JP', sans-serif`}
                  fontSize={`${16 / 19.2}vw`}
                  color={'#BABABA'}
                  display={'flex'}
                  alignItems={'center'}
                  pl={`${32 / 19.2}vw`}
                  gap={`${11 / 19.2}vw`}
                >
                  <LeftmarkSvg />
                  メニューを閉じる
                </Box>
              </SidebarToggle>
            </Box>
          </SidebarContent>
        </SidebarContainer>
      </Box>
    </>
  );
};
