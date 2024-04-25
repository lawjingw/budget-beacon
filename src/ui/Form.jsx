import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.$type === "modal" &&
    css`
      width: 32rem;
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
