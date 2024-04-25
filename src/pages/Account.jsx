import AccountBalance from "../features/account/AccountBalance";
import AddTransaction from "../features/account/AddTransaction";
import EditAccount from "../features/account/EditAccount";
import TransactionTable from "../features/account/TransactionTable";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Row $columns="repeat(2, minmax(0, 1fr))">
        <AccountBalance />
        <EditAccount />
      </Row>
      <Row $type="vertical">
        <TransactionTable />
        <AddTransaction />
      </Row>
    </>
  );
}

export default Account;
