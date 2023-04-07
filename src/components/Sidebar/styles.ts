import styled from '@emotion/styled';

export const SidebarContainer = styled.div<{ isOpen: boolean }>`
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s;
`;

export const SidebarToggle = styled.div`
  color: #fff;
  cursor: pointer;
  user-select: none;
`;

export const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const fadeOut = `
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity:0;
    }
  }
`;

export const SidebarContent = styled.div<{ isOpen: boolean }>`
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
    padding: 0 22px;

    svg {
      width: 20px;
      height: 20px;
    }
  }
  .box2 {
    width: 250px;
    visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
    transition: 0.3s;
    animation: ${(props) => (props.isOpen ? 'fadeIn 0.3s' : 'fadeOut 0.3s')};
    animation-fill-mode: forwards;
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
    padding: 13px 10px;
    cursor: pointer;
    line-height: 1;
    text-decoration: none;
    &:hover {
      color: #49bac0;
      text-decoration: none;
      transition: 0.5s;
      svg {
        path {
          fill: #49bac0;
          transition: 0.5s;
        }
      }
    }
  }
`;
