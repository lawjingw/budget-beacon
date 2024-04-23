import BudgetTable from "../features/budget/BudgetTable";
import ReadyToAssign from "../features/budget/ReadyToAssign";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bedget() {
  return (
    <>
      <Row $columns="1fr 2fr">
        <Heading as="h1">Monthly Budget</Heading>
        <ReadyToAssign />
      </Row>
      <BudgetTable />
    </>
  );
}

export default Bedget;
