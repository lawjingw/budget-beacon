import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.5rem;
    padding: 0.4rem 1rem;
    font-weight: 500;
    text-align: center;
  `,
  medium: css`
    font-size: 1.6rem;
    padding: 0.8rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.8rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    background-color: var(--color-primary-100);

    &:hover {
      background-color: var(--button-color-100);
    }
  `,
  secondary: css`
    color: var(--color-text-200);
    background: inherit;

    &:hover {
      color: var(--color-text-100);
      background-color: var(--color-bg-200);
    }
  `,
  danger: css`
    color: var(--color-danger-200);
    background: inherit;

    &:hover {
      background-color: var(--color-danger-100);
    }
  `,
};

const Button = styled.button`
  gap: 6px;
  border: none;
  border-radius: var(--border-radius-sm);
  ${(props) => sizes[props.$size]};
  ${(props) => variations[props.$variation]};
`;

Button.defaultProps = {
  $size: "medium",
  $variation: "primary",
};

export default Button;
