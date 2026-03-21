import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DataTable, type DataTableColumnDef } from "./data-table";

// ─── Sample Data ──────────────────────────────────────────────────────────────

interface Person {
  id: number;
  name: string;
  role: "admin" | "editor";
  score: number;
  joinDate: string;
}

const PEOPLE: Person[] = [
  { id: 1, name: "Alice", role: "admin", score: 90, joinDate: "2024-01-01" },
  { id: 2, name: "Bob", role: "editor", score: 70, joinDate: "2024-06-01" },
  { id: 3, name: "Carol", role: "admin", score: 50, joinDate: "2024-03-01" },
];

const COLUMNS: DataTableColumnDef<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "score", header: "Score" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function setup(props?: Partial<Parameters<typeof DataTable<Person>>[0]>) {
  return render(
    <DataTable columns={COLUMNS} data={PEOPLE} {...props} />
  );
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("DataTable", () => {
  // ── Renders data ─────────────────────────────────────────────────────────

  it("renders column headers", () => {
    setup();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Score")).toBeInTheDocument();
  });

  it("renders row data", () => {
    setup();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Carol")).toBeInTheDocument();
  });

  // ── Empty / Error / Loading states ───────────────────────────────────────

  it("shows empty message when data is empty", () => {
    setup({ data: [] });
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });

  it("shows custom empty message", () => {
    setup({ data: [], emptyMessage: "Nothing here." });
    expect(screen.getByText("Nothing here.")).toBeInTheDocument();
  });

  it("shows error message", () => {
    setup({ data: [], error: "Load failed." });
    expect(screen.getByText("Load failed.")).toBeInTheDocument();
  });

  it("shows skeleton rows when loading", () => {
    setup({ isLoading: true, defaultPageSize: 3 });
    // Alice / Bob / Carol should NOT appear — only skeletons
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    // Skeletons render as divs with animate-pulse class
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  // ── Sorting ──────────────────────────────────────────────────────────────

  it("sorts ascending when clicking a sortable header", async () => {
    const user = userEvent.setup();
    setup({ enableSorting: true });
    const nameHeader = screen.getByText("Name");
    await user.click(nameHeader);
    const rows = screen.getAllByRole("row");
    // header row + 3 data rows (+ possibly filter row)
    const dataRows = rows.filter((r) => within(r).queryByText(/Alice|Bob|Carol/) !== null);
    expect(within(dataRows[0]).getByText("Alice")).toBeInTheDocument();
    expect(within(dataRows[1]).getByText("Bob")).toBeInTheDocument();
    expect(within(dataRows[2]).getByText("Carol")).toBeInTheDocument();
  });

  it("sorts descending on second click", async () => {
    const user = userEvent.setup();
    setup({ enableSorting: true });
    const nameHeader = screen.getByText("Name");
    await user.click(nameHeader); // asc
    await user.click(nameHeader); // desc
    const rows = screen.getAllByRole("row");
    const dataRows = rows.filter((r) => within(r).queryByText(/Alice|Bob|Carol/) !== null);
    expect(within(dataRows[0]).getByText("Carol")).toBeInTheDocument();
    expect(within(dataRows[1]).getByText("Bob")).toBeInTheDocument();
    expect(within(dataRows[2]).getByText("Alice")).toBeInTheDocument();
  });

  // ── Global Filter ─────────────────────────────────────────────────────────

  it("filters rows with global search", async () => {
    const user = userEvent.setup();
    setup({ enableGlobalFilter: true });
    const search = screen.getByPlaceholderText("Search…");
    await user.type(search, "Alice");
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
  });

  // ── Per-column Filters ────────────────────────────────────────────────────

  it("renders column filter inputs when enableColumnFilters is true", () => {
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "name", header: "Name", filterMeta: { filterVariant: "text" } },
      {
        accessorKey: "role",
        header: "Role",
        filterMeta: {
          filterVariant: "select",
          options: [
            { label: "Admin", value: "admin" },
            { label: "Editor", value: "editor" },
          ],
        },
      },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enableColumnFilters />);
    expect(screen.getAllByPlaceholderText("Filter…").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("combobox").length).toBeGreaterThan(0);
  });

  // ── Pagination ────────────────────────────────────────────────────────────

  it("paginates rows", () => {
    setup({ enablePagination: true, defaultPageSize: 2 });
    // Only 2 of 3 rows visible on first page
    const names = screen
      .getAllByRole("row")
      .map((r) => r.textContent ?? "")
      .join(" ");
    const visibleCount = ["Alice", "Bob", "Carol"].filter((n) =>
      names.includes(n)
    ).length;
    expect(visibleCount).toBe(2);
  });

  it("navigates to next page", async () => {
    const user = userEvent.setup();
    setup({ enablePagination: true, defaultPageSize: 2 });
    const nextBtn = screen.getByText("›");
    await user.click(nextBtn);
    expect(screen.getByText("Carol")).toBeInTheDocument();
  });

  it("shows page size selector", () => {
    setup({ enablePagination: true, pageSizeOptions: [2, 5] });
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
  });

  // ── Row Selection ─────────────────────────────────────────────────────────

  it("renders checkboxes when enableRowSelection is true", () => {
    setup({ enableRowSelection: true });
    const checkboxes = screen.getAllByRole("checkbox");
    // 1 header + 3 row checkboxes
    expect(checkboxes.length).toBe(4);
  });

  it("calls onSelectionChange when rows are selected", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    setup({ enableRowSelection: true, onSelectionChange });
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]); // first data row
    expect(onSelectionChange).toHaveBeenCalledWith([PEOPLE[0]]);
  });

  it("renders bulk action buttons when rows are selected", async () => {
    const user = userEvent.setup();
    const onBulkDelete = vi.fn();
    setup({
      enableRowSelection: true,
      bulkActions: [
        { label: "Delete", onClick: onBulkDelete, variant: "destructive" },
      ],
    });
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);
    const deleteBtn = screen.getByText(/Delete \(1\)/);
    expect(deleteBtn).toBeInTheDocument();
    await user.click(deleteBtn);
    expect(onBulkDelete).toHaveBeenCalledWith([PEOPLE[0]]);
  });

  // ── Select all ────────────────────────────────────────────────────────────

  it("selects all rows with header checkbox", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    setup({ enableRowSelection: true, onSelectionChange });
    const headerCheckbox = screen.getAllByRole("checkbox")[0];
    await user.click(headerCheckbox);
    expect(onSelectionChange).toHaveBeenCalledWith(PEOPLE);
  });

  // ── Row Click ─────────────────────────────────────────────────────────────

  it("calls onRowClick when a row is clicked", async () => {
    const user = userEvent.setup();
    const onRowClick = vi.fn();
    setup({ onRowClick });
    const aliceCell = screen.getByText("Alice");
    await user.click(aliceCell);
    expect(onRowClick).toHaveBeenCalledWith(PEOPLE[0]);
  });

  // ── Row Actions ───────────────────────────────────────────────────────────

  it("renders row action buttons", () => {
    const onEdit = vi.fn();
    setup({
      rowActions: [{ label: "Edit", onClick: onEdit, variant: "ghost" }],
    });
    const editButtons = screen.getAllByText("Edit");
    expect(editButtons.length).toBe(PEOPLE.length);
  });

  it("calls row action when clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    setup({
      rowActions: [{ label: "Edit", onClick: onEdit }],
    });
    const editButtons = screen.getAllByText("Edit");
    await user.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith(PEOPLE[0]);
  });

  it("hides row action based on hidden predicate", () => {
    setup({
      rowActions: [
        {
          label: "Delete",
          onClick: vi.fn(),
          hidden: (row) => row.role === "admin",
        },
      ],
    });
    // Only Bob (editor) should have delete button; Alice and Carol (admin) should not
    const deleteButtons = screen.getAllByText("Delete");
    expect(deleteButtons.length).toBe(1); // only Bob
  });

  // ── Column Visibility ─────────────────────────────────────────────────────

  it("shows Columns button when enableColumnVisibility is true", () => {
    setup({ enableColumnVisibility: true });
    expect(screen.getByText("Columns")).toBeInTheDocument();
  });

  it("toggles column visibility dropdown", async () => {
    const user = userEvent.setup();
    setup({ enableColumnVisibility: true });
    await user.click(screen.getByText("Columns"));
    // Dropdown should appear with checkboxes for each hideable column
    const visibilityCheckboxes = screen.getAllByRole("checkbox");
    expect(visibilityCheckboxes.length).toBeGreaterThan(0);
  });

  // ── Export ────────────────────────────────────────────────────────────────

  it("shows Export CSV button when enableExport is true", () => {
    setup({ enableExport: true });
    expect(screen.getByText("Export CSV")).toBeInTheDocument();
  });

  // ── Custom Slots ──────────────────────────────────────────────────────────

  it("renders refreshSlot in toolbar", () => {
    setup({ refreshSlot: <button>Refresh</button> });
    expect(screen.getByText("Refresh")).toBeInTheDocument();
  });

  it("renders toolbarActionsSlot in toolbar", () => {
    setup({ toolbarActionsSlot: <button>+ New</button> });
    expect(screen.getByText("+ New")).toBeInTheDocument();
  });

  // ── Number range filter ───────────────────────────────────────────────────

  it("renders numberRange filter inputs", () => {
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "score", header: "Score", filterMeta: { filterVariant: "numberRange" } },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enableColumnFilters />);
    expect(screen.getByPlaceholderText("Min")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Max")).toBeInTheDocument();
  });

  it("renders dateRange filter inputs", () => {
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "joinDate", header: "Join Date", filterMeta: { filterVariant: "dateRange" } },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enableColumnFilters />);
    expect(screen.getByPlaceholderText("From")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("To")).toBeInTheDocument();
  });

  // ── Number range filters actual filtering ────────────────────────────────

  it("filters rows by number range", async () => {
    const user = userEvent.setup();
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "score", header: "Score", filterMeta: { filterVariant: "numberRange" } },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enableColumnFilters enablePagination={false} />);
    const minInput = screen.getByPlaceholderText("Min");
    await user.type(minInput, "75");
    // Only Alice (90) should remain; Bob (70) and Carol (50) are filtered out
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    expect(screen.queryByText("Carol")).not.toBeInTheDocument();
  });
});
