import styled from "styled-components";

const Row = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  align-items: start;
  column-gap: 2rem;
`;

export default Row;
