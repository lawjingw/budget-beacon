import AccountBalance from "../features/account/AccountBalance";
import EditAccount from "../features/account/EditAccount";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Row $columns="repeat(2, minmax(0, 1fr))">
        <AccountBalance />
        <EditAccount />
      </Row>
    </>
  );
}

export default Account;
