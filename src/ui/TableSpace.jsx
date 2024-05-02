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

  &[name="${(props) => props.$selected}"] {
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

const StyledBody = styled.section`
  max-height: 74rem;
  overflow-y: scroll;
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

function TableSpace({ columns, children }) {
  const [selected, setSelected] = useState(null);

  return (
    <TableContext.Provider value={{ columns, selected, setSelected }}>
      {children}
    </TableContext.Provider>
  );
}

function Table({ children }) {
  return <StyledTable role="table">{children}</StyledTable>;
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader as="header" $columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Body({ name, data, render }) {
  if (!data.length) return <Empty>No {name} to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

function Row({ name, renderItem }) {
  const { columns, selected, setSelected } = useContext(TableContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setSelected(name);
    setIsEditing(true);
  };

  return (
    <StyledRow
      name={name}
      $selected={selected}
      $columns={columns}
      role="row"
      className="row"
      onClick={handleClick}
    >
      {renderItem(isEditing, setIsEditing)}
    </StyledRow>
  );
}

TableSpace.Table = Table;
TableSpace.Header = Header;
TableSpace.Body = Body;
TableSpace.Row = Row;

export default TableSpace;
