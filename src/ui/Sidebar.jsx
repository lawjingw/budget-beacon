import { styled } from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-brand-900);
  padding: 2.6rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
