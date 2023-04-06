import React, { useState } from 'react';

import styled from '@emotion/styled';
import { Box, Flex, Link } from '@chakra-ui/react';
import Home from 'public/svg/home_FILL0_wght400_GRAD0_opsz48.svg';
import Autorenew from 'public/svg/autorenew_FILL0_wght400_GRAD0_opsz48.svg';
import Description from 'public/svg/description_FILL0_wght400_GRAD0_opsz48.svg';
import Edit from 'public/svg/edit_note_FILL0_wght400_GRAD0_opsz48.svg';
import Expand1 from 'public/svg/expand_circle_down_FILL-1.svg';
import Expand0 from 'public/svg/expand_circle_down_FILL0_wght400_GRAD0_opsz48.svg';
import Pass from 'public/svg/pass48.svg';
import S from 'public/svg/S.svg';
import Settings from 'public/svg/settings_input_antenna_FILL0_wght400_GRAD0_opsz48.svg';
import Smart from 'public/svg/smart_toy_FILL0_wght400_GRAD0_opsz48.svg';
import Gear from 'public/svg/gear.svg';
const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarContent isOpen={isOpen}>
        <Box className="box1">
          <Box p={'50px 10px'}>
            <S />
          </Box>
          <Link className="link" href={'/'} color={'white'}>
            <Home />　
          </Link>
          <Link href={'/'} color={'white'}>
            <Smart />　
          </Link>
          <Link href={'/'} color={'white'}>
            <Description />　
          </Link>
          <Link href={'/'} color={'white'}>
            <Edit />　
          </Link>
          <Link href={'/'} color={'white'}>
            <Autorenew />　
          </Link>
          <Link href={'/'} color={'white'}>
            <Settings />　
          </Link>
          <Link href={'/'} color={'white'}>
            <Gear />　
          </Link>
          <SidebarToggle onClick={toggleSidebar}>
            <Link>
              <Expand1 />　
            </Link>
          </SidebarToggle>
        </Box>
        <Box className="box2">
          <Box p={'50px 10px'}>
            <Pass className="se" />
          </Box>
          <Link
            className="link"
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <Home />
            ホーム
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <Smart />
            サイト管理
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <Description />
            記事管理
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <Edit />
            テンプレート管理
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <Autorenew />
            自動投稿管理
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <Settings />
            オリジナル配信管理
          </Link>
          <Link
            href={'/'}
            color={'#BABABA'}
            display={'flex'}
            alignItems={'center'}
          >
            <Gear />
            設定
          </Link>
          <SidebarToggle onClick={toggleSidebar}>
            <Link color={'#BABABA'} display={'flex'} alignItems={'center'}>
              <Expand0 />
              メニューを閉じる
            </Link>
          </SidebarToggle>
        </Box>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  /* width: ${(props) => (props.isOpen ? '250px' : '90px')}; */
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s;
`;

const SidebarToggle = styled.div`
  color: #fff;
  cursor: pointer;
  /* padding: 10px; */
  /* text-align: center; */
  user-select: none;
`;

const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const fadeOut = `
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity:0;
      visibility: hidden;
    }
  }
`;

const SidebarContent = styled.div<{ isOpen: boolean }>`
  ${fadeIn}
  ${fadeOut}
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
  position: relative;
  .box1 {
    width: 90px;
    animation: ${(props) => (props.isOpen ? 'fadeOut 0.3s' : 'fadeIn 0.3s')};
    animation-fill-mode: forwards;
    background-color: #444857;
    height: 100vh;
    position: absolute;
    top: 0;
    padding-left: 22px;

    svg{
        width: 20px;
        height:20px;
    }
  }
  .box2 {
  width: 250px;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: opacity 0.3s;
  background-color: #444857;
  height: 100vh;
  position: absolute;
  top: 0;
  padding-left: 22px;
  font-family: 'Noto Sans JP', sans-serif;
  .se {
    width: auto;
    height: 20px;
  }
  svg {
    width: 20px;
    height: 20px;
  }
}


  a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      color: #49BAC0;
      text-decoration: none;
      transition: 0.5s;
      svg{
      path{
        fill: #49BAC0;
        transition: 0.5s;
      }
    }
    }


    }
  }
`;
