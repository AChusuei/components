import { clsx as Be } from "clsx";
import { twMerge as Oe } from "tailwind-merge";
import { jsx as t, jsxs as c, Fragment as We } from "react/jsx-runtime";
import * as d from "react";
import { Slot as Ge } from "@radix-ui/react-slot";
import { cva as he } from "class-variance-authority";
import { useReactTable as Ke, getExpandedRowModel as Xe, getPaginationRowModel as qe, getSortedRowModel as Je, getFilteredRowModel as Qe, getCoreRowModel as Ze, flexRender as me } from "@tanstack/react-table";
import * as ee from "@radix-ui/react-progress";
import { useDropzone as et } from "react-dropzone";
import { UploadCloudIcon as tt, CheckCircleIcon as rt, AlertCircleIcon as nt, XIcon as ot, FileVideoIcon as at, FileAudioIcon as st, FileArchiveIcon as it, FileCodeIcon as lt, FileTextIcon as ct, FileIcon as dt, ChevronLeft as ut, ChevronRight as mt, CalendarIcon as ne, Clock as gt } from "lucide-react";
import * as V from "@radix-ui/react-popover";
import { DayPicker as ft } from "react-day-picker";
import { format as $, setMinutes as ge, setHours as fe } from "date-fns";
function m(...e) {
  return Oe(Be(e));
}
const pt = he(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), k = d.forwardRef(
  ({ className: e, variant: n, size: r, asChild: o = !1, ...s }, u) => /* @__PURE__ */ t(
    o ? Ge : "button",
    {
      className: m(pt({ variant: n, size: r, className: e })),
      ref: u,
      ...s
    }
  )
);
k.displayName = "Button";
const ht = he(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12"
      },
      color: {
        inherit: "text-current",
        primary: "text-primary",
        secondary: "text-secondary-foreground",
        destructive: "text-destructive",
        muted: "text-muted-foreground",
        white: "text-white"
      }
    },
    defaultVariants: {
      size: "md",
      color: "inherit"
    }
  }
), te = d.forwardRef(
  ({ className: e, size: n, color: r, label: o = "Loading...", ...s }, u) => /* @__PURE__ */ t(
    "div",
    {
      ref: u,
      role: "status",
      "aria-label": o,
      className: m(ht({ size: n, color: r }), e),
      ...s,
      children: /* @__PURE__ */ t("span", { className: "sr-only", children: o })
    }
  )
);
te.displayName = "Spinner";
const bt = d.forwardRef(
  ({ overlay: e = !1, className: n, ...r }, o) => e ? /* @__PURE__ */ t(
    "div",
    {
      className: "absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
      "aria-live": "polite",
      children: /* @__PURE__ */ t(te, { ref: o, className: n, ...r })
    }
  ) : /* @__PURE__ */ t(te, { ref: o, className: n, ...r })
);
bt.displayName = "Loader";
const be = d.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ t(
  "table",
  {
    ref: r,
    className: m("w-full caption-bottom text-sm", e),
    ...n
  }
) }));
be.displayName = "Table";
const xe = d.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t("thead", { ref: r, className: m("[&_tr]:border-b", e), ...n }));
xe.displayName = "TableHeader";
const ve = d.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "tbody",
  {
    ref: r,
    className: m("[&_tr:last-child]:border-0", e),
    ...n
  }
));
ve.displayName = "TableBody";
const xt = d.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "tfoot",
  {
    ref: r,
    className: m(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      e
    ),
    ...n
  }
));
xt.displayName = "TableFooter";
const M = d.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "tr",
  {
    ref: r,
    className: m(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      e
    ),
    ...n
  }
));
M.displayName = "TableRow";
const re = d.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "th",
  {
    ref: r,
    className: m(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...n
  }
));
re.displayName = "TableHead";
const E = d.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "td",
  {
    ref: r,
    className: m(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...n
  }
));
E.displayName = "TableCell";
const vt = d.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "caption",
  {
    ref: r,
    className: m("mt-4 text-sm text-muted-foreground", e),
    ...n
  }
));
vt.displayName = "TableCaption";
function wt(e, n) {
  var r;
  if (e == null) return "—";
  switch (n.type) {
    case "date": {
      const o = e instanceof Date ? e : new Date(String(e));
      return isNaN(o.getTime()) ? String(e) : o.toLocaleDateString(n.locale ?? void 0);
    }
    case "datetime": {
      const o = e instanceof Date ? e : new Date(String(e));
      return isNaN(o.getTime()) ? String(e) : o.toLocaleString(n.locale ?? void 0);
    }
    case "currency": {
      const o = Number(e);
      return new Intl.NumberFormat(n.locale ?? void 0, {
        style: "currency",
        currency: n.currency ?? "USD"
      }).format(o);
    }
    case "number": {
      const o = Number(e);
      return new Intl.NumberFormat(n.locale ?? void 0, {
        minimumFractionDigits: n.decimals ?? 0,
        maximumFractionDigits: n.decimals ?? 0
      }).format(o);
    }
    case "boolean":
      return !!e ? n.trueLabel ?? "Yes" : n.falseLabel ?? "No";
    case "badge": {
      const o = String(e), s = (r = n.variants) == null ? void 0 : r[o], u = (s == null ? void 0 : s.label) ?? o, g = (s == null ? void 0 : s.className) ?? "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground";
      return /* @__PURE__ */ t("span", { className: g, children: u });
    }
    default:
      return String(e);
  }
}
function yt({ columnCount: e }) {
  return /* @__PURE__ */ t(M, { children: Array.from({ length: e }).map((n, r) => /* @__PURE__ */ t(E, { children: /* @__PURE__ */ t("div", { className: "h-4 w-full animate-pulse rounded bg-muted" }) }, r)) });
}
function Nt({
  filterMeta: e,
  value: n,
  onChange: r
}) {
  if (!e) return null;
  if (e.filterVariant === "select")
    return /* @__PURE__ */ c(
      "select",
      {
        value: n ?? "",
        onChange: (o) => r(o.target.value === "" ? void 0 : o.target.value),
        className: "mt-1 h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
        children: [
          /* @__PURE__ */ t("option", { value: "", children: "All" }),
          e.options.map((o) => /* @__PURE__ */ t("option", { value: o.value, children: o.label }, o.value))
        ]
      }
    );
  if (e.filterVariant === "dateRange") {
    const o = n ?? [void 0, void 0];
    return /* @__PURE__ */ c("div", { className: "mt-1 flex flex-col gap-1", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "date",
          value: o[0] ?? "",
          onChange: (s) => r([s.target.value || void 0, o[1]]),
          className: "h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
          placeholder: "From"
        }
      ),
      /* @__PURE__ */ t(
        "input",
        {
          type: "date",
          value: o[1] ?? "",
          onChange: (s) => r([o[0], s.target.value || void 0]),
          className: "h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
          placeholder: "To"
        }
      )
    ] });
  }
  if (e.filterVariant === "numberRange") {
    const o = n ?? [void 0, void 0];
    return /* @__PURE__ */ c("div", { className: "mt-1 flex flex-col gap-1", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "number",
          value: o[0] ?? "",
          onChange: (s) => r([
            s.target.value !== "" ? Number(s.target.value) : void 0,
            o[1]
          ]),
          className: "h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
          placeholder: "Min"
        }
      ),
      /* @__PURE__ */ t(
        "input",
        {
          type: "number",
          value: o[1] ?? "",
          onChange: (s) => r([
            o[0],
            s.target.value !== "" ? Number(s.target.value) : void 0
          ]),
          className: "h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
          placeholder: "Max"
        }
      )
    ] });
  }
  return /* @__PURE__ */ t(
    "input",
    {
      type: "text",
      value: n ?? "",
      onChange: (o) => r(o.target.value || void 0),
      className: "mt-1 h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
      placeholder: "Filter…"
    }
  );
}
const we = (e, n, r) => {
  const [o, s] = r, u = e.getValue(n);
  return u ? !(o && u < o || s && u > s) : !0;
};
we.autoRemove = (e) => {
  const [n, r] = e;
  return !n && !r;
};
const ye = (e, n, r) => {
  const [o, s] = r, u = e.getValue(n);
  return !(o !== void 0 && u < o || s !== void 0 && u > s);
};
ye.autoRemove = (e) => {
  const [n, r] = e;
  return n === void 0 && r === void 0;
};
function St(e, n, r) {
  const o = n.filter(
    (b) => b.id !== "__select__" && b.id !== "__actions__"
  ), s = o.map((b) => typeof b.header == "string" ? b.header : b.accessorKey ?? b.id ?? ""), u = e.map(
    (b) => o.map((R) => {
      const C = R.accessorKey ?? R.id ?? "", x = b.getValue(C), P = x == null ? "" : String(x);
      return P.includes(",") || P.includes('"') || P.includes(`
`) ? `"${P.replace(/"/g, '""')}"` : P;
    })
  ), g = [s, ...u].map((b) => b.join(",")).join(`
`), w = new Blob([g], { type: "text/csv;charset=utf-8;" }), h = URL.createObjectURL(w), N = document.createElement("a");
  N.href = h, N.setAttribute("download", `${r}.csv`), document.body.appendChild(N), N.click(), document.body.removeChild(N), URL.revokeObjectURL(h);
}
function Z(e) {
  const n = e.getIsPinned();
  return n ? {
    position: "sticky",
    left: n === "left" ? `${e.getStart("left")}px` : void 0,
    right: n === "right" ? `${e.getAfter("right")}px` : void 0,
    zIndex: 2,
    background: "hsl(var(--background))"
  } : {};
}
function Ht({
  columns: e,
  data: n,
  fetchData: r,
  isLoading: o = !1,
  error: s = null,
  emptyMessage: u = "No results.",
  onRowClick: g,
  rowActions: w,
  enableRowSelection: h = !1,
  onSelectionChange: N,
  bulkActions: b,
  enableGlobalFilter: R = !0,
  enableColumnFilters: C = !1,
  enableSorting: x = !0,
  enableMultiSort: P = !1,
  enablePagination: j = !0,
  defaultPageSize: H = 20,
  pageSizeOptions: G = [20, 50, 100],
  enableColumnVisibility: U = !0,
  enableExport: K = !1,
  exportFilename: S = "export",
  refreshSlot: D,
  toolbarActionsSlot: F,
  enableRowExpansion: _ = !1,
  renderSubRow: L,
  className: y
}) {
  const v = !!r, [T, I] = d.useState([]), [X, Ce] = d.useState(0), [Pe, se] = d.useState(v), [Re, ie] = d.useState(null), [q, Fe] = d.useState([]), [J, De] = d.useState(
    []
  ), [Y, le] = d.useState(""), [_e, Te] = d.useState({}), [ce, Ie] = d.useState({}), [Le, Me] = d.useState({}), [je, ze] = d.useState(!1), [z, Ee] = d.useState({
    pageIndex: 0,
    pageSize: H
  }), [Ve] = d.useState(() => {
    const a = [], i = [];
    for (const l of e) {
      const f = l.accessorKey ?? l.id ?? "";
      f && l.pin === "left" && a.push(f), f && l.pin === "right" && i.push(f);
    }
    return { left: a, right: i };
  });
  d.useEffect(() => {
    if (!r) return;
    let a = !1;
    return se(!0), ie(null), r({
      page: z.pageIndex,
      pageSize: z.pageSize,
      sorting: q.map((i) => ({ id: i.id, desc: i.desc })),
      filters: J.map((i) => ({ id: i.id, value: i.value })),
      globalFilter: Y
    }).then(({ data: i, total: l }) => {
      a || (I(i), Ce(l));
    }).catch((i) => {
      a || ie(
        i instanceof Error ? i.message : "Failed to load data"
      );
    }).finally(() => {
      a || se(!1);
    }), () => {
      a = !0;
    };
  }, [r, z.pageIndex, z.pageSize, q, J, Y]);
  const A = d.useMemo(() => {
    const a = [];
    _ && L && a.push({
      id: "__expand__",
      header: () => null,
      cell: ({ row: l }) => l.getCanExpand() ? /* @__PURE__ */ t(
        "button",
        {
          onClick: (f) => {
            f.stopPropagation(), l.toggleExpanded();
          },
          className: "flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground",
          "aria-label": l.getIsExpanded() ? "Collapse row" : "Expand row",
          children: /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": !0,
              className: m(
                "inline-block transition-transform",
                l.getIsExpanded() && "rotate-90"
              ),
              children: "▶"
            }
          )
        }
      ) : null,
      enableSorting: !1,
      enableHiding: !1,
      size: 36
    }), h && a.push({
      id: "__select__",
      header: ({ table: l }) => /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          role: "checkbox",
          "aria-label": "Select all",
          checked: l.getIsAllPageRowsSelected(),
          ref: (f) => {
            f && (f.indeterminate = l.getIsSomePageRowsSelected() && !l.getIsAllPageRowsSelected());
          },
          onChange: l.getToggleAllPageRowsSelectedHandler(),
          className: "h-4 w-4 cursor-pointer"
        }
      ),
      cell: ({ row: l }) => /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          role: "checkbox",
          "aria-label": "Select row",
          checked: l.getIsSelected(),
          disabled: !l.getCanSelect(),
          onChange: l.getToggleSelectedHandler(),
          onClick: (f) => f.stopPropagation(),
          className: "h-4 w-4 cursor-pointer"
        }
      ),
      enableSorting: !1,
      enableHiding: !1,
      size: 40
    });
    const i = e.map((l) => {
      if (!l.formatter || l.cell) return l;
      const f = l.formatter;
      return {
        ...l,
        cell: ({ getValue: B }) => wt(B(), f)
      };
    });
    return a.push(...i), w && w.length > 0 && a.push({
      id: "__actions__",
      header: "Actions",
      cell: ({ row: l }) => /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: w.map((f) => {
        var B;
        return (B = f.hidden) != null && B.call(f, l.original) ? null : /* @__PURE__ */ t(
          k,
          {
            variant: f.variant ?? "ghost",
            size: "sm",
            onClick: (Ae) => {
              Ae.stopPropagation(), f.onClick(l.original);
            },
            children: f.label
          },
          f.label
        );
      }) }),
      enableSorting: !1,
      enableHiding: !1
    }), a;
  }, [e, _, h, L, w]), de = v ? T : n ?? [], He = o || Pe, ue = s ?? Re, p = Ke({
    data: de,
    columns: A,
    filterFns: {
      dateRange: we,
      numberRange: ye
    },
    state: {
      sorting: q,
      columnFilters: J,
      globalFilter: Y,
      columnVisibility: _e,
      rowSelection: ce,
      expanded: Le,
      pagination: z,
      columnPinning: Ve
    },
    // Server-side flags
    manualSorting: v,
    manualFiltering: v,
    manualPagination: v,
    pageCount: v ? Math.ceil(X / z.pageSize) : void 0,
    // Row expansion
    getRowCanExpand: () => _ && !!L,
    // State handlers
    enableRowSelection: h,
    enableMultiRowSelection: h,
    enableSorting: x,
    enableMultiSort: P,
    onSortingChange: Fe,
    onColumnFiltersChange: De,
    onGlobalFilterChange: le,
    onColumnVisibilityChange: Te,
    onExpandedChange: Me,
    onPaginationChange: Ee,
    onRowSelectionChange: (a) => {
      const i = typeof a == "function" ? a(ce) : a;
      if (Ie(i), N) {
        const l = Object.keys(i).filter((f) => i[f]).map((f) => de[Number(f)]);
        N(l);
      }
    },
    getCoreRowModel: Ze(),
    getFilteredRowModel: v ? void 0 : Qe(),
    getSortedRowModel: v ? void 0 : Je(),
    getPaginationRowModel: j ? qe() : void 0,
    getExpandedRowModel: Xe(),
    initialState: {
      pagination: { pageSize: H }
    }
  }), Q = p.getSelectedRowModel().rows.map((a) => a.original), $e = /* @__PURE__ */ c("div", { className: "flex flex-wrap items-center justify-between gap-2 py-2", children: [
    /* @__PURE__ */ c("div", { className: "flex flex-1 flex-wrap items-center gap-2", children: [
      R && /* @__PURE__ */ t(
        "input",
        {
          value: Y,
          onChange: (a) => le(a.target.value),
          placeholder: "Search…",
          className: "h-9 w-48 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        }
      ),
      h && Q.length > 0 && b && b.map((a) => /* @__PURE__ */ c(
        k,
        {
          variant: a.variant ?? "outline",
          size: "sm",
          onClick: () => a.onClick(Q),
          children: [
            a.label,
            " (",
            Q.length,
            ")"
          ]
        },
        a.label
      ))
    ] }),
    /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
      F,
      K && /* @__PURE__ */ t(
        k,
        {
          variant: "outline",
          size: "sm",
          onClick: () => St(
            p.getFilteredRowModel().rows,
            e,
            S
          ),
          children: "Export CSV"
        }
      ),
      U && /* @__PURE__ */ c("div", { className: "relative", children: [
        /* @__PURE__ */ t(
          k,
          {
            variant: "outline",
            size: "sm",
            onClick: () => ze((a) => !a),
            children: "Columns"
          }
        ),
        je && /* @__PURE__ */ t("div", { className: "absolute right-0 top-10 z-50 min-w-[160px] rounded-md border bg-background p-2 shadow-md", children: p.getAllLeafColumns().filter((a) => a.getCanHide()).map((a) => /* @__PURE__ */ c(
          "label",
          {
            className: "flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-muted",
            children: [
              /* @__PURE__ */ t(
                "input",
                {
                  type: "checkbox",
                  checked: a.getIsVisible(),
                  onChange: a.getToggleVisibilityHandler(),
                  className: "h-4 w-4"
                }
              ),
              typeof a.columnDef.header == "string" ? a.columnDef.header : a.id
            ]
          },
          a.id
        )) })
      ] }),
      D
    ] })
  ] }), Ue = C && /* @__PURE__ */ t(M, { children: p.getFlatHeaders().map((a) => {
    const i = a.column.columnDef;
    return /* @__PURE__ */ t(
      re,
      {
        className: "align-top",
        style: Z(a.column),
        children: a.isPlaceholder ? null : /* @__PURE__ */ t(
          Nt,
          {
            columnId: a.column.id,
            filterMeta: i.filterMeta,
            value: a.column.getFilterValue(),
            onChange: (l) => a.column.setFilterValue(l)
          }
        )
      },
      a.id
    );
  }) }), Ye = j && /* @__PURE__ */ c("div", { className: "flex flex-wrap items-center justify-between gap-2 py-2 text-sm", children: [
    /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ t("span", { className: "text-muted-foreground", children: "Rows per page:" }),
      /* @__PURE__ */ t(
        "select",
        {
          value: p.getState().pagination.pageSize,
          onChange: (a) => p.setPageSize(Number(a.target.value)),
          className: "h-8 rounded border border-input bg-background px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring",
          children: G.map((a) => /* @__PURE__ */ t("option", { value: a, children: a }, a))
        }
      )
    ] }),
    /* @__PURE__ */ c("div", { className: "flex items-center gap-1", children: [
      v ? /* @__PURE__ */ c("span", { className: "text-muted-foreground", children: [
        "Page ",
        p.getState().pagination.pageIndex + 1,
        " of",
        " ",
        p.getPageCount() > 0 ? p.getPageCount() : "…",
        X > 0 && /* @__PURE__ */ c("span", { children: [
          " — ",
          X,
          " total"
        ] })
      ] }) : /* @__PURE__ */ c("span", { className: "text-muted-foreground", children: [
        "Page ",
        p.getState().pagination.pageIndex + 1,
        " of",
        " ",
        p.getPageCount()
      ] }),
      /* @__PURE__ */ t(
        k,
        {
          variant: "outline",
          size: "sm",
          onClick: () => p.firstPage(),
          disabled: !p.getCanPreviousPage(),
          children: "«"
        }
      ),
      /* @__PURE__ */ t(
        k,
        {
          variant: "outline",
          size: "sm",
          onClick: () => p.previousPage(),
          disabled: !p.getCanPreviousPage(),
          children: "‹"
        }
      ),
      /* @__PURE__ */ t(
        k,
        {
          variant: "outline",
          size: "sm",
          onClick: () => p.nextPage(),
          disabled: !p.getCanNextPage(),
          children: "›"
        }
      ),
      /* @__PURE__ */ t(
        k,
        {
          variant: "outline",
          size: "sm",
          onClick: () => p.lastPage(),
          disabled: !p.getCanNextPage(),
          children: "»"
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ c("div", { className: m("space-y-2", y), children: [
    $e,
    /* @__PURE__ */ t("div", { className: "overflow-x-auto rounded-md border", children: /* @__PURE__ */ c(be, { children: [
      /* @__PURE__ */ c(xe, { children: [
        p.getHeaderGroups().map((a) => /* @__PURE__ */ t(M, { children: a.headers.map((i) => /* @__PURE__ */ t(
          re,
          {
            colSpan: i.colSpan,
            style: {
              width: i.getSize() !== 150 ? i.getSize() : void 0,
              ...Z(i.column)
            },
            className: m(
              i.column.getIsPinned() && "shadow-[inset_-1px_0_0_0_hsl(var(--border))]"
            ),
            children: i.isPlaceholder ? null : /* @__PURE__ */ c(
              "div",
              {
                className: m(
                  "flex select-none items-center gap-1",
                  i.column.getCanSort() && "cursor-pointer hover:text-foreground"
                ),
                onClick: i.column.getCanSort() ? i.column.getToggleSortingHandler() : void 0,
                children: [
                  me(
                    i.column.columnDef.header,
                    i.getContext()
                  ),
                  i.column.getIsSorted() === "asc" && /* @__PURE__ */ t("span", { "aria-hidden": !0, children: "↑" }),
                  i.column.getIsSorted() === "desc" && /* @__PURE__ */ t("span", { "aria-hidden": !0, children: "↓" }),
                  i.column.getIsSorted() === !1 && i.column.getCanSort() && /* @__PURE__ */ t(
                    "span",
                    {
                      "aria-hidden": !0,
                      className: "text-muted-foreground/40",
                      children: "↕"
                    }
                  )
                ]
              }
            )
          },
          i.id
        )) }, a.id)),
        Ue
      ] }),
      /* @__PURE__ */ t(ve, { children: He ? Array.from({ length: H }).map((a, i) => /* @__PURE__ */ t(yt, { columnCount: A.length }, i)) : ue ? /* @__PURE__ */ t(M, { children: /* @__PURE__ */ t(
        E,
        {
          colSpan: A.length,
          className: "h-24 text-center text-destructive",
          children: ue
        }
      ) }) : p.getRowModel().rows.length === 0 ? /* @__PURE__ */ t(M, { children: /* @__PURE__ */ t(
        E,
        {
          colSpan: A.length,
          className: "h-24 text-center text-muted-foreground",
          children: u
        }
      ) }) : p.getRowModel().rows.flatMap((a) => {
        const i = a.getVisibleCells();
        return [
          /* @__PURE__ */ t(
            M,
            {
              "data-state": a.getIsSelected() ? "selected" : void 0,
              onClick: g ? () => g(a.original) : void 0,
              className: m(g && "cursor-pointer"),
              children: i.map((l) => /* @__PURE__ */ t(
                E,
                {
                  style: Z(l.column),
                  className: m(
                    l.column.getIsPinned() && "shadow-[inset_-1px_0_0_0_hsl(var(--border))]"
                  ),
                  children: me(
                    l.column.columnDef.cell,
                    l.getContext()
                  )
                },
                l.id
              ))
            },
            a.id
          ),
          // Expanded sub-row
          ...a.getIsExpanded() && L ? [
            /* @__PURE__ */ t(
              M,
              {
                className: "bg-muted/30 hover:bg-muted/30",
                children: /* @__PURE__ */ t(
                  E,
                  {
                    colSpan: i.length,
                    className: "px-4 py-3",
                    children: L(a.original)
                  }
                )
              },
              `${a.id}__expanded`
            )
          ] : []
        ];
      }) })
    ] }) }),
    Ye
  ] });
}
const Ne = d.createContext(
  void 0
);
function $t({
  children: e,
  defaultTheme: n = "system",
  storageKey: r = "gt-ui-theme"
}) {
  const [o, s] = d.useState(
    () => localStorage.getItem(r) || n
  );
  d.useEffect(() => {
    const g = window.document.documentElement;
    if (g.classList.remove("light", "dark"), o === "system") {
      const w = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      g.classList.add(w);
      return;
    }
    g.classList.add(o);
  }, [o]);
  const u = d.useCallback(
    (g) => {
      localStorage.setItem(r, g), s(g);
    },
    [r]
  );
  return /* @__PURE__ */ t(Ne.Provider, { value: { theme: o, setTheme: u }, children: e });
}
function Ut() {
  const e = d.useContext(Ne);
  if (e === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}
const Se = d.forwardRef(({ className: e, value: n, ...r }, o) => /* @__PURE__ */ t(
  ee.Root,
  {
    ref: o,
    className: m(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      e
    ),
    ...r,
    children: /* @__PURE__ */ t(
      ee.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (n || 0)}%)` }
      }
    )
  }
));
Se.displayName = ee.Root.displayName;
let kt = 0;
function pe() {
  return `fu-${++kt}-${Math.random().toString(36).slice(2, 7)}`;
}
function ke(e) {
  return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function Ct(e) {
  var r;
  if (e.type.startsWith("image/")) return !0;
  const n = (r = e.name.split(".").pop()) == null ? void 0 : r.toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "webp", "heic", "heif", "avif"].includes(n ?? "");
}
function Pt({ file: e, className: n }) {
  const r = e.type, o = { className: m("h-8 w-8", n) };
  return r.startsWith("video/") ? /* @__PURE__ */ t(at, { ...o }) : r.startsWith("audio/") ? /* @__PURE__ */ t(st, { ...o }) : r.includes("zip") || r.includes("tar") || r.includes("gzip") ? /* @__PURE__ */ t(it, { ...o }) : r.includes("javascript") || r.includes("typescript") || r.includes("json") || r.includes("html") || r.includes("css") ? /* @__PURE__ */ t(lt, { ...o }) : r.startsWith("text/") ? /* @__PURE__ */ t(ct, { ...o }) : /* @__PURE__ */ t(dt, { ...o });
}
function Rt({ entry: e, onRemove: n }) {
  const { file: r, preview: o, progress: s, status: u, error: g, id: w } = e;
  return /* @__PURE__ */ c("div", { className: "flex items-start gap-3 rounded-lg border bg-background p-3", children: [
    /* @__PURE__ */ t("div", { className: "flex-shrink-0", children: o ? /* @__PURE__ */ t(
      "img",
      {
        src: o,
        alt: r.name,
        className: "h-12 w-12 rounded object-cover"
      }
    ) : /* @__PURE__ */ t("div", { className: "flex h-12 w-12 items-center justify-center rounded bg-muted text-muted-foreground", children: /* @__PURE__ */ t(Pt, { file: r }) }) }),
    /* @__PURE__ */ c("div", { className: "min-w-0 flex-1 space-y-1", children: [
      /* @__PURE__ */ c("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ t("p", { className: "truncate text-sm font-medium", children: r.name }),
        /* @__PURE__ */ c("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
          u === "success" && /* @__PURE__ */ t(rt, { className: "h-4 w-4 text-green-500" }),
          u === "error" && /* @__PURE__ */ t(nt, { className: "h-4 w-4 text-destructive" }),
          u !== "uploading" && /* @__PURE__ */ t(
            k,
            {
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6",
              onClick: () => n(w),
              "aria-label": `Remove ${r.name}`,
              children: /* @__PURE__ */ t(ot, { className: "h-3 w-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("p", { className: "text-xs text-muted-foreground", children: ke(r.size) }),
      u === "uploading" && /* @__PURE__ */ t(Se, { value: s, className: "h-1.5" }),
      u === "error" && g && /* @__PURE__ */ t("p", { className: "text-xs text-destructive", children: g })
    ] })
  ] });
}
function Yt({
  multiple: e = !1,
  accept: n,
  maxSize: r,
  onUpload: o,
  onChange: s,
  value: u,
  className: g,
  disabled: w = !1
}) {
  const h = u !== void 0, [N, b] = d.useState([]), R = h ? u : N, C = d.useRef(u);
  C.current = u;
  const x = d.useCallback(
    (S) => {
      if (h) {
        const D = S(C.current);
        s == null || s(D);
      } else
        b((D) => {
          const F = S(D);
          return s == null || s(F), F;
        });
    },
    [h, s]
  ), P = d.useCallback(
    async (S, D) => {
      const F = D.map((y) => ({
        id: pe(),
        file: y.file,
        progress: 0,
        status: "error",
        error: y.errors.map((v) => v.message).join(", ")
      })), _ = S.map((y) => ({
        id: pe(),
        file: y,
        preview: Ct(y) ? URL.createObjectURL(y) : void 0,
        progress: 0,
        status: o ? "uploading" : "idle"
      })), L = [..._, ...F];
      if (x(e ? (y) => [...y, ...L] : (y) => (y.forEach((v) => {
        v.preview && URL.revokeObjectURL(v.preview);
      }), L.slice(0, 1))), o)
        for (const y of _)
          try {
            await o(y.file, (v) => {
              x(
                (T) => T.map(
                  (I) => I.id === y.id ? { ...I, progress: v } : I
                )
              );
            }), x(
              (v) => v.map(
                (T) => T.id === y.id ? { ...T, status: "success", progress: 100 } : T
              )
            );
          } catch (v) {
            x(
              (T) => T.map(
                (I) => I.id === y.id ? {
                  ...I,
                  status: "error",
                  error: v instanceof Error ? v.message : "Upload failed"
                } : I
              )
            );
          }
    },
    [e, o, x]
  ), j = d.useCallback(
    (S) => {
      x((D) => {
        const F = D.find((_) => _.id === S);
        return F != null && F.preview && URL.revokeObjectURL(F.preview), D.filter((_) => _.id !== S);
      });
    },
    [x]
  );
  d.useEffect(() => () => {
    h || N.forEach((S) => {
      S.preview && URL.revokeObjectURL(S.preview);
    });
  }, []);
  const { getRootProps: H, getInputProps: G, isDragActive: U } = et({
    onDrop: P,
    multiple: e,
    accept: n,
    maxSize: r,
    disabled: w
  }), K = R.length > 0;
  return /* @__PURE__ */ c("div", { className: m("space-y-3", g), children: [
    /* @__PURE__ */ c(
      "div",
      {
        ...H(),
        className: m(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors",
          U ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/30",
          w && "cursor-not-allowed opacity-50"
        ),
        children: [
          /* @__PURE__ */ t("input", { ...G() }),
          /* @__PURE__ */ t(tt, { className: "mb-3 h-10 w-10 text-muted-foreground" }),
          U ? /* @__PURE__ */ t("p", { className: "text-sm font-medium", children: "Drop files here…" }) : /* @__PURE__ */ c(We, { children: [
            /* @__PURE__ */ c("p", { className: "text-sm font-medium", children: [
              /* @__PURE__ */ c("span", { className: "hidden sm:inline", children: [
                "Drag & drop files here, or",
                " ",
                /* @__PURE__ */ t("span", { className: "text-primary underline-offset-2 hover:underline", children: "click to browse" })
              ] }),
              /* @__PURE__ */ t("span", { className: "sm:hidden text-primary underline-offset-2", children: "Tap to add photos" })
            ] }),
            r && /* @__PURE__ */ c("p", { className: "mt-1 text-xs text-muted-foreground", children: [
              "Max size: ",
              ke(r)
            ] })
          ] })
        ]
      }
    ),
    K && /* @__PURE__ */ t("div", { className: "space-y-2", children: R.map((S) => /* @__PURE__ */ t(Rt, { entry: S, onRemove: j }, S.id)) })
  ] });
}
const oe = V.Root, ae = V.Trigger, At = V.Anchor, O = d.forwardRef(({ className: e, align: n = "center", sideOffset: r = 4, ...o }, s) => /* @__PURE__ */ t(V.Portal, { children: /* @__PURE__ */ t(
  V.Content,
  {
    ref: s,
    align: n,
    sideOffset: r,
    className: m(
      "z-50 w-auto rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...o
  }
) }));
O.displayName = V.Content.displayName;
function W({ className: e, classNames: n, showOutsideDays: r = !0, ...o }) {
  return /* @__PURE__ */ t(
    ft,
    {
      showOutsideDays: r,
      className: m("p-3", e),
      classNames: {
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center",
        button_previous: m(
          "absolute left-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-30 transition-opacity"
        ),
        button_next: m(
          "absolute right-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-30 transition-opacity"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted-foreground w-9 font-normal text-[0.8rem] text-center",
        weeks: "w-full",
        week: "flex w-full mt-2",
        day: "relative p-0 text-center text-sm h-9 w-9 flex items-center justify-center",
        day_button: m(
          "h-9 w-9 p-0 font-normal text-sm rounded-md",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "transition-colors"
        ),
        selected: "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
        today: "[&>button]:bg-accent [&>button]:text-accent-foreground",
        outside: "opacity-50 [&>button]:text-muted-foreground [&>button]:aria-selected:bg-transparent",
        disabled: "opacity-50 [&>button]:cursor-not-allowed",
        range_start: "[&>button]:bg-primary [&>button]:text-primary-foreground bg-accent rounded-l-md",
        range_end: "[&>button]:bg-primary [&>button]:text-primary-foreground bg-accent rounded-r-md",
        range_middle: "bg-accent [&>button]:text-accent-foreground [&>button]:hover:bg-transparent rounded-none",
        hidden: "invisible",
        dropdowns: "flex items-center justify-center gap-1 w-full px-6",
        dropdown_root: "relative",
        dropdown: m(
          "absolute inset-0 w-full opacity-0 cursor-pointer z-10",
          "[&+span]:pointer-events-none"
        ),
        months_dropdown: "relative inline-flex items-center gap-1 text-sm font-medium cursor-pointer",
        years_dropdown: "relative inline-flex items-center gap-1 text-sm font-medium cursor-pointer",
        chevron: "h-4 w-4 text-muted-foreground",
        ...n
      },
      components: {
        Chevron: ({ orientation: s, ...u }) => s === "left" ? /* @__PURE__ */ t(ut, { ...u, className: "h-4 w-4" }) : /* @__PURE__ */ t(mt, { ...u, className: "h-4 w-4" })
      },
      ...o
    }
  );
}
W.displayName = "Calendar";
function Ft() {
  const e = /* @__PURE__ */ new Date(), n = new Date(e.getFullYear(), e.getMonth(), e.getDate());
  return [
    {
      label: "Today",
      range: () => ({ from: n, to: n })
    },
    {
      label: "Last 7 days",
      range: () => {
        const r = new Date(n);
        return r.setDate(r.getDate() - 6), { from: r, to: n };
      }
    },
    {
      label: "Last 30 days",
      range: () => {
        const r = new Date(n);
        return r.setDate(r.getDate() - 29), { from: r, to: n };
      }
    },
    {
      label: "This month",
      range: () => ({
        from: new Date(e.getFullYear(), e.getMonth(), 1),
        to: new Date(e.getFullYear(), e.getMonth() + 1, 0)
      })
    },
    {
      label: "Last month",
      range: () => ({
        from: new Date(e.getFullYear(), e.getMonth() - 1, 1),
        to: new Date(e.getFullYear(), e.getMonth(), 0)
      })
    },
    {
      label: "This year",
      range: () => ({
        from: new Date(e.getFullYear(), 0, 1),
        to: new Date(e.getFullYear(), 11, 31)
      })
    }
  ];
}
function Bt({
  value: e,
  onChange: n,
  placeholder: r = "Pick a date",
  disabled: o = !1,
  className: s,
  timeZone: u,
  fromYear: g,
  toYear: w
}) {
  const h = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ c(oe, { children: [
    /* @__PURE__ */ t(ae, { asChild: !0, children: /* @__PURE__ */ c(
      k,
      {
        variant: "outline",
        disabled: o,
        className: m(
          "w-[240px] justify-start text-left font-normal",
          !e && "text-muted-foreground",
          s
        ),
        children: [
          /* @__PURE__ */ t(ne, { className: "mr-2 h-4 w-4" }),
          e ? $(e, "PPP") : /* @__PURE__ */ t("span", { children: r })
        ]
      }
    ) }),
    /* @__PURE__ */ t(O, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ t(
      W,
      {
        mode: "single",
        selected: e,
        onSelect: n,
        captionLayout: "dropdown",
        startMonth: new Date(g ?? h - 80, 0),
        endMonth: new Date(w ?? h + 10, 11),
        timeZone: u,
        autoFocus: !0
      }
    ) })
  ] });
}
function Ot({
  value: e,
  onChange: n,
  placeholder: r = "Pick date & time",
  disabled: o = !1,
  className: s,
  timeZone: u,
  fromYear: g,
  toYear: w
}) {
  const h = (/* @__PURE__ */ new Date()).getFullYear(), N = (C) => {
    if (!C) {
      n == null || n(void 0);
      return;
    }
    const x = e ? e.getHours() : 0, P = e ? e.getMinutes() : 0;
    n == null || n(ge(fe(C, x), P));
  }, b = (C) => {
    const [x, P] = C.target.value.split(":").map(Number), j = e ?? /* @__PURE__ */ new Date();
    n == null || n(ge(fe(j, x), P));
  }, R = e ? `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}` : "";
  return /* @__PURE__ */ c(oe, { children: [
    /* @__PURE__ */ t(ae, { asChild: !0, children: /* @__PURE__ */ c(
      k,
      {
        variant: "outline",
        disabled: o,
        className: m(
          "w-[280px] justify-start text-left font-normal",
          !e && "text-muted-foreground",
          s
        ),
        children: [
          /* @__PURE__ */ t(ne, { className: "mr-2 h-4 w-4" }),
          e ? $(e, "PPP HH:mm") : /* @__PURE__ */ t("span", { children: r })
        ]
      }
    ) }),
    /* @__PURE__ */ c(O, { className: "w-auto p-0", align: "start", children: [
      /* @__PURE__ */ t(
        W,
        {
          mode: "single",
          selected: e,
          onSelect: N,
          captionLayout: "dropdown",
          startMonth: new Date(g ?? h - 80, 0),
          endMonth: new Date(w ?? h + 10, 11),
          timeZone: u,
          autoFocus: !0
        }
      ),
      /* @__PURE__ */ c("div", { className: "border-t p-3 flex items-center gap-2", children: [
        /* @__PURE__ */ t(gt, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
        /* @__PURE__ */ t("label", { className: "text-sm text-muted-foreground sr-only", htmlFor: "time-input", children: "Time" }),
        /* @__PURE__ */ t(
          "input",
          {
            id: "time-input",
            type: "time",
            value: R,
            onChange: b,
            className: m(
              "flex-1 rounded-md border border-input bg-transparent px-2 py-1 text-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )
          }
        )
      ] })
    ] })
  ] });
}
function Wt({
  value: e,
  onChange: n,
  placeholder: r = "Pick a date range",
  disabled: o = !1,
  className: s,
  timeZone: u,
  fromYear: g,
  toYear: w,
  presets: h,
  numberOfMonths: N = 2
}) {
  const b = (/* @__PURE__ */ new Date()).getFullYear(), R = h ?? Ft(), C = e != null && e.from ? e.to ? `${$(e.from, "LLL dd, y")} – ${$(e.to, "LLL dd, y")}` : $(e.from, "LLL dd, y") : r;
  return /* @__PURE__ */ c(oe, { children: [
    /* @__PURE__ */ t(ae, { asChild: !0, children: /* @__PURE__ */ c(
      k,
      {
        variant: "outline",
        disabled: o,
        className: m(
          "w-[300px] justify-start text-left font-normal",
          !(e != null && e.from) && "text-muted-foreground",
          s
        ),
        children: [
          /* @__PURE__ */ t(ne, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ t("span", { className: "truncate", children: C })
        ]
      }
    ) }),
    /* @__PURE__ */ t(O, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ c("div", { className: "flex flex-col sm:flex-row", children: [
      R.length > 0 && /* @__PURE__ */ c("div", { className: "flex flex-col gap-1 border-b sm:border-b-0 sm:border-r p-2 min-w-[140px]", children: [
        /* @__PURE__ */ t("p", { className: "px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Presets" }),
        R.map((x) => /* @__PURE__ */ t(
          k,
          {
            variant: "ghost",
            size: "sm",
            className: "justify-start font-normal",
            onClick: () => n == null ? void 0 : n(x.range()),
            children: x.label
          },
          x.label
        ))
      ] }),
      /* @__PURE__ */ t(
        W,
        {
          mode: "range",
          selected: e,
          onSelect: n,
          captionLayout: "dropdown",
          startMonth: new Date(g ?? b - 80, 0),
          endMonth: new Date(w ?? b + 10, 11),
          numberOfMonths: N,
          timeZone: u,
          autoFocus: !0
        }
      )
    ] }) })
  ] });
}
export {
  k as Button,
  W as Calendar,
  Ht as DataTable,
  Bt as DatePicker,
  Wt as DateRangePicker,
  Ot as DateTimePicker,
  Yt as FileUpload,
  bt as Loader,
  oe as Popover,
  At as PopoverAnchor,
  O as PopoverContent,
  ae as PopoverTrigger,
  Se as Progress,
  te as Spinner,
  be as Table,
  ve as TableBody,
  vt as TableCaption,
  E as TableCell,
  xt as TableFooter,
  re as TableHead,
  xe as TableHeader,
  M as TableRow,
  $t as ThemeProvider,
  pt as buttonVariants,
  m as cn,
  wt as formatCellValue,
  Ft as getDefaultPresets,
  ht as spinnerVariants,
  Ut as useTheme
};
//# sourceMappingURL=index.js.map
