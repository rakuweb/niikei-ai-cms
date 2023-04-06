import React, { FC, useState } from 'react';
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
// type layer
export type PresenterProps = Record<string, unknown>;

export const Presenter: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarContent isOpen={isOpen}>
        <Box className="box1">
          <Box p={'50px 10px'}>
            <SSvg />
          </Box>
          <Link className="link" href={'/'}>
            <HomeSvg />
          </Link>
          <Link href={'/'}>
            <RobotSvg />
          </Link>
          <Link href={'/'}>
            <DescriptionSvg />
          </Link>
          <Link href={'/'}>
            <EditnoteSvg />
          </Link>
          <Link href={'/'}>
            <AutorenewSvg />
          </Link>
          <Link href={'/'}>
            <AntennaSvg />
          </Link>
          <Link href={'/'}>
            <GearSvg />
          </Link>
          <SidebarToggle onClick={toggleSidebar}>
            <Link>
              <RightmarkSvg />
            </Link>
          </SidebarToggle>
        </Box>
        <Box className="box2">
          <Box p={'50px 10px'}>
            <SpecialeditorSvg className="se" />
          </Box>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <HomeSvg />
            ホーム
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <RobotSvg />
            サイト管理
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <DescriptionSvg />
            記事管理
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <EditnoteSvg />
            テンプレート管理
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <AutorenewSvg />
            自動投稿管理
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <AntennaSvg />
            オリジナル配信管理
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <GearSvg />
            設定
          </Link>
          <SidebarToggle onClick={toggleSidebar}>
            <Link color={'#BABABA'} display={'flex'} alignItems={'center'}>
              <LeftmarkSvg />
              メニューを閉じる
            </Link>
          </SidebarToggle>
        </Box>
      </SidebarContent>
    </SidebarContainer>
  );
};
