import type { Meta, StoryObj } from "@storybook/react";
import {
  DataTable,
  type DataTableColumnDef,
  type DataTableFetchParams,
  type DataTableFetchResult,
  createBadgeCell,
  formatDate,
  formatCurrency,
  formatNumber,
  formatBoolean,
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
}

const PEOPLE: Person[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", joinDate: "2023-01-15", score: 92 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "editor", status: "active", joinDate: "2023-03-20", score: 74 },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "viewer", status: "inactive", joinDate: "2023-05-10", score: 55 },
  { id: 4, name: "Dan Brown", email: "dan@example.com", role: "editor", status: "active", joinDate: "2023-07-01", score: 88 },
  { id: 5, name: "Eva Green", email: "eva@example.com", role: "viewer", status: "active", joinDate: "2023-09-12", score: 61 },
  { id: 6, name: "Frank Miller", email: "frank@example.com", role: "admin", status: "inactive", joinDate: "2023-11-25", score: 44 },
  { id: 7, name: "Grace Lee", email: "grace@example.com", role: "editor", status: "active", joinDate: "2024-01-08", score: 79 },
  { id: 8, name: "Henry Wilson", email: "henry@example.com", role: "viewer", status: "active", joinDate: "2024-02-14", score: 95 },
  { id: 9, name: "Iris Davis", email: "iris@example.com", role: "admin", status: "inactive", joinDate: "2024-03-30", score: 33 },
  { id: 10, name: "Jack Taylor", email: "jack@example.com", role: "editor", status: "active", joinDate: "2024-05-05", score: 68 },
  { id: 11, name: "Karen Moore", email: "karen@example.com", role: "viewer", status: "active", joinDate: "2024-06-20", score: 82 },
  { id: 12, name: "Leo Anderson", email: "leo@example.com", role: "editor", status: "inactive", joinDate: "2024-08-15", score: 51 },
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

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
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

// ─── Phase 2 Stories ──────────────────────────────────────────────────────────

// ── Cell Formatters ──────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  available: boolean;
  listedAt: string;
  updatedAt: string;
  category: "electronics" | "clothing" | "food";
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Laptop Pro", price: 1299.99, stock: 45, available: true,  listedAt: "2024-01-15", updatedAt: "2024-03-10T14:30:00Z", category: "electronics" },
  { id: 2, name: "T-Shirt XL",  price: 24.95,  stock: 200, available: true,  listedAt: "2023-11-01", updatedAt: "2024-02-28T09:15:00Z", category: "clothing" },
  { id: 3, name: "Organic Oats", price: 6.49,  stock: 0,   available: false, listedAt: "2024-02-20", updatedAt: "2024-03-18T07:00:00Z", category: "food" },
  { id: 4, name: "USB-C Hub",   price: 49.99,  stock: 12,  available: true,  listedAt: "2023-09-05", updatedAt: "2024-03-01T11:45:00Z", category: "electronics" },
];

const PRODUCT_COLUMNS: DataTableColumnDef<Product>[] = [
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => formatCurrency(getValue()),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ getValue }) => formatNumber(getValue(), { useGrouping: true }),
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ getValue }) => formatBoolean(getValue()),
  },
  {
    accessorKey: "listedAt",
    header: "Listed",
    cell: ({ getValue }) => formatDate(getValue()),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: createBadgeCell({
      values: {
        electronics: { label: "Electronics", className: "bg-blue-100 text-blue-800" },
        clothing:    { label: "Clothing",    className: "bg-purple-100 text-purple-800" },
        food:        { label: "Food",        className: "bg-green-100 text-green-800" },
      },
    }),
  },
];

export const CellFormatters: Story = {
  name: "Cell Formatters (date, currency, number, boolean, badge)",
  render: () => (
    <DataTable<Product>
      columns={PRODUCT_COLUMNS}
      data={PRODUCTS}
      enableGlobalFilter={false}
      enablePagination={false}
    />
  ),
};

// ── Row Expansion ─────────────────────────────────────────────────────────────

export const RowExpansion: Story = {
  name: "Row Expansion (sub-row detail panel)",
  render: () => (
    <DataTable<Person>
      columns={COLUMNS}
      data={PEOPLE}
      enablePagination={false}
      renderSubRow={(row) => (
        <div className="px-6 py-3 text-sm text-muted-foreground">
          <strong>ID:</strong> {row.id} &nbsp;·&nbsp;
          <strong>Email:</strong> {row.email} &nbsp;·&nbsp;
          <strong>Score:</strong> {row.score} &nbsp;·&nbsp;
          <strong>Joined:</strong> {row.joinDate}
        </div>
      )}
    />
  ),
};

// ── Pinned Columns ────────────────────────────────────────────────────────────

const PINNED_COLUMNS: DataTableColumnDef<Person>[] = [
  { accessorKey: "name",     header: "Name",      size: 160, pin: "left" },
  { accessorKey: "email",    header: "Email",     size: 220 },
  { accessorKey: "role",     header: "Role",      size: 120 },
  { accessorKey: "joinDate", header: "Join Date", size: 130 },
  { accessorKey: "score",    header: "Score",     size: 100 },
  {
    accessorKey: "status",
    header: "Status",
    size: 120,
    pin: "right",
    cell: createBadgeCell({
      values: {
        active:   { label: "Active",   className: "bg-green-100 text-green-800" },
        inactive: { label: "Inactive", className: "bg-red-100 text-red-800" },
      },
    }),
  },
];

export const PinnedColumns: Story = {
  name: "Pinned/Frozen Columns (left + right)",
  render: () => (
    <div style={{ width: 480 }}>
      <DataTable<Person>
        columns={PINNED_COLUMNS}
        data={PEOPLE}
        enablePagination={false}
        enableGlobalFilter={false}
      />
    </div>
  ),
};

// ── Server-side Mode ──────────────────────────────────────────────────────────

function simulateFetch(
  allData: Person[]
): (params: DataTableFetchParams) => Promise<DataTableFetchResult<Person>> {
  return async ({ pageIndex, pageSize, sorting, globalFilter }) => {
    await new Promise((r) => setTimeout(r, 400)); // simulate network delay

    let filtered = [...allData];

    if (globalFilter) {
      const q = globalFilter.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q)
      );
    }

    if (sorting.length > 0) {
      const { id, desc } = sorting[0];
      filtered.sort((a, b) => {
        const av = (a as Record<string, unknown>)[id];
        const bv = (b as Record<string, unknown>)[id];
        const cmp = String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true });
        return desc ? -cmp : cmp;
      });
    }

    const pageCount = Math.ceil(filtered.length / pageSize);
    const page = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    return { data: page, pageCount };
  };
}

export const ServerSideMode: Story = {
  name: "Server-side Mode (async fetch, sort, filter, paginate)",
  render: () => (
    <DataTable<Person>
      columns={COLUMNS}
      data={[]}
      fetchData={simulateFetch(PEOPLE)}
      enableSorting
      enableGlobalFilter
      enablePagination
      defaultPageSize={5}
      pageSizeOptions={[5, 10]}
    />
  ),
};

// ── Server-side Error ─────────────────────────────────────────────────────────

export const ServerSideError: Story = {
  name: "Server-side Mode — fetch error",
  render: () => (
    <DataTable<Person>
      columns={COLUMNS}
      data={[]}
      fetchData={async () => {
        await new Promise((r) => setTimeout(r, 300));
        throw new Error("Network error: failed to fetch /api/people");
      }}
    />
  ),
};
