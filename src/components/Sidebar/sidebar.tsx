import React, { useState } from 'react';

import styled from '@emotion/styled';
import { Link } from '@chakra-ui/react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarContent isOpen={isOpen}>
        <Link href={'/'} color={'white'}>
          <span className="kigou">🏠</span>
          <span className="moji">ホーム</span>
        </Link>
        <Link href={'/'} color={'white'}>
          <span className="kigou">🆗</span>
          <span className="moji">サイト管理</span>
        </Link>
      </SidebarContent>

      <SidebarToggle onClick={toggleSidebar}>
        {isOpen ? '>' : '<'}
      </SidebarToggle>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: ${(props) => (props.isOpen ? '200px' : '60px')};
  height: 100%;
  background-color: #333;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s;
`;

const SidebarToggle = styled.div`
  color: #fff;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  user-select: none;
`;

const SidebarContent = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: opacity 0.3s;

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

    span.kigou {
      color: #fff;
      display: inline;
    }

    span.moji {
      color: #fff;
      display: ${(props) => (props.isOpen ? 'inline' : 'none')};
      transition: display 0.3s;
    }

    /* ${SidebarContainer}:hover & {
      span.moji {
        display: inline;
      }
    } */
  }
`;
