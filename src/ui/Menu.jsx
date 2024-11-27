import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  outline: 2px solid transparent;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    outline: 2px solid var(--color-primary-200);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-text-200);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
  z-index: 1;
  overflow: hidden;

  border: 1px solid var(--color-bg-300);
  background-color: var(--color-bg-100);
  border-radius: var(--border-radius-md);
`;

const Styledbutton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-primary-100);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-text-200);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

function Menu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <MenuContext.Provider
      value={{ isOpen, open, close, position, setPosition }}
    >
      <StyledMenu>{children}</StyledMenu>
    </MenuContext.Provider>
  );
}

function Toggle() {
  const { isOpen, open, close, setPosition } = useContext(MenuContext);

  const handleToggle = (e) => {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    isOpen ? close() : open();
  };

  return (
    <StyledToggle onClick={handleToggle}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children }) {
  const { isOpen, close, position } = useContext(MenuContext);
  const listRef = useOutsideClick(close);

  if (!isOpen) return null;

  return createPortal(
    <StyledList $position={position} ref={listRef}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ icon, children, onClick }) {
  const { close } = useContext(MenuContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li role="menuitem">
      <Styledbutton onClick={handleClick} aria-label={children}>
        {icon}
        <span>{children}</span>
      </Styledbutton>
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
