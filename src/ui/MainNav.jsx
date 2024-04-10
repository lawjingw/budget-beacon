import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  BsPiggyBankFill,
  BsBarChartLineFill,
  BsCashCoin,
} from "react-icons/bs";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-50);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1rem 1.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    background-color: var(--color-brand-700);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-50);
    transition: all 0.3s;
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/account">
            <BsPiggyBankFill />
            Account
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/">
            <BsCashCoin />
            Budget
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/">
            <BsBarChartLineFill />
            Reports
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
