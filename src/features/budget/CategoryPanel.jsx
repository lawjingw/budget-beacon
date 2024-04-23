import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useContext } from "react";
import { TableContext } from "../../ui/TableContext";
import Target from "./Target";
import { useSelector } from "react-redux";
import { selectCategoryById } from "./budgetSlice";

const Panel = styled.div`
  border: 1px solid var(--color-bg-300);
  font-size: 1.4rem;
  background-color: var(--color-bg-200);
  border-radius: 7px;
  padding: 2rem 2rem;
`;

const CategoryHeading = styled(Heading)`
  padding-bottom: 2.4rem;
`;

function CategoryPanel() {
  const { selected } = useContext(TableContext);
  const category = useSelector((state) => selectCategoryById(state, selected));

  return (
    <Panel>
      {selected && <CategoryHeading as="h3">{category}</CategoryHeading>}
      {selected && <Target category={category} />}
    </Panel>
  );
}

export default CategoryPanel;
