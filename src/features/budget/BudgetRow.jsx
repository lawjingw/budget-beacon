import styled from "styled-components";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { useContext, useEffect, useRef } from "react";
import { TableContext } from "../../ui/TableContext";
import { useDispatch } from "react-redux";
import { assignBudget } from "./budgetSlice";

const Category = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  justify-self: left;
`;

const Assigned = styled.input`
  background-color: inherit;
  border-radius: var(--border-radius-sm);
  padding: 1.2px 0;
  border: none;
  text-align: right;

  &:hover {
    outline: 2px solid var(--color-primary-200);
    outline-offset: -1px;
  }
`;

function BudgetRow({ budget }) {
  const { category, assigned, activity, available } = budget;
  const { selected } = useContext(TableContext);
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleUpdateAssigned = (money) => {
    dispatch(assignBudget({ category: category, assigned: money }));
  };

  useEffect(() => {
    if (category === selected) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [category, selected]);

  return (
    <Table.Row name={category}>
      <Category>{category}</Category>
      {category === selected ? (
        <Assigned
          ref={inputRef}
          type="number"
          step="0.01"
          min="0"
          defaultValue={assigned}
          onClick={(e) => e.target.select()}
          onBlur={(e) => handleUpdateAssigned(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
        />
      ) : (
        <div>{formatCurrency(assigned)}</div>
      )}

      <div>{formatCurrency(activity)}</div>
      <div>{formatCurrency(available)}</div>
    </Table.Row>
  );
}

export default BudgetRow;
