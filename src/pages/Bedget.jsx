import BudgetTable from "../features/budget/BudgetTable";
import ReadyToAssign from "../features/budget/ReadyToAssign";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bedget() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Monthly Budget</Heading>
        <ReadyToAssign />
      </Row>
      <Row>
        <BudgetTable />
      </Row>
    </>
  );
}

export default Bedget;
