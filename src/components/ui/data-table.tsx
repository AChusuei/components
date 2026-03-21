import * as React from "react";
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type ExpandedState,
  type FilterFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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

// ─── Server-side Types ────────────────────────────────────────────────────────

export interface ServerSortParam {
  id: string;
  desc: boolean;
}

export interface ServerFilterParam {
  id: string;
  value: unknown;
}

export interface ServerFetchParams {
  /** Zero-based page index */
  page: number;
  pageSize: number;
  sorting: ServerSortParam[];
  filters: ServerFilterParam[];
  globalFilter: string;
}

export interface ServerFetchResult<TData> {
  data: TData[];
  /** Total row count across all pages (used to compute page count) */
  total: number;
}

// ─── Cell Formatter Types ─────────────────────────────────────────────────────

export type CellFormatter =
  | { type: "date"; locale?: string }
  | { type: "datetime"; locale?: string }
  | { type: "currency"; currency?: string; locale?: string }
  | { type: "number"; decimals?: number; locale?: string }
  | { type: "boolean"; trueLabel?: string; falseLabel?: string }
  | {
      type: "badge";
      variants?: Record<string, { label?: string; className?: string }>;
    };

/**
 * Format a raw cell value with a built-in formatter.
 * Can also be used standalone outside of DataTable.
 */
export function formatCellValue(
  value: unknown,
  formatter: CellFormatter
): React.ReactNode {
  if (value == null) return "—";

  switch (formatter.type) {
    case "date": {
      const d = value instanceof Date ? value : new Date(String(value));
      if (isNaN(d.getTime())) return String(value);
      return d.toLocaleDateString(formatter.locale ?? undefined);
    }
    case "datetime": {
      const d = value instanceof Date ? value : new Date(String(value));
      if (isNaN(d.getTime())) return String(value);
      return d.toLocaleString(formatter.locale ?? undefined);
    }
    case "currency": {
      const num = Number(value);
      return new Intl.NumberFormat(formatter.locale ?? undefined, {
        style: "currency",
        currency: formatter.currency ?? "USD",
      }).format(num);
    }
    case "number": {
      const num = Number(value);
      return new Intl.NumberFormat(formatter.locale ?? undefined, {
        minimumFractionDigits: formatter.decimals ?? 0,
        maximumFractionDigits: formatter.decimals ?? 0,
      }).format(num);
    }
    case "boolean": {
      const bool = Boolean(value);
      return bool ? (formatter.trueLabel ?? "Yes") : (formatter.falseLabel ?? "No");
    }
    case "badge": {
      const key = String(value);
      const variant = formatter.variants?.[key];
      const label = variant?.label ?? key;
      const className =
        variant?.className ??
        "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground";
      return <span className={className}>{label}</span>;
    }
    default:
      return String(value);
  }
}

// ─── Column Definition Extension ─────────────────────────────────────────────

export type DataTableColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  filterMeta?: FilterMeta;
  /** Pin column to the left or right edge (sticky). */
  pin?: "left" | "right";
  /**
   * Built-in cell formatter. Applied automatically when no custom `cell`
   * renderer is provided. Use `formatCellValue` for manual formatting.
   */
  formatter?: CellFormatter;
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
  /**
   * Row data (client-side mode).
   * Optional when `fetchData` is provided.
   */
  data?: TData[];
  /**
   * Async fetch function (server-side mode).
   * When provided, sorting/filtering/pagination are handled server-side.
   * Wrap in `useCallback` to keep the reference stable and avoid re-fetches.
   */
  fetchData?: (params: ServerFetchParams) => Promise<ServerFetchResult<TData>>;
  /** Loading state — shows skeleton rows */
  isLoading?: boolean;
  /** Error state — shows error message */
  error?: string | null;
  /** Empty state message */
  emptyMessage?: string;
  /** Called when a row is clicked */
  onRowClick?: (row: TData) => void;
  /** Per-row action buttons */
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
  /**
   * Enable row expansion. Requires `renderSubRow`.
   */
  enableRowExpansion?: boolean;
  /**
   * Render the expanded detail panel for a row.
   * Only used when `enableRowExpansion` is true.
   */
  renderSubRow?: (row: TData) => React.ReactNode;
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
        onChange={(e) =>
          onChange(e.target.value === "" ? undefined : e.target.value)
        }
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
            onChange([
              e.target.value !== "" ? Number(e.target.value) : undefined,
              range[1],
            ])
          }
          className="h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Min"
        />
        <input
          type="number"
          value={range[1] ?? ""}
          onChange={(e) =>
            onChange([
              range[0],
              e.target.value !== "" ? Number(e.target.value) : undefined,
            ])
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

// ─── Pinned Column Styles ─────────────────────────────────────────────────────

function getPinnedStyle<TData>(column: Column<TData>): React.CSSProperties {
  const isPinned = column.getIsPinned();
  if (!isPinned) return {};
  return {
    position: "sticky",
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    zIndex: 2,
    background: "hsl(var(--background))",
  };
}

// ─── DataTable ────────────────────────────────────────────────────────────────

export function DataTable<TData>({
  columns: columnDefs,
  data: dataProp,
  fetchData,
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
  enableRowExpansion = false,
  renderSubRow,
  className,
}: DataTableProps<TData>) {
  const isServerMode = Boolean(fetchData);

  // ─── Server-side state ─────────────────────────────────────────────────────
  const [serverData, setServerData] = React.useState<TData[]>([]);
  const [serverTotal, setServerTotal] = React.useState(0);
  const [isServerLoading, setIsServerLoading] = React.useState(isServerMode);
  const [serverError, setServerError] = React.useState<string | null>(null);

  // ─── Table state ───────────────────────────────────────────────────────────
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [visibilityOpen, setVisibilityOpen] = React.useState(false);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  // Column pinning — initialised from `pin` field in column defs
  const [columnPinning] = React.useState<ColumnPinningState>(() => {
    const left: string[] = [];
    const right: string[] = [];
    for (const col of columnDefs) {
      const id =
        (col as { accessorKey?: string }).accessorKey ?? col.id ?? "";
      if (id && col.pin === "left") left.push(id);
      if (id && col.pin === "right") right.push(id);
    }
    return { left, right };
  });

  // ─── Server-side fetch ─────────────────────────────────────────────────────
  React.useEffect(() => {
    if (!fetchData) return;

    let cancelled = false;
    setIsServerLoading(true);
    setServerError(null);

    fetchData({
      page: pagination.pageIndex,
      pageSize: pagination.pageSize,
      sorting: sorting.map((s) => ({ id: s.id, desc: s.desc })),
      filters: columnFilters.map((f) => ({ id: f.id, value: f.value })),
      globalFilter,
    })
      .then(({ data: newData, total }) => {
        if (!cancelled) {
          setServerData(newData);
          setServerTotal(total);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setServerError(
            err instanceof Error ? err.message : "Failed to load data"
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsServerLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchData, pagination.pageIndex, pagination.pageSize, sorting, columnFilters, globalFilter]);

  // ─── Build columns ─────────────────────────────────────────────────────────
  const columns = React.useMemo<ColumnDef<TData>[]>(() => {
    const cols: ColumnDef<TData>[] = [];

    // Expand toggle column
    if (enableRowExpansion && renderSubRow) {
      cols.push({
        id: "__expand__",
        header: () => null,
        cell: ({ row }) =>
          row.getCanExpand() ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                row.toggleExpanded();
              }}
              className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
              aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
            >
              <span
                aria-hidden
                className={cn(
                  "inline-block transition-transform",
                  row.getIsExpanded() && "rotate-90"
                )}
              >
                ▶
              </span>
            </button>
          ) : null,
        enableSorting: false,
        enableHiding: false,
        size: 36,
      });
    }

    // Selection column
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

    // Apply formatters to column defs that lack a custom cell renderer
    const processedDefs = columnDefs.map((col): ColumnDef<TData> => {
      if (!col.formatter || col.cell) return col as ColumnDef<TData>;
      const formatter = col.formatter;
      return {
        ...col,
        cell: ({ getValue }) => formatCellValue(getValue(), formatter),
      } as ColumnDef<TData>;
    });

    cols.push(...processedDefs);

    // Actions column
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
  }, [columnDefs, enableRowExpansion, enableRowSelection, renderSubRow, rowActions]);

  // ─── Table instance ────────────────────────────────────────────────────────
  const tableData = isServerMode ? serverData : (dataProp ?? []);
  const effectiveLoading = isLoading || isServerLoading;
  const effectiveError = error ?? serverError;

  const table = useReactTable({
    data: tableData,
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
      expanded,
      pagination,
      columnPinning,
    },
    // Server-side flags
    manualSorting: isServerMode,
    manualFiltering: isServerMode,
    manualPagination: isServerMode,
    pageCount: isServerMode
      ? Math.ceil(serverTotal / pagination.pageSize)
      : undefined,
    // Row expansion
    getRowCanExpand: () => enableRowExpansion && Boolean(renderSubRow),
    // State handlers
    enableRowSelection,
    enableMultiRowSelection: enableRowSelection,
    enableSorting,
    enableMultiSort,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    onPaginationChange: setPagination,
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(next);
      if (onSelectionChange) {
        const selected = Object.keys(next)
          .filter((key) => next[key])
          .map((key) => tableData[Number(key)]);
        onSelectionChange(selected);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: isServerMode ? undefined : getFilteredRowModel(),
    getSortedRowModel: isServerMode ? undefined : getSortedRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getExpandedRowModel: getExpandedRowModel(),
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
          <TableHead
            key={header.id}
            className="align-top"
            style={getPinnedStyle(header.column)}
          >
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

  const paginationUI = enablePagination && (
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
        {isServerMode ? (
          <span className="text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() > 0 ? table.getPageCount() : "…"}
            {serverTotal > 0 && (
              <span> &mdash; {serverTotal} total</span>
            )}
          </span>
        ) : (
          <span className="text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        )}
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
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      width:
                        header.getSize() !== 150
                          ? header.getSize()
                          : undefined,
                      ...getPinnedStyle(header.column),
                    }}
                    className={cn(
                      header.column.getIsPinned() && "shadow-[inset_-1px_0_0_0_hsl(var(--border))]"
                    )}
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
                            <span
                              aria-hidden
                              className="text-muted-foreground/40"
                            >
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
            {effectiveLoading ? (
              Array.from({ length: defaultPageSize }).map((_, i) => (
                <SkeletonRow key={i} columnCount={columns.length} />
              ))
            ) : effectiveError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-destructive"
                >
                  {effectiveError}
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
              table.getRowModel().rows.flatMap((row) => {
                const visibleCells = row.getVisibleCells();
                return [
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    onClick={
                      onRowClick ? () => onRowClick(row.original) : undefined
                    }
                    className={cn(onRowClick && "cursor-pointer")}
                  >
                    {visibleCells.map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={getPinnedStyle(cell.column)}
                        className={cn(
                          cell.column.getIsPinned() &&
                            "shadow-[inset_-1px_0_0_0_hsl(var(--border))]"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>,
                  // Expanded sub-row
                  ...(row.getIsExpanded() && renderSubRow
                    ? [
                        <TableRow
                          key={`${row.id}__expanded`}
                          className="bg-muted/30 hover:bg-muted/30"
                        >
                          <TableCell
                            colSpan={visibleCells.length}
                            className="px-4 py-3"
                          >
                            {renderSubRow(row.original)}
                          </TableCell>
                        </TableRow>,
                      ]
                    : []),
                ];
              })
            )}
          </TableBody>
        </Table>
      </div>
      {paginationUI}
    </div>
  );
}
