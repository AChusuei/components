import { Accept } from 'react-dropzone';
import { ClassProp } from 'class-variance-authority/types';
import { ClassValue } from 'clsx';
import { ColumnDef } from '@tanstack/react-table';
import { DateRange } from 'react-day-picker';
import { DayPickerProps } from 'react-day-picker';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React_2 from 'react';
import { VariantProps } from 'class-variance-authority';

export declare const Button: React_2.ForwardRefExoticComponent<ButtonProps & React_2.RefAttributes<HTMLButtonElement>>;

export declare interface ButtonProps extends React_2.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

export declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & ClassProp) | undefined) => string;

export declare function Calendar({ className, classNames, showOutsideDays, ...props }: CalendarProps): JSX_2.Element;

export declare namespace Calendar {
    var displayName: string;
}

export declare type CalendarProps = DayPickerProps;

export declare type CellFormatter = {
    type: "date";
    locale?: string;
} | {
    type: "datetime";
    locale?: string;
} | {
    type: "currency";
    currency?: string;
    locale?: string;
} | {
    type: "number";
    decimals?: number;
    locale?: string;
} | {
    type: "boolean";
    trueLabel?: string;
    falseLabel?: string;
} | {
    type: "badge";
    variants?: Record<string, {
        label?: string;
        className?: string;
    }>;
};

export declare function cn(...inputs: ClassValue[]): string;

export declare function DataTable<TData>({ columns: columnDefs, data: dataProp, fetchData, isLoading, error, emptyMessage, onRowClick, rowActions, enableRowSelection, onSelectionChange, bulkActions, enableGlobalFilter, enableColumnFilters, enableSorting, enableMultiSort, enablePagination, defaultPageSize, pageSizeOptions, enableColumnVisibility, enableExport, exportFilename, refreshSlot, toolbarActionsSlot, enableRowExpansion, renderSubRow, className, }: DataTableProps<TData>): JSX_2.Element;

export declare type DataTableColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
    filterMeta?: FilterMeta;
    /** Pin column to the left or right edge (sticky). */
    pin?: "left" | "right";
    /**
     * Built-in cell formatter. Applied automatically when no custom `cell`
     * renderer is provided. Use `formatCellValue` for manual formatting.
     */
    formatter?: CellFormatter;
};

export declare interface DataTableProps<TData> {
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
    refreshSlot?: React_2.ReactNode;
    /** Slot for custom toolbar actions (rendered in toolbar) */
    toolbarActionsSlot?: React_2.ReactNode;
    /**
     * Enable row expansion. Requires `renderSubRow`.
     */
    enableRowExpansion?: boolean;
    /**
     * Render the expanded detail panel for a row.
     * Only used when `enableRowExpansion` is true.
     */
    renderSubRow?: (row: TData) => React_2.ReactNode;
    /** Additional class name for the wrapper */
    className?: string;
}

export declare interface DataTableRowAction<TData> {
    label: string;
    onClick: (row: TData) => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
    /** Hide action conditionally per row */
    hidden?: (row: TData) => boolean;
}

/**
 * Single-date picker built on react-day-picker.
 *
 * Features:
 * - Year/month dropdown navigation (no 360-click problem)
 * - Timezone support via `timeZone` prop
 * - react-hook-form compatible (`value` / `onChange`)
 * - Works correctly inside Dialog / Modal via Radix Portal
 */
export declare function DatePicker({ value, onChange, placeholder, disabled, className, timeZone, fromYear, toYear, }: DatePickerProps): JSX_2.Element;

/**
 * Props common to all date-picker variants.
 * Compatible with react-hook-form's `Controller` (value/onChange).
 */
declare interface DatePickerBaseProps {
    /** Placeholder text shown when no date is selected. */
    placeholder?: string;
    /** Disables the picker trigger. */
    disabled?: boolean;
    /** Optional class name applied to the trigger button. */
    className?: string;
    /** IANA timezone string (e.g. "America/New_York"). Passed to react-day-picker. */
    timeZone?: string;
    /** Year range start for the dropdown navigator. Defaults to current year − 80. */
    fromYear?: number;
    /** Year range end for the dropdown navigator. Defaults to current year + 10. */
    toYear?: number;
}

export declare interface DatePickerProps extends DatePickerBaseProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
}

export { DateRange }

export declare interface DateRangeFilterMeta {
    filterVariant: "dateRange";
}

/**
 * Date range picker with quick-select presets.
 *
 * Features (all from DatePicker, plus):
 * - Dual-calendar range selection
 * - Configurable preset buttons (Today, Last 7 days, etc.)
 */
export declare function DateRangePicker({ value, onChange, placeholder, disabled, className, timeZone, fromYear, toYear, presets, numberOfMonths, }: DateRangePickerProps): JSX_2.Element;

export declare interface DateRangePickerProps extends DatePickerBaseProps {
    value?: DateRange;
    onChange?: (range: DateRange | undefined) => void;
    /** Preset ranges to display. Defaults to `getDefaultPresets()`. */
    presets?: DateRangePreset[];
    /** Number of calendar months shown side-by-side. Defaults to 2. */
    numberOfMonths?: number;
}

/** A named preset range (e.g. "Last 7 days"). */
export declare interface DateRangePreset {
    label: string;
    range: () => DateRange;
}

/**
 * Combined date + time picker.
 * Time is selected via native `<input type="time">` inside the popover.
 *
 * Features (all from DatePicker, plus):
 * - Hour / minute selection without leaving the popover
 */
export declare function DateTimePicker({ value, onChange, placeholder, disabled, className, timeZone, fromYear, toYear, }: DateTimePickerProps): JSX_2.Element;

export declare interface DateTimePickerProps extends DatePickerBaseProps {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
}

export declare function FileUpload({ multiple, accept, maxSize, onUpload, onChange, value, className, disabled, }: FileUploadProps): JSX_2.Element;

export declare interface FileUploadProps {
    /** Allow multiple file selection */
    multiple?: boolean;
    /** react-dropzone accept map, e.g. { "image/*": [".png", ".jpg"] } */
    accept?: Accept;
    /** Maximum file size in bytes */
    maxSize?: number;
    /** Upload transport — consumer supplies this */
    onUpload?: UploadFn;
    /** Called whenever the internal file list changes */
    onChange?: (files: UploadFile[]) => void;
    /** Controlled file list — use with onChange for full control */
    value?: UploadFile[];
    /** Additional class on the root element */
    className?: string;
    /** Disable the entire widget */
    disabled?: boolean;
}

export declare type FileUploadStatus = "idle" | "uploading" | "success" | "error";

export declare type FilterMeta = TextFilterMeta | SelectFilterMeta | DateRangeFilterMeta | NumberRangeFilterMeta;

/**
 * Format a raw cell value with a built-in formatter.
 * Can also be used standalone outside of DataTable.
 */
export declare function formatCellValue(value: unknown, formatter: CellFormatter): React_2.ReactNode;

/** Built-in presets for DateRangePicker. */
export declare function getDefaultPresets(): DateRangePreset[];

export declare const Loader: React_2.ForwardRefExoticComponent<LoaderProps & React_2.RefAttributes<HTMLDivElement>>;

export declare interface LoaderProps extends SpinnerProps {
    overlay?: boolean;
}

export declare interface NumberRangeFilterMeta {
    filterVariant: "numberRange";
}

export declare const Popover: any;

export declare const PopoverAnchor: any;

export declare const PopoverContent: React_2.ForwardRefExoticComponent<any>;

export declare const PopoverTrigger: any;

export declare const Progress: React_2.ForwardRefExoticComponent<Omit<ProgressPrimitive.ProgressProps & React_2.RefAttributes<HTMLDivElement>, "ref"> & React_2.RefAttributes<HTMLDivElement>>;

export declare interface SelectFilterMeta {
    filterVariant: "select";
    options: {
        label: string;
        value: string;
    }[];
}

export declare interface ServerFetchParams {
    /** Zero-based page index */
    page: number;
    pageSize: number;
    sorting: ServerSortParam[];
    filters: ServerFilterParam[];
    globalFilter: string;
}

export declare interface ServerFetchResult<TData> {
    data: TData[];
    /** Total row count across all pages (used to compute page count) */
    total: number;
}

export declare interface ServerFilterParam {
    id: string;
    value: unknown;
}

export declare interface ServerSortParam {
    id: string;
    desc: boolean;
}

export declare const Spinner: React_2.ForwardRefExoticComponent<SpinnerProps & React_2.RefAttributes<HTMLDivElement>>;

export declare interface SpinnerProps extends Omit<React_2.HTMLAttributes<HTMLDivElement>, "color">, VariantProps<typeof spinnerVariants> {
    label?: string;
}

export declare const spinnerVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    color?: "destructive" | "secondary" | "inherit" | "primary" | "muted" | "white" | null | undefined;
} & ClassProp) | undefined) => string;

export declare const Table: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableElement> & React_2.RefAttributes<HTMLTableElement>>;

export declare const TableBody: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableSectionElement> & React_2.RefAttributes<HTMLTableSectionElement>>;

export declare const TableCaption: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableCaptionElement> & React_2.RefAttributes<HTMLTableCaptionElement>>;

export declare const TableCell: React_2.ForwardRefExoticComponent<React_2.TdHTMLAttributes<HTMLTableCellElement> & React_2.RefAttributes<HTMLTableCellElement>>;

export declare const TableFooter: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableSectionElement> & React_2.RefAttributes<HTMLTableSectionElement>>;

export declare const TableHead: React_2.ForwardRefExoticComponent<React_2.ThHTMLAttributes<HTMLTableCellElement> & React_2.RefAttributes<HTMLTableCellElement>>;

export declare const TableHeader: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableSectionElement> & React_2.RefAttributes<HTMLTableSectionElement>>;

export declare const TableRow: React_2.ForwardRefExoticComponent<React_2.HTMLAttributes<HTMLTableRowElement> & React_2.RefAttributes<HTMLTableRowElement>>;

export declare interface TextFilterMeta {
    filterVariant: "text";
}

export declare type Theme = "dark" | "light" | "system";

export declare function ThemeProvider({ children, defaultTheme, storageKey, }: ThemeProviderProps): JSX_2.Element;

declare interface ThemeProviderProps {
    children: React_2.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

declare interface ThemeProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export declare interface UploadFile {
    /** Stable ID for the file entry */
    id: string;
    file: File;
    preview?: string;
    progress: number;
    status: FileUploadStatus;
    error?: string;
}

export declare type UploadFn = (file: File, onProgress: (pct: number) => void) => Promise<void>;

export declare function useTheme(): ThemeProviderState;

export { }
