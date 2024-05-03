import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function TransactionTableOperaction() {
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

      <SortBy
        options={[
          { value: "date-desc", label: "Sort by date (recent first)" },
          { value: "date-asc", label: "Sort by date (earlier first)" },
          {
            value: "amount-desc",
            label: "Sort by amount (high first)",
          },
          { value: "amount-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default TransactionTableOperaction;
