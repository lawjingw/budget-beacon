import styled from "styled-components";

const Input = styled.input`
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;

  &[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
`;

export default Input;
