import React, { FC, useEffect, useState } from 'react';
import { Box, Link } from '@chakra-ui/react';
import HomeSvg from 'public/svg/home.svg';
import AutorenewSvg from 'public/svg/autorenew.svg';
import DescriptionSvg from 'public/svg/description.svg';
import EditnoteSvg from 'public/svg/edit_note.svg';
import RightmarkSvg from 'public/svg/rightmark.svg';
import LeftmarkSvg from 'public/svg/leftmark.svg';
import SpecialeditorSvg from 'public/svg/Specialeditor.svg';
import SSvg from 'public/svg/S.svg';
import AntennaSvg from 'public/svg/antenna.svg';
import RobotSvg from 'public/svg/robot.svg';
import GearSvg from 'public/svg/gear.svg';
import { SidebarContainer, SidebarToggle, SidebarContent } from './styles';
import Popup from './Popup';
import { Header } from 'components/Header';
import { useStore, useUserStore } from 'lib/store';
import { getDoc, doc } from 'firebase/firestore';
import { db } from 'src/firebase';

export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const user = currentUser;
  const url = '/settings/account/';
  const links = [
    { text: 'リンク1', url: '/' },
    { text: 'リンク2', url: '/' },
    { text: 'リンク3', url: '/' },
  ];

  const [isCompany, setIsCompany] = useState<boolean | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserDoc = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setIsCompany(userDoc.data()?.is_company);
        }
      };
      fetchUserDoc();
    }
  }, [user]);
  const home = [];
  const articlepage = [
    { text: '記事一覧', url: '/articles' },
    { text: 'リンク2', url: '/' },
    { text: 'リンク3', url: '/' },
  ];
  const settingpage = [
    ...(!isCompany
      ? []
      : [
          { text: 'ユーザ一覧', url: '/settings/users' },
          { text: 'ユーザ新規作成', url: '/settings/users/new' },
        ]),
    { text: 'アカウント詳細', url: user ? `${url}/${user.uid}` : '' },
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
              <Popup title="" logo={<HomeSvg />} links={home} href={'/'} />
              <Popup
                title=""
                logo={<RobotSvg />}
                links={links}
                href={undefined}
              />
              <Popup
                title=""
                logo={<DescriptionSvg />}
                links={articlepage}
                href={undefined}
              />
              <Popup
                title=""
                logo={<EditnoteSvg />}
                links={links}
                href={undefined}
              />
              <Popup
                title=""
                logo={<AutorenewSvg />}
                links={links}
                href={undefined}
              />
              <Popup
                title=""
                logo={<AntennaSvg />}
                links={links}
                href={undefined}
              />
              <Popup
                title=""
                logo={<GearSvg />}
                links={settingpage}
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
                title="ホーム"
                logo={<HomeSvg />}
                links={home}
                href={'/'}
              />
              <Popup
                title="サイト管理"
                logo={<RobotSvg />}
                links={links}
                href={undefined}
              />
              <Popup
                title="記事管理"
                logo={<DescriptionSvg />}
                links={articlepage}
                href={undefined}
              />
              <Popup
                title="テンプレート管理"
                logo={<EditnoteSvg />}
                links={links}
                href={undefined}
              />
              <Popup
                title="自動投稿管理"
                logo={<AutorenewSvg />}
                links={links}
                href={undefined}
              />
              <Popup
                title="オリジナル配信管理"
                logo={<AntennaSvg />}
                links={links}
                href={undefined}
              />
              <Popup
                title="設定"
                logo={<GearSvg />}
                links={settingpage}
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
