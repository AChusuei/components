import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  DataTable,
  type DataTableColumnDef,
  type ServerFetchParams,
  type ServerFetchResult,
  formatCellValue,
} from "./data-table";

// ─── Sample Data ──────────────────────────────────────────────────────────────

interface Person {
  id: number;
  name: string;
  role: "admin" | "editor";
  score: number;
  joinDate: string;
  salary: number;
  isVerified: boolean;
  status: "active" | "inactive";
}

const PEOPLE: Person[] = [
  { id: 1, name: "Alice", role: "admin", score: 90, joinDate: "2024-01-01", salary: 90000, isVerified: true, status: "active" },
  { id: 2, name: "Bob", role: "editor", score: 70, joinDate: "2024-06-01", salary: 70000, isVerified: false, status: "inactive" },
  { id: 3, name: "Carol", role: "admin", score: 50, joinDate: "2024-03-01", salary: 50000, isVerified: true, status: "active" },
];

const COLUMNS: DataTableColumnDef<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "score", header: "Score" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function setup(props?: Partial<Parameters<typeof DataTable<Person>>[0]>) {
  return render(<DataTable columns={COLUMNS} data={PEOPLE} {...props} />);
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
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
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

  it("filter row is hidden by default when enableColumnFilters is true", () => {
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "name", header: "Name", filterMeta: { filterVariant: "text" } },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enableColumnFilters />);
    expect(screen.queryByPlaceholderText("Filter…")).not.toBeInTheDocument();
  });

  it("shows Filters toggle button when enableColumnFilters is true", () => {
    render(<DataTable columns={COLUMNS} data={PEOPLE} enableColumnFilters />);
    expect(screen.getByRole("button", { name: /toggle filters/i })).toBeInTheDocument();
  });

  it("clicking Toggle filters button shows the filter row", async () => {
    const user = userEvent.setup();
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
    await user.click(screen.getByRole("button", { name: /toggle filters/i }));
    expect(screen.getAllByPlaceholderText("Filter…").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("combobox").length).toBeGreaterThan(0);
  });

  it("shows active filter chip when a column filter is set", async () => {
    const user = userEvent.setup();
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "name", header: "Name", filterMeta: { filterVariant: "text" } },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enableColumnFilters enablePagination={false} />);
    await user.click(screen.getByRole("button", { name: /toggle filters/i }));
    const filterInput = screen.getByPlaceholderText("Filter…");
    await user.type(filterInput, "Alice");
    expect(screen.getByRole("button", { name: /clear filter: name/i })).toBeInTheDocument();
  });

  it("clicking chip X button clears the filter", async () => {
    const user = userEvent.setup();
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "name", header: "Name", filterMeta: { filterVariant: "text" } },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enableColumnFilters enablePagination={false} />);
    await user.click(screen.getByRole("button", { name: /toggle filters/i }));
    const filterInput = screen.getByPlaceholderText("Filter…");
    await user.type(filterInput, "Alice");
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    const clearBtn = screen.getByRole("button", { name: /clear filter: name/i });
    await user.click(clearBtn);
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  // ── Pagination ────────────────────────────────────────────────────────────

  it("paginates rows", () => {
    setup({ enablePagination: true, defaultPageSize: 2 });
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
    expect(screen.getByRole("button", { name: /columns/i })).toBeInTheDocument();
  });

  it("toggles column visibility dropdown", async () => {
    const user = userEvent.setup();
    setup({ enableColumnVisibility: true });
    await user.click(screen.getByRole("button", { name: /columns/i }));
    const visibilityCheckboxes = screen.getAllByRole("checkbox");
    expect(visibilityCheckboxes.length).toBeGreaterThan(0);
  });

  // ── Export ────────────────────────────────────────────────────────────────

  it("shows Export CSV button when enableExport is true", () => {
    setup({ enableExport: true });
    expect(screen.getByRole("button", { name: /export csv/i })).toBeInTheDocument();
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

  it("renders numberRange filter inputs after toggle", async () => {
    const user = userEvent.setup();
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "score", header: "Score", filterMeta: { filterVariant: "numberRange" } },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enableColumnFilters />);
    await user.click(screen.getByRole("button", { name: /toggle filters/i }));
    expect(screen.getByPlaceholderText("Min")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Max")).toBeInTheDocument();
  });

  it("renders dateRange filter inputs after toggle", async () => {
    const user = userEvent.setup();
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "joinDate", header: "Join Date", filterMeta: { filterVariant: "dateRange" } },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enableColumnFilters />);
    await user.click(screen.getByRole("button", { name: /toggle filters/i }));
    expect(screen.getByPlaceholderText("From")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("To")).toBeInTheDocument();
  });

  it("filters rows by number range", async () => {
    const user = userEvent.setup();
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "score", header: "Score", filterMeta: { filterVariant: "numberRange" } },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enableColumnFilters enablePagination={false} />);
    await user.click(screen.getByRole("button", { name: /toggle filters/i }));
    const minInput = screen.getByPlaceholderText("Min");
    await user.type(minInput, "75");
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    expect(screen.queryByText("Carol")).not.toBeInTheDocument();
  });

  // ── Phase 2: Row Expansion ────────────────────────────────────────────────

  it("renders expand toggle buttons when enableRowExpansion is true", () => {
    setup({
      enableRowExpansion: true,
      renderSubRow: (row) => <div>Details for {row.name}</div>,
    });
    const expandBtns = screen.getAllByRole("button", { name: /expand row/i });
    expect(expandBtns.length).toBe(PEOPLE.length);
  });

  it("shows sub-row content when expand button is clicked", async () => {
    const user = userEvent.setup();
    setup({
      enableRowExpansion: true,
      renderSubRow: (row) => <div>Details for {row.name}</div>,
    });
    const expandBtns = screen.getAllByRole("button", { name: /expand row/i });
    await user.click(expandBtns[0]);
    expect(screen.getByText("Details for Alice")).toBeInTheDocument();
  });

  it("collapses sub-row when expand button is clicked again", async () => {
    const user = userEvent.setup();
    setup({
      enableRowExpansion: true,
      renderSubRow: (row) => <div>Details for {row.name}</div>,
    });
    const expandBtns = screen.getAllByRole("button", { name: /expand row/i });
    await user.click(expandBtns[0]); // expand
    expect(screen.getByText("Details for Alice")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /collapse row/i })); // collapse
    expect(screen.queryByText("Details for Alice")).not.toBeInTheDocument();
  });

  it("does not render expand column when enableRowExpansion is false", () => {
    setup({
      renderSubRow: (row) => <div>Details for {row.name}</div>,
    });
    // No expand buttons
    expect(
      screen.queryByRole("button", { name: /expand row/i })
    ).not.toBeInTheDocument();
  });

  // ── Phase 2: Cell Formatters ──────────────────────────────────────────────

  describe("formatCellValue", () => {
    it("formats date", () => {
      const result = formatCellValue("2024-01-15", { type: "date", locale: "en-US" });
      expect(result).toMatch(/2024/);
    });

    it("formats datetime", () => {
      const result = formatCellValue("2024-01-15T12:00:00", { type: "datetime", locale: "en-US" });
      expect(result).toMatch(/2024/);
    });

    it("formats currency", () => {
      const result = formatCellValue(1234.5, { type: "currency", currency: "USD", locale: "en-US" });
      expect(String(result)).toContain("1,234");
    });

    it("formats number with decimals", () => {
      const result = formatCellValue(3.14159, { type: "number", decimals: 2, locale: "en-US" });
      expect(String(result)).toBe("3.14");
    });

    it("formats boolean true", () => {
      const result = formatCellValue(true, { type: "boolean", trueLabel: "Yes", falseLabel: "No" });
      expect(result).toBe("Yes");
    });

    it("formats boolean false", () => {
      const result = formatCellValue(false, { type: "boolean", trueLabel: "Yes", falseLabel: "No" });
      expect(result).toBe("No");
    });

    it("formats badge with variant", () => {
      const result = formatCellValue("active", {
        type: "badge",
        variants: { active: { label: "Active", className: "bg-green-100" } },
      });
      // Returns a ReactNode — check it renders
      const { container } = render(<>{result}</>);
      expect(container.textContent).toBe("Active");
    });

    it("formats badge with default class when variant missing", () => {
      const result = formatCellValue("unknown", { type: "badge" });
      const { container } = render(<>{result}</>);
      expect(container.textContent).toBe("unknown");
    });

    it("returns em-dash for null value", () => {
      const result = formatCellValue(null, { type: "number", decimals: 0 });
      expect(result).toBe("—");
    });

    it("returns em-dash for undefined value", () => {
      const result = formatCellValue(undefined, { type: "date" });
      expect(result).toBe("—");
    });
  });

  it("applies formatter to column cells", () => {
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "salary",
        header: "Salary",
        formatter: { type: "currency", currency: "USD", locale: "en-US" },
      },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enablePagination={false} />);
    // $90,000 or similar
    expect(screen.getByText(/\$90,000/)).toBeInTheDocument();
    expect(screen.getByText(/\$70,000/)).toBeInTheDocument();
  });

  it("custom cell renderer takes precedence over formatter", () => {
    const cols: DataTableColumnDef<Person>[] = [
      {
        accessorKey: "salary",
        header: "Salary",
        formatter: { type: "currency" },
        cell: () => <span>CUSTOM</span>,
      },
    ];
    render(<DataTable columns={cols} data={PEOPLE} enablePagination={false} />);
    // Custom cell renders, not formatter
    expect(screen.getAllByText("CUSTOM").length).toBe(PEOPLE.length);
  });

  // ── Phase 2: Pinned Columns ───────────────────────────────────────────────

  it("applies sticky positioning to pinned-left columns", () => {
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "name", header: "Name", pin: "left" },
      { accessorKey: "role", header: "Role" },
    ];
    const { container } = render(
      <DataTable columns={cols} data={PEOPLE} enablePagination={false} />
    );
    // Find sticky cells
    const stickyCells = container.querySelectorAll('[style*="sticky"]');
    expect(stickyCells.length).toBeGreaterThan(0);
  });

  it("applies sticky positioning to pinned-right columns", () => {
    const cols: DataTableColumnDef<Person>[] = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "status", header: "Status", pin: "right" },
    ];
    const { container } = render(
      <DataTable columns={cols} data={PEOPLE} enablePagination={false} />
    );
    const stickyCells = container.querySelectorAll('[style*="sticky"]');
    expect(stickyCells.length).toBeGreaterThan(0);
  });

  // ── Phase 2: Server-side Mode ─────────────────────────────────────────────

  it("calls fetchData on mount and displays results", async () => {
    const fetchData = vi.fn(
      async (): Promise<ServerFetchResult<Person>> => ({
        data: PEOPLE,
        total: PEOPLE.length,
      })
    );

    render(
      <DataTable
        columns={COLUMNS}
        fetchData={fetchData}
        enablePagination
        defaultPageSize={10}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 0,
        pageSize: 10,
        sorting: [],
        filters: [],
        globalFilter: "",
      })
    );
  });

  it("shows server-side loading state", async () => {
    let resolve!: (v: ServerFetchResult<Person>) => void;
    const fetchData = vi.fn(
      () => new Promise<ServerFetchResult<Person>>((r) => { resolve = r; })
    );

    render(
      <DataTable columns={COLUMNS} fetchData={fetchData} enablePagination={false} />
    );

    // Should show skeleton while loading
    const skeletons = document.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);

    // Resolve
    resolve({ data: PEOPLE, total: PEOPLE.length });
    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });
  });

  it("shows server-side error state", async () => {
    const fetchData = vi.fn(async () => {
      throw new Error("Server error");
    });

    render(
      <DataTable columns={COLUMNS} fetchData={fetchData} enablePagination={false} />
    );

    await waitFor(() => {
      expect(screen.getByText("Server error")).toBeInTheDocument();
    });
  });

  it("re-fetches when page changes in server mode", async () => {
    const fetchData = vi.fn(
      async (params: ServerFetchParams): Promise<ServerFetchResult<Person>> => {
        const start = params.page * params.pageSize;
        return {
          data: PEOPLE.slice(start, start + params.pageSize),
          total: PEOPLE.length,
        };
      }
    );

    render(
      <DataTable
        columns={COLUMNS}
        fetchData={fetchData}
        enablePagination
        defaultPageSize={2}
      />
    );

    await waitFor(() => expect(screen.getByText("Alice")).toBeInTheDocument());

    const user = userEvent.setup();
    await user.click(screen.getByText("›"));

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1, pageSize: 2 })
      );
    });
  });

  it("passes sorting params to fetchData", async () => {
    const fetchData = vi.fn<(p: ServerFetchParams) => Promise<ServerFetchResult<Person>>>(
      async () => ({
        data: PEOPLE,
        total: PEOPLE.length,
      })
    );

    render(
      <DataTable
        columns={COLUMNS}
        fetchData={fetchData}
        enableSorting
        enablePagination={false}
      />
    );

    await waitFor(() => expect(screen.getByText("Alice")).toBeInTheDocument());

    const user = userEvent.setup();
    await user.click(screen.getByText("Name"));

    await waitFor(() => {
      const lastCall = fetchData.mock.calls[fetchData.mock.calls.length - 1][0];
      expect(lastCall.sorting).toEqual([{ id: "name", desc: false }]);
    });
  });

  it("passes globalFilter to fetchData", async () => {
    const fetchData = vi.fn<(p: ServerFetchParams) => Promise<ServerFetchResult<Person>>>(
      async () => ({
        data: PEOPLE,
        total: PEOPLE.length,
      })
    );

    render(
      <DataTable
        columns={COLUMNS}
        fetchData={fetchData}
        enableGlobalFilter
        enablePagination={false}
      />
    );

    await waitFor(() => expect(screen.getByText("Alice")).toBeInTheDocument());

    const user = userEvent.setup();
    const search = screen.getByPlaceholderText("Search…");
    await user.type(search, "Alice");

    await waitFor(() => {
      const lastCall = fetchData.mock.calls[fetchData.mock.calls.length - 1][0];
      expect(lastCall.globalFilter).toContain("Alice");
    });
  });

  it("shows total count from server in pagination", async () => {
    const fetchData = vi.fn(
      async (): Promise<ServerFetchResult<Person>> => ({
        data: PEOPLE.slice(0, 2),
        total: 50,
      })
    );

    render(
      <DataTable
        columns={COLUMNS}
        fetchData={fetchData}
        enablePagination
        defaultPageSize={2}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/50 total/)).toBeInTheDocument();
    });
  });
});
