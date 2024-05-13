import ReportLayout from "../features/reports/ReportLayout";
import ReportPanel from "../features/reports/ReportPanel";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Reports() {
  return (
    <>
      <Row>
        <Heading as="h1">Spending Reports</Heading>
      </Row>
      <Row $columns="2.2fr 1fr">
        <ReportLayout />
        <ReportPanel />
      </Row>
    </>
  );
}

export default Reports;
