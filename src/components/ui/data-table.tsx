import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  type FilterFn,
  type Row,
  type ColumnPinningState,
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
  /** Pin column to "left" or "right" edge (sticky/frozen) */
  pin?: "left" | "right";
};

// ─── Row Action ──────────────────────────────────────────────────────────────

export interface DataTableRowAction<TData> {
  label: string;
  onClick: (row: TData) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  /** Hide action conditionally per row */
  hidden?: (row: TData) => boolean;
}

// ─── Server-side Fetch API ────────────────────────────────────────────────────

export interface DataTableFetchParams {
  pageIndex: number;
  pageSize: number;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
}

export interface DataTableFetchResult<TData> {
  data: TData[];
  /** Total number of pages for pagination */
  pageCount: number;
}

// ─── Cell Formatters ──────────────────────────────────────────────────────────

/** Format an ISO date string or Date as a locale date (e.g. "Jan 15, 2024") */
export function formatDate(value: unknown, locale = "en-US"): string {
  if (value == null || value === "") return "—";
  const d = value instanceof Date ? value : new Date(String(value));
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

/** Format an ISO date-time string or Date as a locale date + time */
export function formatDateTime(value: unknown, locale = "en-US"): string {
  if (value == null || value === "") return "—";
  const d = value instanceof Date ? value : new Date(String(value));
  if (isNaN(d.getTime())) return String(value);
  return d.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Format a number as currency (e.g. "$1,234.56") */
export function formatCurrency(
  value: unknown,
  currency = "USD",
  locale = "en-US"
): string {
  if (value == null || value === "") return "—";
  const n = Number(value);
  if (isNaN(n)) return String(value);
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);
}

/** Format a number with optional Intl options */
export function formatNumber(
  value: unknown,
  options?: Intl.NumberFormatOptions,
  locale = "en-US"
): string {
  if (value == null || value === "") return "—";
  const n = Number(value);
  if (isNaN(n)) return String(value);
  return new Intl.NumberFormat(locale, options).format(n);
}

/** Format a boolean as Yes/No (or custom labels) */
export function formatBoolean(
  value: unknown,
  trueLabel = "Yes",
  falseLabel = "No"
): string {
  if (value == null) return "—";
  return value ? trueLabel : falseLabel;
}

/** Config for badge/status cell */
export interface BadgeCellConfig {
  /** Map of raw value → display config */
  values: Record<string, { label?: string; className: string }>;
  /** Fallback config for values not in the map */
  fallback?: { label?: string; className: string };
}

/**
 * Factory that creates a TanStack cell renderer for badge/status values.
 *
 * @example
 * ```tsx
 * {
 *   accessorKey: "status",
 *   header: "Status",
 *   cell: createBadgeCell({
 *     values: {
 *       active: { label: "Active", className: "bg-green-100 text-green-800" },
 *       inactive: { label: "Inactive", className: "bg-red-100 text-red-800" },
 *     },
 *   }),
 * }
 * ```
 */
export function createBadgeCell<TData>(
  config: BadgeCellConfig
): ColumnDef<TData>["cell"] {
  return ({ getValue }) => {
    const value = String(getValue() ?? "");
    const cfg = config.values[value] ?? config.fallback;
    if (!cfg) return value;
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
          cfg.className
        )}
      >
        {cfg.label ?? value}
      </span>
    );
  };
}

// ─── DataTable Props ─────────────────────────────────────────────────────────

export interface DataTableProps<TData> {
  /** Column definitions */
  columns: DataTableColumnDef<TData>[];
  /**
   * Row data (client-side mode).
   * Ignored when `fetchData` is provided (server-side mode).
   */
  data: TData[];
  /** Loading state — shows skeleton rows (client-side mode) */
  isLoading?: boolean;
  /** Error state — shows error message (client-side mode) */
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
  /** Additional class name for the wrapper */
  className?: string;

  // ── Phase 2 additions ──────────────────────────────────────────────────────

  /**
   * Async data fetcher for server-side mode.
   * When provided, the component manages sorting/filtering/pagination server-side.
   * The `data` prop is ignored in this mode.
   */
  fetchData?: (
    params: DataTableFetchParams
  ) => Promise<DataTableFetchResult<TData>>;

  /**
   * Render a collapsible detail panel beneath a row.
   * When provided, an expand toggle is added to each row.
   *
   * @example
   * ```tsx
   * renderSubRow={(row) => <div className="p-4">{row.description}</div>}
   * ```
   */
  renderSubRow?: (row: TData) => React.ReactNode;
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
    (col) => col.id !== "__select__" && col.id !== "__actions__" && col.id !== "__expand__"
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

// ─── Pinned Column Style Helpers ─────────────────────────────────────────────

function getPinnedStyle(
  isPinned: "left" | "right" | false,
  leftOffset: number,
  rightOffset: number
): React.CSSProperties {
  if (!isPinned) return {};
  return {
    position: "sticky",
    left: isPinned === "left" ? leftOffset : undefined,
    right: isPinned === "right" ? rightOffset : undefined,
    zIndex: 1,
  };
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
  fetchData,
  renderSubRow,
}: DataTableProps<TData>) {
  const isServerMode = !!fetchData;

  // ── Server-side state ────────────────────────────────────────────────────

  const [serverData, setServerData] = React.useState<TData[]>([]);
  const [serverPageCount, setServerPageCount] = React.useState(0);
  const [serverLoading, setServerLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  // ── Table state ──────────────────────────────────────────────────────────

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [visibilityOpen, setVisibilityOpen] = React.useState(false);

  // Controlled pagination state for server-side mode (and client-side too for uniformity)
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  // ── Row expansion state ──────────────────────────────────────────────────

  const [expandedRowIds, setExpandedRowIds] = React.useState<Set<string>>(
    new Set()
  );

  const toggleRowExpanded = React.useCallback((rowId: string) => {
    setExpandedRowIds((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  }, []);

  // ── Column pinning state ─────────────────────────────────────────────────

  const initialPinning = React.useMemo<ColumnPinningState>(() => {
    const left: string[] = [];
    const right: string[] = [];
    for (const col of columnDefs) {
      const id = (col as { accessorKey?: string }).accessorKey ?? col.id;
      if (id) {
        if (col.pin === "left") left.push(id);
        if (col.pin === "right") right.push(id);
      }
    }
    return { left, right };
  }, [columnDefs]);

  const [columnPinning] = React.useState<ColumnPinningState>(initialPinning);
  const hasPinnedColumns =
    (columnPinning.left?.length ?? 0) > 0 ||
    (columnPinning.right?.length ?? 0) > 0;

  // ── Build column list ────────────────────────────────────────────────────

  const columns = React.useMemo<ColumnDef<TData>[]>(() => {
    const cols: ColumnDef<TData>[] = [];

    // Expand toggle column (leftmost)
    if (renderSubRow) {
      cols.push({
        id: "__expand__",
        header: "",
        cell: ({ row }) => (
          <button
            aria-label={expandedRowIds.has(row.id) ? "Collapse row" : "Expand row"}
            onClick={(e) => {
              e.stopPropagation();
              toggleRowExpanded(row.id);
            }}
            className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {expandedRowIds.has(row.id) ? "▾" : "▸"}
          </button>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 36,
      });
    }

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
  }, [columnDefs, enableRowSelection, rowActions, renderSubRow, expandedRowIds, toggleRowExpanded]);

  // ── Table instance ───────────────────────────────────────────────────────

  const effectiveData = isServerMode ? serverData : data;

  const table = useReactTable({
    data: effectiveData,
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
      columnPinning,
      pagination,
    },
    // Server-side mode: disable client-side processing
    manualSorting: isServerMode,
    manualFiltering: isServerMode,
    manualPagination: isServerMode,
    pageCount: isServerMode ? serverPageCount : undefined,
    enableRowSelection,
    enableMultiRowSelection: enableRowSelection,
    enableSorting,
    enableMultiSort,
    enableColumnPinning: hasPinnedColumns,
    onSortingChange: (updater) => {
      setSorting(updater);
      // Reset to first page on sort change
      if (isServerMode) setPagination((p) => ({ ...p, pageIndex: 0 }));
    },
    onColumnFiltersChange: (updater) => {
      setColumnFilters(updater);
      if (isServerMode) setPagination((p) => ({ ...p, pageIndex: 0 }));
    },
    onGlobalFilterChange: (updater) => {
      setGlobalFilter(updater);
      if (isServerMode) setPagination((p) => ({ ...p, pageIndex: 0 }));
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(next);
      if (onSelectionChange) {
        const selected = Object.keys(next)
          .filter((key) => next[key])
          .map((key) => effectiveData[Number(key)]);
        onSelectionChange(selected);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: isServerMode ? undefined : getFilteredRowModel(),
    getSortedRowModel: isServerMode ? undefined : getSortedRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
  });

  // ── Server-side fetch effect ─────────────────────────────────────────────

  React.useEffect(() => {
    if (!fetchData) return;
    let cancelled = false;

    setServerLoading(true);
    setServerError(null);

    fetchData({
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      sorting,
      columnFilters,
      globalFilter,
    })
      .then((result) => {
        if (!cancelled) {
          setServerData(result.data);
          setServerPageCount(result.pageCount);
          setServerLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const msg =
            err instanceof Error ? err.message : "Failed to load data";
          setServerError(msg);
          setServerLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, pagination.pageIndex, pagination.pageSize, sorting, columnFilters, globalFilter]);

  const effectiveLoading = isServerMode ? serverLoading : isLoading;
  const effectiveError = isServerMode ? serverError : error;

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((r) => r.original);

  // ── Toolbar ──────────────────────────────────────────────────────────────

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

  // ── Column Filter Row ─────────────────────────────────────────────────────

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

  // ── Pagination ────────────────────────────────────────────────────────────

  const paginationRow = enablePagination && (
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

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={cn("space-y-2", className)}>
      {toolbar}
      <div className={cn("rounded-md border", hasPinnedColumns && "overflow-x-auto")}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isPinned = header.column.getIsPinned();
                  const pinnedStyle = isPinned
                    ? getPinnedStyle(
                        isPinned,
                        header.column.getStart("left"),
                        header.column.getAfter("right")
                      )
                    : {};
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        width:
                          header.getSize() !== 150
                            ? header.getSize()
                            : undefined,
                        ...pinnedStyle,
                      }}
                      className={cn(
                        isPinned && "bg-background",
                        isPinned === "left" && "shadow-[inset_-1px_0_0_hsl(var(--border))]",
                        isPinned === "right" && "shadow-[inset_1px_0_0_hsl(var(--border))]"
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
                              <span aria-hidden className="text-muted-foreground/40">
                                ↕
                              </span>
                            )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
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
                const isExpanded = expandedRowIds.has(row.id);
                return [
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                    className={cn(onRowClick && "cursor-pointer")}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isPinned = cell.column.getIsPinned();
                      const pinnedStyle = isPinned
                        ? getPinnedStyle(
                            isPinned,
                            cell.column.getStart("left"),
                            cell.column.getAfter("right")
                          )
                        : {};
                      return (
                        <TableCell
                          key={cell.id}
                          style={pinnedStyle}
                          className={cn(
                            isPinned && "bg-background",
                            isPinned === "left" &&
                              "shadow-[inset_-1px_0_0_hsl(var(--border))]",
                            isPinned === "right" &&
                              "shadow-[inset_1px_0_0_hsl(var(--border))]"
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>,
                  isExpanded && renderSubRow ? (
                    <TableRow key={`${row.id}__sub`} className="bg-muted/30">
                      <TableCell colSpan={columns.length} className="p-0">
                        {renderSubRow(row.original)}
                      </TableCell>
                    </TableRow>
                  ) : null,
                ].filter(Boolean) as React.ReactElement[];
              })
            )}
          </TableBody>
        </Table>
      </div>
      {paginationRow}
    </div>
  );
}
