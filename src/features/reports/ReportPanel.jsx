import styled from "styled-components";
import Heading from "../../ui/Heading";

const Panel = styled.div`
  border: 1px solid var(--color-bg-300);
  font-size: 1.4rem;
  background-color: var(--color-bg-200);
  border-radius: 7px;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
`;

function ReportPanel() {
  return (
    <Panel>
      <Heading as="h2">Monthly Report</Heading>
    </Panel>
  );
}

export default ReportPanel;
