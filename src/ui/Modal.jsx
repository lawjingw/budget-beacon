import { cloneElement, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { ModalContext } from "./ModalContext";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-bg-100);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-bg-300);
  padding: 1.6rem 2rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const ModalHeader = styled.div`
  display: flex;
  padding-bottom: 1.6rem;
  font-weight: 600;
  font-size: 1.8rem;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-bg-200);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

function Modal({ children }) {
  const [openName, setOpanName] = useState("");
  const open = setOpanName;
  const close = () => setOpanName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, children }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);
  const modalRef = useOutsideClick(close);

  if (openName !== name) return null;

  return createPortal(
    <Overlay role="presentation" aria-modal="true">
      <StyledModal
        ref={modalRef}
        role="dialog"
        aria-labelledby={`${name}-title`}
      >
        <ModalHeader>
          <p id={`${name}-title`}>{name}</p>
          <Button onClick={close} aria-label="close">
            <HiXMark />
          </Button>
        </ModalHeader>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
