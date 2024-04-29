import { useSelector } from "react-redux";
import BudgetRow from "./BudgetRow";
import styled from "styled-components";
import TableSpace from "../../ui/TableSpace";
import Row from "../../ui/Row";
import BudgetPanel from "./BudgetPanel";
import { selectBudgets } from "./budgetSlice";

const CategoryHeader = styled.div`
  justify-self: left;
`;

function BudgetTable() {
  const budget = useSelector(selectBudgets);

  return (
    <TableSpace columns="2.6fr 1fr 1fr 1fr">
      <Row $columns="2.2fr 1fr">
        <TableSpace.Table>
          <TableSpace.Header>
            <CategoryHeader>Category</CategoryHeader>
            <div>Assigned</div>
            <div>Activity</div>
            <div>Available</div>
          </TableSpace.Header>
          <TableSpace.Body
            name="budget"
            data={budget}
            render={(budget) => <BudgetRow budget={budget} key={budget.id} />}
          />
        </TableSpace.Table>
        <BudgetPanel />
      </Row>
    </TableSpace>
  );
}

export default BudgetTable;
