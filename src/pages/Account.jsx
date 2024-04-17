import AccountBalance from "../features/account/AccountBalance";
import EditAccount from "../features/account/EditAccount";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Row type="horizontal">
        <AccountBalance />
        <EditAccount />
      </Row>
    </>
  );
}

export default Account;
