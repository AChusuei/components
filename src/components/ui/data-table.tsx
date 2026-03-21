import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  type FilterFn,
  type Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// ─── Filter Types ────────────────────────────────────────────────────────────

export interface TextFilterMeta {
  filterVariant: "text";
}

export interface SelectFilterMeta {
  filterVariant: "select";
  options: { label: string; value: string }[];
}

export interface DateRangeFilterMeta {
  filterVariant: "dateRange";
}

export interface NumberRangeFilterMeta {
  filterVariant: "numberRange";
}

export type FilterMeta =
  | TextFilterMeta
  | SelectFilterMeta
  | DateRangeFilterMeta
  | NumberRangeFilterMeta;

// ─── Column Definition Extension ─────────────────────────────────────────────

export type DataTableColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  filterMeta?: FilterMeta;
};

// ─── Row Action ──────────────────────────────────────────────────────────────

export interface DataTableRowAction<TData> {
  label: string;
  onClick: (row: TData) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  /** Hide action conditionally per row */
  hidden?: (row: TData) => boolean;
}

// ─── DataTable Props ─────────────────────────────────────────────────────────

export interface DataTableProps<TData> {
  /** Column definitions */
  columns: DataTableColumnDef<TData>[];
  /** Row data */
  data: TData[];
  /** Loading state — shows skeleton rows */
  isLoading?: boolean;
  /** Error state — shows error message */
  error?: string | null;
  /** Empty state message */
  emptyMessage?: string;
  /** Called when a row is clicked */
  onRowClick?: (row: TData) => void;
  /** Per-row action buttons or context menu items */
  rowActions?: DataTableRowAction<TData>[];
  /** Show row selection checkboxes */
  enableRowSelection?: boolean;
  /** Called when selection changes */
  onSelectionChange?: (selectedRows: TData[]) => void;
  /** Bulk actions shown when rows are selected */
  bulkActions?: DataTableRowAction<TData[]>[];
  /** Enable global search */
  enableGlobalFilter?: boolean;
  /** Enable per-column filters */
  enableColumnFilters?: boolean;
  /** Enable sorting */
  enableSorting?: boolean;
  /** Enable multi-column sorting */
  enableMultiSort?: boolean;
  /** Enable pagination */
  enablePagination?: boolean;
  /** Default page size */
  defaultPageSize?: number;
  /** Available page sizes */
  pageSizeOptions?: number[];
  /** Enable column visibility toggle */
  enableColumnVisibility?: boolean;
  /** Enable CSV export */
  enableExport?: boolean;
  /** Filename for CSV export (without extension) */
  exportFilename?: string;
  /** Slot for a refresh button (rendered in toolbar) */
  refreshSlot?: React.ReactNode;
  /** Slot for custom toolbar actions (rendered in toolbar) */
  toolbarActionsSlot?: React.ReactNode;
  /** Additional class name for the wrapper */
  className?: string;
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────

function SkeletonRow({ columnCount }: { columnCount: number }) {
  return (
    <TableRow>
      {Array.from({ length: columnCount }).map((_, i) => (
        <TableCell key={i}>
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
        </TableCell>
      ))}
    </TableRow>
  );
}

// ─── Column Filter Input ──────────────────────────────────────────────────────

interface ColumnFilterInputProps {
  columnId: string;
  filterMeta?: FilterMeta;
  value: unknown;
  onChange: (value: unknown) => void;
}

function ColumnFilterInput({
  filterMeta,
  value,
  onChange,
}: ColumnFilterInputProps) {
  if (!filterMeta) return null;

  if (filterMeta.filterVariant === "select") {
    return (
      <select
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value === "" ? undefined : e.target.value)}
        className="mt-1 h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
      >
        <option value="">All</option>
        {filterMeta.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (filterMeta.filterVariant === "dateRange") {
    const range = (value as [string?, string?]) ?? [undefined, undefined];
    return (
      <div className="mt-1 flex flex-col gap-1">
        <input
          type="date"
          value={range[0] ?? ""}
          onChange={(e) => onChange([e.target.value || undefined, range[1]])}
          className="h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="From"
        />
        <input
          type="date"
          value={range[1] ?? ""}
          onChange={(e) => onChange([range[0], e.target.value || undefined])}
          className="h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="To"
        />
      </div>
    );
  }

  if (filterMeta.filterVariant === "numberRange") {
    const range = (value as [number?, number?]) ?? [undefined, undefined];
    return (
      <div className="mt-1 flex flex-col gap-1">
        <input
          type="number"
          value={range[0] ?? ""}
          onChange={(e) =>
            onChange([e.target.value !== "" ? Number(e.target.value) : undefined, range[1]])
          }
          className="h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Min"
        />
        <input
          type="number"
          value={range[1] ?? ""}
          onChange={(e) =>
            onChange([range[0], e.target.value !== "" ? Number(e.target.value) : undefined])
          }
          className="h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Max"
        />
      </div>
    );
  }

  // default: text
  return (
    <input
      type="text"
      value={(value as string) ?? ""}
      onChange={(e) => onChange(e.target.value || undefined)}
      className="mt-1 h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
      placeholder="Filter…"
    />
  );
}

// ─── Custom Filter Functions ──────────────────────────────────────────────────

const dateRangeFilter: FilterFn<unknown> = (row, columnId, value) => {
  const [from, to] = value as [string?, string?];
  const cellValue = row.getValue<string>(columnId);
  if (!cellValue) return true;
  if (from && cellValue < from) return false;
  if (to && cellValue > to) return false;
  return true;
};
dateRangeFilter.autoRemove = (val) => {
  const [from, to] = val as [string?, string?];
  return !from && !to;
};

const numberRangeFilter: FilterFn<unknown> = (row, columnId, value) => {
  const [min, max] = value as [number?, number?];
  const cellValue = row.getValue<number>(columnId);
  if (min !== undefined && cellValue < min) return false;
  if (max !== undefined && cellValue > max) return false;
  return true;
};
numberRangeFilter.autoRemove = (val) => {
  const [min, max] = val as [number?, number?];
  return min === undefined && max === undefined;
};

// ─── CSV Export ───────────────────────────────────────────────────────────────

function exportToCsv<TData>(
  rows: Row<TData>[],
  columns: DataTableColumnDef<TData>[],
  filename: string
) {
  const visibleColumns = columns.filter(
    (col) => col.id !== "__select__" && col.id !== "__actions__"
  );

  const headers = visibleColumns.map((col) => {
    if (typeof col.header === "string") return col.header;
    return (col as { accessorKey?: string }).accessorKey ?? col.id ?? "";
  });

  const csvRows = rows.map((row) =>
    visibleColumns.map((col) => {
      const key =
        (col as { accessorKey?: string }).accessorKey ?? col.id ?? "";
      const val = row.getValue(key);
      const str = val == null ? "" : String(val);
      return str.includes(",") || str.includes('"') || str.includes("\n")
        ? `"${str.replace(/"/g, '""')}"`
        : str;
    })
  );

  const csv = [headers, ...csvRows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ─── DataTable ────────────────────────────────────────────────────────────────

export function DataTable<TData>({
  columns: columnDefs,
  data,
  isLoading = false,
  error = null,
  emptyMessage = "No results.",
  onRowClick,
  rowActions,
  enableRowSelection = false,
  onSelectionChange,
  bulkActions,
  enableGlobalFilter = true,
  enableColumnFilters = false,
  enableSorting = true,
  enableMultiSort = false,
  enablePagination = true,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  enableColumnVisibility = true,
  enableExport = false,
  exportFilename = "export",
  refreshSlot,
  toolbarActionsSlot,
  className,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [visibilityOpen, setVisibilityOpen] = React.useState(false);

  // Build columns: prepend selection column, append actions column if needed
  const columns = React.useMemo<ColumnDef<TData>[]>(() => {
    const cols: ColumnDef<TData>[] = [];

    if (enableRowSelection) {
      cols.push({
        id: "__select__",
        header: ({ table }) => (
          <input
            type="checkbox"
            role="checkbox"
            aria-label="Select all"
            checked={table.getIsAllPageRowsSelected()}
            ref={(el) => {
              if (el) {
                el.indeterminate =
                  table.getIsSomePageRowsSelected() &&
                  !table.getIsAllPageRowsSelected();
              }
            }}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="h-4 w-4 cursor-pointer"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            role="checkbox"
            aria-label="Select row"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            onClick={(e) => e.stopPropagation()}
            className="h-4 w-4 cursor-pointer"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      });
    }

    cols.push(...(columnDefs as ColumnDef<TData>[]));

    if (rowActions && rowActions.length > 0) {
      cols.push({
        id: "__actions__",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            {rowActions.map((action) => {
              if (action.hidden?.(row.original)) return null;
              return (
                <Button
                  key={action.label}
                  variant={action.variant ?? "ghost"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick(row.original);
                  }}
                >
                  {action.label}
                </Button>
              );
            })}
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    return cols;
  }, [columnDefs, enableRowSelection, rowActions]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      dateRange: dateRangeFilter as FilterFn<TData>,
      numberRange: numberRangeFilter as FilterFn<TData>,
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection,
    enableMultiRowSelection: enableRowSelection,
    enableSorting,
    enableMultiSort,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(next);
      if (onSelectionChange) {
        const selected = Object.keys(next)
          .filter((key) => next[key])
          .map((key) => data[Number(key)]);
        onSelectionChange(selected);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    initialState: {
      pagination: { pageSize: defaultPageSize },
    },
  });

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((r) => r.original);

  // ─── Toolbar ────────────────────────────────────────────────────────────────

  const toolbar = (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {enableGlobalFilter && (
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search…"
            className="h-9 w-48 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        )}
        {enableRowSelection &&
          selectedRows.length > 0 &&
          bulkActions &&
          bulkActions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant ?? "outline"}
              size="sm"
              onClick={() => action.onClick(selectedRows)}
            >
              {action.label} ({selectedRows.length})
            </Button>
          ))}
      </div>
      <div className="flex items-center gap-2">
        {toolbarActionsSlot}
        {enableExport && (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              exportToCsv(
                table.getFilteredRowModel().rows,
                columnDefs,
                exportFilename
              )
            }
          >
            Export CSV
          </Button>
        )}
        {enableColumnVisibility && (
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVisibilityOpen((v) => !v)}
            >
              Columns
            </Button>
            {visibilityOpen && (
              <div className="absolute right-0 top-10 z-50 min-w-[160px] rounded-md border bg-background p-2 shadow-md">
                {table
                  .getAllLeafColumns()
                  .filter((col) => col.getCanHide())
                  .map((col) => (
                    <label
                      key={col.id}
                      className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-muted"
                    >
                      <input
                        type="checkbox"
                        checked={col.getIsVisible()}
                        onChange={col.getToggleVisibilityHandler()}
                        className="h-4 w-4"
                      />
                      {typeof col.columnDef.header === "string"
                        ? col.columnDef.header
                        : col.id}
                    </label>
                  ))}
              </div>
            )}
          </div>
        )}
        {refreshSlot}
      </div>
    </div>
  );

  // ─── Column Filter Row ───────────────────────────────────────────────────────

  const columnFilterRow = enableColumnFilters && (
    <TableRow>
      {table.getFlatHeaders().map((header) => {
        const colDef = header.column.columnDef as DataTableColumnDef<TData>;
        return (
          <TableHead key={header.id} className="align-top">
            {header.isPlaceholder ? null : (
              <ColumnFilterInput
                columnId={header.column.id}
                filterMeta={colDef.filterMeta}
                value={header.column.getFilterValue()}
                onChange={(val) => header.column.setFilterValue(val)}
              />
            )}
          </TableHead>
        );
      })}
    </TableRow>
  );

  // ─── Pagination ───────────────────────────────────────────────────────────────

  const pagination = enablePagination && (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Rows per page:</span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="h-8 rounded border border-input bg-background px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          «
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          ‹
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          ›
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          »
        </Button>
      </div>
    </div>
  );

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className={cn("space-y-2", className)}>
      {toolbar}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex select-none items-center gap-1",
                          header.column.getCanSort() &&
                            "cursor-pointer hover:text-foreground"
                        )}
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" && (
                          <span aria-hidden>↑</span>
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <span aria-hidden>↓</span>
                        )}
                        {header.column.getIsSorted() === false &&
                          header.column.getCanSort() && (
                            <span aria-hidden className="text-muted-foreground/40">
                              ↕
                            </span>
                          )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
            {columnFilterRow}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: defaultPageSize }).map((_, i) => (
                <SkeletonRow key={i} columnCount={columns.length} />
              ))
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-destructive"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {pagination}
    </div>
  );
}
