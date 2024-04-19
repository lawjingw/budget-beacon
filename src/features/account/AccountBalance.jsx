import Heading from "../../ui/Heading";
import { formatCurrency } from "../../utils/helpers";
import { styled } from "styled-components";
import { useSelector } from "react-redux";

const CurrentBalance = styled.div`
  font-size: 1.8rem;

  & span {
    color: var(--color-green-200);
  }
`;

function AccountBalance() {
  const account = useSelector((state) => state.account);

  return (
    <div>
      <Heading as="h1">{account.name}</Heading>
      <CurrentBalance>
        Current balance:&nbsp;&nbsp;
        <span>{formatCurrency(account.currentBalance)}</span>
      </CurrentBalance>
    </div>
  );
}

export default AccountBalance;
