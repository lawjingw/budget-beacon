import { styled } from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  background-color: var(--color-bg-100);
  padding: 2.6rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  border-right: 1px solid var(--color-bg-300);
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
