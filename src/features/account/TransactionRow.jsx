import TableSpace from "../../ui/TableSpace";

function TransactionRow({ transaction }) {
  const { id, date, payee, category, outflow, inflow } = transaction;
  return (
    <TableSpace.Row
      name={id}
      renderItem={(isEditing, setIsEditing) => (
        <>
          <div>{date}</div>
          <div>{payee}</div>
          <div>{category}</div>
          <div>{outflow}</div>
          <div>{inflow}</div>
        </>
      )}
    ></TableSpace.Row>
  );
}

export default TransactionRow;
