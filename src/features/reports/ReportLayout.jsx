import styled from "styled-components";
import SpendingTotalChart from "./SpendingTotalChart";
import SpendingTrendChart from "./SpendingTrendChart";

const StyledReportLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  min-width: 66rem;
`;

function ReportLayout() {
  return (
    <StyledReportLayout>
      <SpendingTotalChart />
      <SpendingTrendChart />
    </StyledReportLayout>
  );
}

export default ReportLayout;
