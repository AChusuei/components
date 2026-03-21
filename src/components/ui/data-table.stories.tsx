import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DataTable,
  type DataTableColumnDef,
  type ServerFetchParams,
  type ServerFetchResult,
} from "./data-table";
import { Button } from "./button";

// ─── Sample Data ──────────────────────────────────────────────────────────────

interface Person {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
  joinDate: string;
  score: number;
  salary: number;
  isVerified: boolean;
}

const PEOPLE: Person[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", joinDate: "2023-01-15", score: 92, salary: 95000, isVerified: true },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "editor", status: "active", joinDate: "2023-03-20", score: 74, salary: 72000, isVerified: true },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "viewer", status: "inactive", joinDate: "2023-05-10", score: 55, salary: 58000, isVerified: false },
  { id: 4, name: "Dan Brown", email: "dan@example.com", role: "editor", status: "active", joinDate: "2023-07-01", score: 88, salary: 81000, isVerified: true },
  { id: 5, name: "Eva Green", email: "eva@example.com", role: "viewer", status: "active", joinDate: "2023-09-12", score: 61, salary: 62000, isVerified: false },
  { id: 6, name: "Frank Miller", email: "frank@example.com", role: "admin", status: "inactive", joinDate: "2023-11-25", score: 44, salary: 90000, isVerified: false },
  { id: 7, name: "Grace Lee", email: "grace@example.com", role: "editor", status: "active", joinDate: "2024-01-08", score: 79, salary: 77000, isVerified: true },
  { id: 8, name: "Henry Wilson", email: "henry@example.com", role: "viewer", status: "active", joinDate: "2024-02-14", score: 95, salary: 65000, isVerified: true },
  { id: 9, name: "Iris Davis", email: "iris@example.com", role: "admin", status: "inactive", joinDate: "2024-03-30", score: 33, salary: 98000, isVerified: false },
  { id: 10, name: "Jack Taylor", email: "jack@example.com", role: "editor", status: "active", joinDate: "2024-05-05", score: 68, salary: 74000, isVerified: true },
  { id: 11, name: "Karen Moore", email: "karen@example.com", role: "viewer", status: "active", joinDate: "2024-06-20", score: 82, salary: 60000, isVerified: true },
  { id: 12, name: "Leo Anderson", email: "leo@example.com", role: "editor", status: "inactive", joinDate: "2024-08-15", score: 51, salary: 69000, isVerified: false },
];

const COLUMNS: DataTableColumnDef<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    filterMeta: {
      filterVariant: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Viewer", value: "viewer" },
      ],
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const v = getValue<string>();
      return (
        <span
          className={
            v === "active"
              ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
              : "rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800"
          }
        >
          {v}
        </span>
      );
    },
    filterMeta: {
      filterVariant: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    filterMeta: { filterVariant: "dateRange" },
  },
  {
    accessorKey: "score",
    header: "Score",
    filterMeta: { filterVariant: "numberRange" },
  },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof DataTable<Person>> = {
  title: "UI/DataTable",
  component: DataTable,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DataTable<Person>>;

// ─── Phase 1 Stories ──────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    columns: COLUMNS,
    data: PEOPLE,
  },
};

export const DefaultDark: Story = {
  name: "Default (Dark)",
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  args: {
    columns: COLUMNS,
    data: PEOPLE,
  },
};

export const WithSortingAndFilters: Story = {
  name: "Sorting + Column Filters",
  args: {
    columns: COLUMNS,
    data: PEOPLE,
    enableSorting: true,
    enableMultiSort: true,
    enableColumnFilters: true,
  },
};

export const WithSortingAndFiltersDark: Story = {
  name: "Sorting + Column Filters (Dark)",
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  args: {
    columns: COLUMNS,
    data: PEOPLE,
    enableSorting: true,
    enableMultiSort: true,
    enableColumnFilters: true,
  },
};

export const WithRowSelection: Story = {
  name: "Row Selection + Bulk Actions",
  args: {
    columns: COLUMNS,
    data: PEOPLE,
    enableRowSelection: true,
    bulkActions: [
      {
        label: "Delete",
        variant: "destructive",
        onClick: (rows) => alert(`Delete ${rows.length} rows`),
      },
      {
        label: "Export selected",
        variant: "outline",
        onClick: (rows) => alert(`Export ${rows.length} rows`),
      },
    ],
  },
};

export const WithRowSelectionDark: Story = {
  name: "Row Selection + Bulk Actions (Dark)",
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  args: {
    columns: COLUMNS,
    data: PEOPLE,
    enableRowSelection: true,
    bulkActions: [
      {
        label: "Delete",
        variant: "destructive",
        onClick: (rows) => alert(`Delete ${rows.length} rows`),
      },
    ],
  },
};

export const WithRowActions: Story = {
  name: "Row Actions",
  args: {
    columns: COLUMNS,
    data: PEOPLE,
    rowActions: [
      {
        label: "Edit",
        variant: "ghost",
        onClick: (row) => alert(`Edit ${row.name}`),
      },
      {
        label: "Delete",
        variant: "destructive",
        onClick: (row) => alert(`Delete ${row.name}`),
        hidden: (row) => row.role === "admin",
      },
    ],
  },
};

export const Clickable: Story = {
  name: "Clickable Rows",
  args: {
    columns: COLUMNS,
    data: PEOPLE,
    onRowClick: (row) => alert(`Clicked: ${row.name}`),
  },
};

export const Loading: Story = {
  args: {
    columns: COLUMNS,
    data: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: COLUMNS,
    data: [],
    emptyMessage: "No people found.",
  },
};

export const Error: Story = {
  args: {
    columns: COLUMNS,
    data: [],
    error: "Failed to load data. Please try again.",
  },
};

export const WithExportAndRefresh: Story = {
  name: "Export + Refresh + Custom Toolbar",
  args: {
    columns: COLUMNS,
    data: PEOPLE,
    enableExport: true,
    exportFilename: "people-export",
    refreshSlot: (
      <Button variant="outline" size="sm" onClick={() => alert("Refreshed!")}>
        ↺ Refresh
      </Button>
    ),
    toolbarActionsSlot: (
      <Button variant="outline" size="sm" onClick={() => alert("Custom action!")}>
        + New
      </Button>
    ),
  },
};

export const ColumnVisibility: Story = {
  name: "Column Visibility Toggle",
  args: {
    columns: COLUMNS,
    data: PEOPLE,
    enableColumnVisibility: true,
  },
};

export const Light: Story = {
  name: "Light Mode",
  args: { columns: COLUMNS, data: PEOPLE },
  parameters: { darkMode: { current: "light" } },
};

export const Dark: Story = {
  name: "Dark Mode",
  args: { columns: COLUMNS, data: PEOPLE },
  parameters: { darkMode: { current: "dark" } },
};

export const FullFeatured: Story = {
  name: "Full Featured",
  args: {
    columns: COLUMNS,
    data: PEOPLE,
    enableSorting: true,
    enableMultiSort: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableRowSelection: true,
    enableColumnVisibility: true,
    enableExport: true,
    exportFilename: "full-export",
    enablePagination: true,
    defaultPageSize: 5,
    pageSizeOptions: [5, 10, 25],
    rowActions: [
      {
        label: "Edit",
        variant: "ghost",
        onClick: (row) => alert(`Edit: ${row.name}`),
      },
    ],
    bulkActions: [
      {
        label: "Delete selected",
        variant: "destructive",
        onClick: (rows) => alert(`Delete ${rows.length} rows`),
      },
    ],
    onRowClick: (row) => alert(`Row clicked: ${row.name}`),
    refreshSlot: (
      <Button variant="outline" size="sm" onClick={() => alert("Refreshed!")}>
        ↺
      </Button>
    ),
  },
};

// ─── Phase 2: Cell Formatters ─────────────────────────────────────────────────

const FORMATTER_COLUMNS: DataTableColumnDef<Person>[] = [
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    formatter: { type: "date" },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    formatter: { type: "currency", currency: "USD" },
  },
  {
    accessorKey: "score",
    header: "Score",
    formatter: { type: "number", decimals: 1 },
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    formatter: { type: "boolean", trueLabel: "✓ Yes", falseLabel: "✗ No" },
  },
  {
    accessorKey: "status",
    header: "Status",
    formatter: {
      type: "badge",
      variants: {
        active: {
          label: "Active",
          className:
            "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300",
        },
        inactive: {
          label: "Inactive",
          className:
            "rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/40 dark:text-red-300",
        },
      },
    },
  },
];

export const CellFormatters: Story = {
  name: "Cell Formatters (date, currency, number, boolean, badge)",
  args: {
    columns: FORMATTER_COLUMNS,
    data: PEOPLE,
    enableSorting: true,
    enableGlobalFilter: false,
  },
};

export const CellFormattersDark: Story = {
  name: "Cell Formatters (Dark)",
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  args: {
    columns: FORMATTER_COLUMNS,
    data: PEOPLE,
    enableSorting: true,
    enableGlobalFilter: false,
  },
};

// ─── Phase 2: Row Expansion ───────────────────────────────────────────────────

export const RowExpansion: Story = {
  name: "Row Expansion",
  args: {
    columns: COLUMNS,
    data: PEOPLE,
    enableRowExpansion: true,
    renderSubRow: (row) => (
      <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <p className="font-medium text-muted-foreground">Email</p>
          <p>{row.email}</p>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Salary</p>
          <p>${row.salary.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Join Date</p>
          <p>{new Date(row.joinDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Verified</p>
          <p>{row.isVerified ? "Yes" : "No"}</p>
        </div>
      </div>
    ),
  },
};

export const RowExpansionDark: Story = {
  name: "Row Expansion (Dark)",
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  args: {
    columns: COLUMNS,
    data: PEOPLE,
    enableRowExpansion: true,
    renderSubRow: (row) => (
      <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <p className="font-medium text-muted-foreground">Email</p>
          <p>{row.email}</p>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Salary</p>
          <p>${row.salary.toLocaleString()}</p>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Join Date</p>
          <p>{new Date(row.joinDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-medium text-muted-foreground">Verified</p>
          <p>{row.isVerified ? "Yes" : "No"}</p>
        </div>
      </div>
    ),
  },
};

// ─── Phase 2: Pinned/Frozen Columns ──────────────────────────────────────────

const PINNED_COLUMNS: DataTableColumnDef<Person>[] = [
  { accessorKey: "name", header: "Name", pin: "left", size: 160 },
  { accessorKey: "email", header: "Email", size: 220 },
  { accessorKey: "role", header: "Role", size: 120 },
  { accessorKey: "joinDate", header: "Join Date", size: 140 },
  { accessorKey: "score", header: "Score", size: 100 },
  {
    accessorKey: "salary",
    header: "Salary",
    formatter: { type: "currency" },
    size: 140,
  },
  { accessorKey: "isVerified", header: "Verified", formatter: { type: "boolean" }, size: 100 },
  {
    accessorKey: "status",
    header: "Status",
    pin: "right",
    size: 110,
    formatter: {
      type: "badge",
      variants: {
        active: {
          label: "Active",
          className:
            "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800",
        },
        inactive: {
          label: "Inactive",
          className:
            "rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800",
        },
      },
    },
  },
];

export const PinnedColumns: Story = {
  name: "Pinned/Frozen Columns",
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="w-[600px]">
      <p className="mb-2 text-sm text-muted-foreground">
        Name is pinned left, Status is pinned right. Scroll horizontally.
      </p>
      <DataTable {...args} />
    </div>
  ),
  args: {
    columns: PINNED_COLUMNS,
    data: PEOPLE,
    enableSorting: true,
    enableGlobalFilter: false,
  },
};

export const PinnedColumnsDark: Story = {
  name: "Pinned/Frozen Columns (Dark)",
  parameters: { layout: "padded", backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <div className="dark w-[600px]">
      <p className="mb-2 text-sm text-muted-foreground">
        Name is pinned left, Status is pinned right. Scroll horizontally.
      </p>
      <DataTable {...args} />
    </div>
  ),
  args: {
    columns: PINNED_COLUMNS,
    data: PEOPLE,
    enableSorting: true,
    enableGlobalFilter: false,
  },
};

// ─── Phase 2: Server-side Mode ────────────────────────────────────────────────

/** Simulate a server-side data source with delay */
function makeServerFetch(allData: Person[]) {
  return async (params: ServerFetchParams): Promise<ServerFetchResult<Person>> => {
    await new Promise((r) => setTimeout(r, 400));

    let filtered = [...allData];

    // Global filter
    if (params.globalFilter) {
      const q = params.globalFilter.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q)
      );
    }

    // Column filters
    for (const f of params.filters) {
      if (f.id === "role" && f.value) {
        filtered = filtered.filter((p) => p.role === f.value);
      }
      if (f.id === "status" && f.value) {
        filtered = filtered.filter((p) => p.status === f.value);
      }
    }

    // Sorting
    if (params.sorting.length > 0) {
      const { id, desc } = params.sorting[0];
      filtered.sort((a, b) => {
        const av = (a as Record<string, unknown>)[id];
        const bv = (b as Record<string, unknown>)[id];
        const cmp =
          typeof av === "string"
            ? av.localeCompare(bv as string)
            : (av as number) - (bv as number);
        return desc ? -cmp : cmp;
      });
    }

    const total = filtered.length;
    const start = params.page * params.pageSize;
    const data = filtered.slice(start, start + params.pageSize);

    return { data, total };
  };
}

const SERVER_COLUMNS: DataTableColumnDef<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "role",
    header: "Role",
    filterMeta: {
      filterVariant: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Viewer", value: "viewer" },
      ],
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    filterMeta: {
      filterVariant: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    formatter: {
      type: "badge",
      variants: {
        active: {
          label: "Active",
          className:
            "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800",
        },
        inactive: {
          label: "Inactive",
          className:
            "rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800",
        },
      },
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    formatter: { type: "currency" },
  },
];

export const ServerSide: Story = {
  name: "Server-side Mode",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fetchData = React.useCallback(makeServerFetch(PEOPLE), []);
    return (
      <DataTable
        columns={SERVER_COLUMNS}
        fetchData={fetchData}
        enableSorting
        enableColumnFilters
        enableGlobalFilter
        enablePagination
        defaultPageSize={5}
        pageSizeOptions={[5, 10]}
      />
    );
  },
};

export const ServerSideDark: Story = {
  name: "Server-side Mode (Dark)",
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fetchData = React.useCallback(makeServerFetch(PEOPLE), []);
    return (
      <div className="dark">
        <DataTable
          columns={SERVER_COLUMNS}
          fetchData={fetchData}
          enableSorting
          enableColumnFilters
          enableGlobalFilter
          enablePagination
          defaultPageSize={5}
          pageSizeOptions={[5, 10]}
        />
      </div>
    );
  },
};

export const ServerSideError: Story = {
  name: "Server-side Error State",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const fetchData = React.useCallback(
      async (_params: ServerFetchParams): Promise<ServerFetchResult<Person>> => {
        await new Promise((r) => setTimeout(r, 300));
        throw new Error("Network error: failed to fetch data.");
      },
      []
    );
    return (
      <DataTable
        columns={SERVER_COLUMNS}
        fetchData={fetchData}
        enablePagination
        defaultPageSize={5}
      />
    );
  },
};

// ─── Phase 2: Full Phase 2 ────────────────────────────────────────────────────

export const FullFeaturedPhase2: Story = {
  name: "Full Featured Phase 2",
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = React.useState<Person[]>([]);

    const allColumns: DataTableColumnDef<Person>[] = [
      { accessorKey: "name", header: "Name", pin: "left", size: 160 },
      { accessorKey: "email", header: "Email", size: 220 },
      {
        accessorKey: "role",
        header: "Role",
        formatter: {
          type: "badge",
          variants: {
            admin: { label: "Admin", className: "rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800" },
            editor: { label: "Editor", className: "rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800" },
            viewer: { label: "Viewer", className: "rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800" },
          },
        },
        filterMeta: {
          filterVariant: "select",
          options: [
            { label: "Admin", value: "admin" },
            { label: "Editor", value: "editor" },
            { label: "Viewer", value: "viewer" },
          ],
        },
      },
      {
        accessorKey: "joinDate",
        header: "Joined",
        formatter: { type: "date" },
        filterMeta: { filterVariant: "dateRange" },
      },
      {
        accessorKey: "salary",
        header: "Salary",
        formatter: { type: "currency" },
        filterMeta: { filterVariant: "numberRange" },
      },
      {
        accessorKey: "score",
        header: "Score",
        formatter: { type: "number", decimals: 0 },
      },
      {
        accessorKey: "isVerified",
        header: "Verified",
        formatter: { type: "boolean", trueLabel: "✓", falseLabel: "✗" },
      },
      {
        accessorKey: "status",
        header: "Status",
        pin: "right",
        formatter: {
          type: "badge",
          variants: {
            active: { label: "Active", className: "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800" },
            inactive: { label: "Inactive", className: "rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800" },
          },
        },
      },
    ];

    return (
      <div className="space-y-4">
        {selected.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {selected.length} selected: {selected.map((r) => r.name).join(", ")}
          </p>
        )}
        <DataTable
          columns={allColumns}
          data={PEOPLE}
          enableSorting
          enableMultiSort
          enableColumnFilters
          enableGlobalFilter
          enableRowSelection
          enableColumnVisibility
          enableExport
          enablePagination
          enableRowExpansion
          defaultPageSize={5}
          pageSizeOptions={[5, 10, 25]}
          onSelectionChange={setSelected}
          renderSubRow={(row) => (
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Email</p>
                <p>{row.email}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">ID</p>
                <p>#{row.id}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Notes</p>
                <p className="text-muted-foreground">
                  {row.isVerified ? "Account verified" : "Pending verification"}
                </p>
              </div>
            </div>
          )}
          rowActions={[
            {
              label: "Edit",
              variant: "ghost",
              onClick: (row) => alert(`Edit: ${row.name}`),
            },
          ]}
          bulkActions={[
            {
              label: "Delete selected",
              variant: "destructive",
              onClick: (rows) => alert(`Delete ${rows.length} rows`),
            },
          ]}
          exportFilename="people-phase2"
          refreshSlot={
            <Button variant="outline" size="sm" onClick={() => alert("Refresh!")}>
              ↺
            </Button>
          }
        />
      </div>
    );
  },
};

export const FullFeaturedPhase2Dark: Story = {
  name: "Full Featured Phase 2 (Dark)",
  parameters: { backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: () => {
    const allColumns: DataTableColumnDef<Person>[] = [
      { accessorKey: "name", header: "Name", pin: "left", size: 160 },
      { accessorKey: "email", header: "Email", size: 220 },
      {
        accessorKey: "role",
        header: "Role",
        formatter: {
          type: "badge",
          variants: {
            admin: { label: "Admin", className: "rounded-full bg-purple-900/40 px-2 py-0.5 text-xs font-medium text-purple-300" },
            editor: { label: "Editor", className: "rounded-full bg-blue-900/40 px-2 py-0.5 text-xs font-medium text-blue-300" },
            viewer: { label: "Viewer", className: "rounded-full bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-300" },
          },
        },
      },
      {
        accessorKey: "joinDate",
        header: "Joined",
        formatter: { type: "date" },
      },
      {
        accessorKey: "salary",
        header: "Salary",
        formatter: { type: "currency" },
      },
      {
        accessorKey: "isVerified",
        header: "Verified",
        formatter: { type: "boolean", trueLabel: "✓", falseLabel: "✗" },
      },
      {
        accessorKey: "status",
        header: "Status",
        pin: "right",
        formatter: {
          type: "badge",
          variants: {
            active: { label: "Active", className: "rounded-full bg-green-900/40 px-2 py-0.5 text-xs font-medium text-green-300" },
            inactive: { label: "Inactive", className: "rounded-full bg-red-900/40 px-2 py-0.5 text-xs font-medium text-red-300" },
          },
        },
      },
    ];

    return (
      <div className="dark">
        <DataTable
          columns={allColumns}
          data={PEOPLE}
          enableSorting
          enableColumnFilters={false}
          enableGlobalFilter
          enableRowExpansion
          enablePagination
          defaultPageSize={5}
          renderSubRow={(row) => (
            <div className="text-sm text-muted-foreground">
              {row.email} — Score: {row.score} — Salary: ${row.salary.toLocaleString()}
            </div>
          )}
        />
      </div>
    );
  },
};
