import styled from "styled-components";
import Button from "../../ui/Button";
import TargetChart from "./TargetChart";

const TargetView = styled.div`
  padding: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

function EditTarget({ handleShowForm }) {
  return (
    <TargetView>
      <TargetChart />
      <Button $size="small" onClick={() => handleShowForm(true)}>
        Edit Target
      </Button>
    </TargetView>
  );
}

export default EditTarget;
