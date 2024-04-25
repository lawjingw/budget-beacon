import { useSelector } from "react-redux";
import TableSpace from "../../ui/TableSpace";
import TransactionRow from "./TransactionRow";
import { selectTransactions } from "./accountSlice";

function TransactionTable() {
  const transactions = useSelector(selectTransactions);

  return (
    <TableSpace columns="1fr 1.8fr 2.8fr 1fr 1fr">
      <TableSpace.Table>
        <TableSpace.Header>
          <div>Date</div>
          <div>Payee</div>
          <div>Category</div>
          <div>Outflow</div>
          <div>Inflow</div>
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
