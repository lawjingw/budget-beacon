import TableSpace from "../../ui/TableSpace";
import Menu from "../../ui/Menu";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import { HiPencil, HiTrash } from "react-icons/hi2";
import EditTransactionForm from "./EditTransactionForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { delTransaction } from "./accountSlice";
import { selectCategoryById } from "../budget/budgetSlice";

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
  const dispatch = useDispatch();
  const { id, date, payee, budgetId, memo, cashFlow, amount } = transaction;
  const category = useSelector((state) => selectCategoryById(state, budgetId));

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
          <Menu>
            <Modal>
              <Menu.Toggle />
              <Menu.List>
                <Modal.Open opens="Edit Transaction">
                  <Menu.Button icon={<HiPencil />}>Edit</Menu.Button>
                </Modal.Open>
                <Modal.Open opens="Confirm Delete">
                  <Menu.Button icon={<HiTrash />}>Delete</Menu.Button>
                </Modal.Open>
              </Menu.List>
              <Modal.Window name="Edit Transaction">
                <EditTransactionForm transaction={transaction} />
              </Modal.Window>
              <Modal.Window name="Confirm Delete">
                <ConfirmDelete
                  resourceName="transaction"
                  onConfirm={() => dispatch(delTransaction(id))}
                />
              </Modal.Window>
            </Modal>
          </Menu>
        </>
      )}
    ></TableSpace.Row>
  );
}

export default TransactionRow;
