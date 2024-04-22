import { useContext, useState } from "react";
import styled from "styled-components";
import { TableContext } from "./TableContext";

const StyledTable = styled.div`
  border: 1px solid var(--color-bg-300);

  font-size: 1.4rem;
  background-color: var(--color-bg-200);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  justify-items: right;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--color-bg-300);
  background-color: var(--color-bg-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  transition: all 0.2s;

  &[name=${(props) => props.$selected}] {
    background-color: var(--color-bg-100);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-bg-300);
  }

  &:hover {
    cursor: pointer;
    background-color: var(--color-bg-100);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-bg-100);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

function Table({ columns, children }) {
  const [selected, setSelected] = useState(null);

  return (
    <TableContext.Provider value={{ columns, selected, setSelected }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader as="header" $columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <section>{data.map(render)}</section>;
}

function Row({ name, children }) {
  const { columns, selected, setSelected } = useContext(TableContext);

  return (
    <StyledRow
      name={name}
      $selected={selected}
      $columns={columns}
      role="row"
      onClick={() => setSelected(name)}
      onBlur={() => setSelected(null)}
    >
      {children}
    </StyledRow>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
