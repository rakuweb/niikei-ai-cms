import React, { FC } from 'react';
import { Box, Link } from '@chakra-ui/react';

import { Header } from 'components/Header';
import { SidebarContainer, SidebarToggle, SidebarContent } from './styles';
import Popup from './Popup';

import { useStore } from 'lib/store';
import { routes } from 'constants/routes';
import {
  useNotificationsStore,
  selectNotificationsAll,
} from 'features/notifications';

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

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const account = useAccountStore(selectAccountItem);

  const {
    siteManamgement,
    articleManagement,
    autoPostManagement,
    originalContentManamgement,
  } = useNotificationsStore(selectNotificationsAll);

  const siteSubPages = [
    { text: 'サイトを登録', url: routes.crawlersAdd },
    { text: '登録サイト一覧', url: routes.crawlers },
    { text: '新着情報一覧', url: routes.crawlersCollections },
    { text: 'ゴミ箱', url: routes.crawlersTrash },
  ];
  const articleSubPages = [
    { text: '新規作成する', url: routes.articlesNew },
    { text: '記事化リスト', url: routes.articlesCollections },
    { text: '下書き記事一覧', url: routes.articlesDrafts },
    ...(account.role === Role.Editor
      ? [{ text: '確認記事一覧', url: routes.articlesReviews }]
      : []),
    { text: '修正記事一覧', url: routes.articlesCorrections },
    { text: '公開記事一覧', url: routes.articlesPublished },
    { text: 'ゴミ箱', url: routes.articlesTrash },
  ];
  const autoPostSubPages = [
    { text: '登録サイト一覧', url: routes.autoPostsSites },
    { text: '記事一覧', url: routes.autoPostsArticles },
  ];

  const fortuneSubPages = [
    { text: 'アップロードする', url: routes.fortunesUpload },
    { text: '占い記事一覧', url: routes.fortunes },
  ];
  const settingSubPages = [
    { text: 'アカウント情報', url: '/settings/account/' + account.uid },
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
                href={undefined}
                notifications={siteManamgement}
              />
              <Popup
                title=""
                logo={<DescriptionSvg />}
                links={articleSubPages}
                href={undefined}
                notifications={articleManagement}
              />
              <Popup
                title=""
                logo={<AutorenewSvg />}
                links={autoPostSubPages}
                href={undefined}
                notifications={autoPostManagement}
              />
              <Popup
                title=""
                logo={<AntennaSvg />}
                links={fortuneSubPages}
                href={undefined}
                notifications={originalContentManamgement}
              />
              <Popup
                title=""
                logo={<GearSvg />}
                links={settingSubPages}
                href={undefined}
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
                href={undefined}
                notifications={[1, 1]}
              />
              <Popup
                title="記事管理"
                logo={<DescriptionSvg />}
                links={articleSubPages}
                href={undefined}
                notifications={articleManagement}
              />
              <Popup
                title="自動投稿管理"
                logo={<AutorenewSvg />}
                links={autoPostSubPages}
                href={undefined}
                notifications={autoPostManagement}
              />
              <Popup
                title="オリジナル配信管理"
                logo={<AntennaSvg />}
                links={fortuneSubPages}
                href={undefined}
                notifications={originalContentManamgement}
              />
              <Popup
                title="設定"
                logo={<GearSvg />}
                links={settingSubPages}
                href={undefined}
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
