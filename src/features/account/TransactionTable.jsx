import { useSelector } from "react-redux";
import TableSpace from "../../ui/TableSpace";
import TransactionRow from "./TransactionRow";
import styled from "styled-components";

const DateHeader = styled.div`
  justify-self: left;
`;

const PayeeHeader = styled.div`
  justify-self: left;
`;

const CategoryHeader = styled.div`
  justify-self: left;
`;

const MemoHeader = styled.div`
  justify-self: left;
`;

function TransactionTable() {
  const transactions = useSelector((state) => state.account.transactions);

  return (
    <TableSpace columns="1fr 2.8fr 1.8fr 2.8fr 1fr 1fr 0.6fr">
      <TableSpace.Table>
        <TableSpace.Header>
          <DateHeader>Date</DateHeader>
          <PayeeHeader>Payee</PayeeHeader>
          <CategoryHeader>Category</CategoryHeader>
          <MemoHeader>Memo</MemoHeader>
          <div>Outflow</div>
          <div>Inflow</div>
          <div></div>
        </TableSpace.Header>
        <TableSpace.Body
          name="transactions"
          data={transactions}
          render={(transaction) => (
            <TransactionRow transaction={transaction} key={transaction.id} />
          )}
        />
      </TableSpace.Table>
    </TableSpace>
  );
}

export default TransactionTable;
