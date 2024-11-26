import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TableSpace from "../../src/ui/TableSpace";
import { describe, it, expect } from "vitest";
const renderTableSpace = (data = []) => {
  return render(
    <TableSpace columns="1fr 2fr">
      <TableSpace.Table>
        <TableSpace.Header>
          <div>Header</div>
        </TableSpace.Header>
        <TableSpace.Body
          name="items"
          data={data}
          render={(item) => <div>{item.name}</div>}
        />
      </TableSpace.Table>
    </TableSpace>
  );
};
describe("TableSpace Component", () => {
  it("renders TableSpace with children", () => {
    renderTableSpace();

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(
      screen.getByText("No items to show at the moment")
    ).toBeInTheDocument();
  });

  it("renders rows in the body", () => {
    const data = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    renderTableSpace(data);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("handles row click and sets selected state", async () => {
    const data = [{ id: 1, name: "Item 1" }];
    renderTableSpace(data);

    const row = screen.getByText("Item 1");
    const user = userEvent.setup();
    await user.click(row);

    expect(row.parentElement).toHaveStyle("background-color: rgba(0, 0, 0, 0)");
  });
});
