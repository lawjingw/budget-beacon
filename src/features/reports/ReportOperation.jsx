import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function ReportOperation() {
  return (
    <TableOperations>
      <Filter
        filterField="last"
        options={[
          { value: "all", label: "All Dates" },
          { value: "this-month", label: "This Month" },
          { value: "3-months", label: "Latest 3 Months" },
          { value: "this-year", label: "This Year" },
        ]}
      />
    </TableOperations>
  );
}

export default ReportOperation;
