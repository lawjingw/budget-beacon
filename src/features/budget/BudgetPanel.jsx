import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useContext } from "react";
import { TableContext } from "../../ui/TableContext";
import Target from "./Target";
import { useSelector } from "react-redux";
import { selectBudgetById } from "./budgetSlice";
import AvailableBalance from "./AvailableBalance";

const Panel = styled.div`
  border: 1px solid var(--color-bg-300);
  font-size: 1.4rem;
  background-color: var(--color-bg-200);
  border-radius: 7px;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`;

function BudgetPanel() {
  const { selected } = useContext(TableContext);
  const categoryBudget = useSelector((state) =>
    selectBudgetById(state, selected)
  );

  return (
    <Panel>
      {selected && <Heading as="h3">{categoryBudget.category}</Heading>}
      <AvailableBalance />
      {selected && <Target categoryBudget={categoryBudget} />}
    </Panel>
  );
}

export default BudgetPanel;
