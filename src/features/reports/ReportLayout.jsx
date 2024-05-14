import styled from "styled-components";
import SpendingTotalChart from "./SpendingTotalChart";
import SpendingTrendChart from "./SpendingTrendChart";
import ReportOperation from "./ReportOperation";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTransactions } from "../account/accountSlice";

const StyledReportLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-width: 66rem;
`;

function ReportLayout() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("last");
  const transactions = useSelector((state) =>
    selectTransactions(state, filter)
  );

  return (
    <StyledReportLayout>
      <ReportOperation />
      <SpendingTotalChart transactions={transactions} />
      <SpendingTrendChart transactions={transactions} />
    </StyledReportLayout>
  );
}

export default ReportLayout;
