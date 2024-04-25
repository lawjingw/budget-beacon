import styled, { css } from "styled-components";

const Row = styled.div`
  ${(props) =>
    props.$type === "horizontal" &&
    css`
      display: grid;
      grid-template-columns: ${(props) => props.$columns};
      align-items: start;
      column-gap: 2rem;
    `}

  ${(props) =>
    props.$type === "vertical" &&
    css`
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  $type: "horizontal",
};

export default Row;
