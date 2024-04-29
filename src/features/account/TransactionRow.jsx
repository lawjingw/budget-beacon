import TableSpace from "../../ui/TableSpace";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

const Date = styled.div`
  justify-self: left;
`;

const Payee = styled.div`
  justify-self: left;
`;

const Category = styled.div`
  justify-self: left;
`;

const Memo = styled.div`
  justify-self: left;
`;

function TransactionRow({ transaction }) {
  const { id, date, payee, category, memo, cashFlow, amount } = transaction;

  return (
    <TableSpace.Row
      name={id}
      renderItem={(isEditing, setIsEditing) => (
        <>
          <Date>{date}</Date>
          <Payee>{payee}</Payee>
          <Category>{category}</Category>
          <Memo>{memo}</Memo>
          <div>{cashFlow === "outflow" && formatCurrency(amount)}</div>
          <div>{cashFlow === "inflow" && formatCurrency(amount)}</div>
        </>
      )}
    ></TableSpace.Row>
  );
}

export default TransactionRow;
