import React, { useState } from 'react';

import styled from '@emotion/styled';
import { Box, Link } from '@chakra-ui/react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarContent isOpen={isOpen}>
        <Box className="box1">
          <Link className="link" href={'/'} color={'white'}>
            🏠
          </Link>
          <Link href={'/'} color={'white'}>
            🆗
          </Link>
          <SidebarToggle onClick={toggleSidebar}>
            {isOpen ? '>' : '<'}
          </SidebarToggle>
        </Box>
        <Box className="box2">
          <Link href={'/'} color={'white'} whiteSpace={'nowrap'}>
            🏠 ホーム
          </Link>
          <Link href={'/'} color={'white'} whiteSpace={'nowrap'}>
            🆗 サイト管理
          </Link>
          <SidebarToggle onClick={toggleSidebar}>
            {isOpen ? '>' : '<'}
          </SidebarToggle>
        </Box>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? '200px' : '80px')};
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s;
`;

const SidebarToggle = styled.div`
  color: #fff;
  cursor: pointer;
  padding: 10px;
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
 
    animation: ${(props) => (props.isOpen ? 'fadeOut 0.3s' : 'fadeIn 0.3s')};
    animation-fill-mode: forwards;
    background-color: #333;
    height: 100vh;
    position: absolute;
    top: 0;
  }
  .box2 {
    animation: ${(props) => (props.isOpen ? 'fadeIn 0.3s' : 'fadeOut 0.3s')};
    animation-fill-mode: forwards;
    background-color: #333;
    height: 100vh;
    position: absolute;
    top: 0;
  }
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }


    }
  }
`;
