import { useSelector } from "react-redux";
import Table from "../../ui/Table";
import BudgetRow from "./BudgetRow";
import styled from "styled-components";

const CategoryHeader = styled.div`
  justify-self: left;
`;

function BudgetTable() {
  const budget = useSelector((state) => state.budget);

  return (
    <Table columns="2.6fr 1fr 1fr 1fr">
      <Table.Header>
        <CategoryHeader>Category</CategoryHeader>
        <div>Assigned</div>
        <div>Activity</div>
        <div>Available</div>
      </Table.Header>
      <Table.Body
        data={budget}
        render={(budget) => <BudgetRow budget={budget} key={budget.category} />}
      />
    </Table>
  );
}

export default BudgetTable;
