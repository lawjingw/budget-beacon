import styled from "styled-components";

const StyledLogo = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  & p {
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

const Img = styled.img`
  height: 3.2rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo aria-label="Budget Beacon Logo">
      <Img src="./logo.png" alt="Budget Beacon logo" />
      <p>Budget Beacon</p>
    </StyledLogo>
  );
}

export default Logo;
