import { clsx as We } from "clsx";
import { twMerge as Ke } from "tailwind-merge";
import { jsx as t, jsxs as d, Fragment as Xe } from "react/jsx-runtime";
import * as c from "react";
import { Slot as Ge } from "@radix-ui/react-slot";
import { cva as be } from "class-variance-authority";
import { useReactTable as qe, getExpandedRowModel as Je, getPaginationRowModel as Qe, getSortedRowModel as Ze, getFilteredRowModel as et, getCoreRowModel as tt, flexRender as ge } from "@tanstack/react-table";
import { Search as rt, SlidersHorizontal as nt, X as ot, Download as at, Columns2 as st, UploadCloudIcon as it, CheckCircleIcon as lt, AlertCircleIcon as ct, XIcon as dt, FileVideoIcon as ut, FileAudioIcon as mt, FileArchiveIcon as gt, FileCodeIcon as pt, FileTextIcon as ft, FileIcon as ht, ChevronLeft as bt, ChevronRight as xt, CalendarIcon as ne, Clock as vt } from "lucide-react";
import * as ee from "@radix-ui/react-progress";
import { useDropzone as wt } from "react-dropzone";
import * as H from "@radix-ui/react-popover";
import { DayPicker as yt } from "react-day-picker";
import { format as Y, setMinutes as pe, setHours as fe } from "date-fns";
function g(...e) {
  return Ke(We(e));
}
const Nt = be(
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
), C = c.forwardRef(
  ({ className: e, variant: n, size: r, asChild: o = !1, ...i }, u) => /* @__PURE__ */ t(
    o ? Ge : "button",
    {
      className: g(Nt({ variant: n, size: r, className: e })),
      ref: u,
      ...i
    }
  )
);
C.displayName = "Button";
const St = be(
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
), te = c.forwardRef(
  ({ className: e, size: n, color: r, label: o = "Loading...", ...i }, u) => /* @__PURE__ */ t(
    "div",
    {
      ref: u,
      role: "status",
      "aria-label": o,
      className: g(St({ size: n, color: r }), e),
      ...i,
      children: /* @__PURE__ */ t("span", { className: "sr-only", children: o })
    }
  )
);
te.displayName = "Spinner";
const kt = c.forwardRef(
  ({ overlay: e = !1, className: n, ...r }, o) => e ? /* @__PURE__ */ t(
    "div",
    {
      className: "absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
      "aria-live": "polite",
      children: /* @__PURE__ */ t(te, { ref: o, className: n, ...r })
    }
  ) : /* @__PURE__ */ t(te, { ref: o, className: n, ...r })
);
kt.displayName = "Loader";
const xe = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ t(
  "table",
  {
    ref: r,
    className: g("w-full caption-bottom text-sm", e),
    ...n
  }
) }));
xe.displayName = "Table";
const ve = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t("thead", { ref: r, className: g("[&_tr]:border-b", e), ...n }));
ve.displayName = "TableHeader";
const we = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "tbody",
  {
    ref: r,
    className: g("[&_tr:last-child]:border-0", e),
    ...n
  }
));
we.displayName = "TableBody";
const Ct = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "tfoot",
  {
    ref: r,
    className: g(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      e
    ),
    ...n
  }
));
Ct.displayName = "TableFooter";
const M = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "tr",
  {
    ref: r,
    className: g(
      "border-b transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 data-[state=selected]:bg-muted",
      e
    ),
    ...n
  }
));
M.displayName = "TableRow";
const re = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "th",
  {
    ref: r,
    className: g(
      "h-10 px-3 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wide [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...n
  }
));
re.displayName = "TableHead";
const $ = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "td",
  {
    ref: r,
    className: g(
      "px-3 py-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...n
  }
));
$.displayName = "TableCell";
const Rt = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "caption",
  {
    ref: r,
    className: g("mt-4 text-sm text-muted-foreground", e),
    ...n
  }
));
Rt.displayName = "TableCaption";
function Ft(e, n) {
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
      const o = String(e), i = (r = n.variants) == null ? void 0 : r[o], u = (i == null ? void 0 : i.label) ?? o, p = (i == null ? void 0 : i.className) ?? "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground";
      return /* @__PURE__ */ t("span", { className: p, children: u });
    }
    default:
      return String(e);
  }
}
function Pt({ columnCount: e }) {
  return /* @__PURE__ */ t(M, { children: Array.from({ length: e }).map((n, r) => /* @__PURE__ */ t($, { children: /* @__PURE__ */ t("div", { className: "h-4 w-full animate-pulse rounded bg-muted" }) }, r)) });
}
function Tt({
  filterMeta: e,
  value: n,
  onChange: r
}) {
  if (!e) return null;
  if (e.filterVariant === "select")
    return /* @__PURE__ */ d(
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
    return /* @__PURE__ */ d("div", { className: "mt-1 flex flex-col gap-1", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "date",
          value: o[0] ?? "",
          onChange: (i) => r([i.target.value || void 0, o[1]]),
          className: "h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
          placeholder: "From"
        }
      ),
      /* @__PURE__ */ t(
        "input",
        {
          type: "date",
          value: o[1] ?? "",
          onChange: (i) => r([o[0], i.target.value || void 0]),
          className: "h-7 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
          placeholder: "To"
        }
      )
    ] });
  }
  if (e.filterVariant === "numberRange") {
    const o = n ?? [void 0, void 0];
    return /* @__PURE__ */ d("div", { className: "mt-1 flex flex-col gap-1", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "number",
          value: o[0] ?? "",
          onChange: (i) => r([
            i.target.value !== "" ? Number(i.target.value) : void 0,
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
          onChange: (i) => r([
            o[0],
            i.target.value !== "" ? Number(i.target.value) : void 0
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
const ye = (e, n, r) => {
  const [o, i] = r, u = e.getValue(n);
  return u ? !(o && u < o || i && u > i) : !0;
};
ye.autoRemove = (e) => {
  const [n, r] = e;
  return !n && !r;
};
const Ne = (e, n, r) => {
  const [o, i] = r, u = e.getValue(n);
  return !(o !== void 0 && u < o || i !== void 0 && u > i);
};
Ne.autoRemove = (e) => {
  const [n, r] = e;
  return n === void 0 && r === void 0;
};
function _t(e, n, r) {
  const o = n.filter(
    (h) => h.id !== "__select__" && h.id !== "__actions__"
  ), i = o.map((h) => typeof h.header == "string" ? h.header : h.accessorKey ?? h.id ?? ""), u = e.map(
    (h) => o.map((F) => {
      const S = F.accessorKey ?? F.id ?? "", b = h.getValue(S), R = b == null ? "" : String(b);
      return R.includes(",") || R.includes('"') || R.includes(`
`) ? `"${R.replace(/"/g, '""')}"` : R;
    })
  ), p = [i, ...u].map((h) => h.join(",")).join(`
`), w = new Blob([p], { type: "text/csv;charset=utf-8;" }), f = URL.createObjectURL(w), N = document.createElement("a");
  N.href = f, N.setAttribute("download", `${r}.csv`), document.body.appendChild(N), N.click(), document.body.removeChild(N), URL.revokeObjectURL(f);
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
function Wt({
  columns: e,
  data: n,
  fetchData: r,
  isLoading: o = !1,
  error: i = null,
  emptyMessage: u = "No results.",
  onRowClick: p,
  rowActions: w,
  enableRowSelection: f = !1,
  onSelectionChange: N,
  bulkActions: h,
  enableGlobalFilter: F = !0,
  enableColumnFilters: S = !1,
  enableSorting: b = !0,
  enableMultiSort: R = !1,
  enablePagination: z = !0,
  defaultPageSize: U = 20,
  pageSizeOptions: G = [20, 50, 100],
  enableColumnVisibility: A = !0,
  enableExport: q = !1,
  exportFilename: k = "export",
  refreshSlot: T,
  toolbarActionsSlot: P,
  enableRowExpansion: _ = !1,
  renderSubRow: L,
  className: y
}) {
  const x = !!r, [D, I] = c.useState([]), [B, Re] = c.useState(0), [Fe, se] = c.useState(x), [Pe, ie] = c.useState(null), [J, Te] = c.useState([]), [j, _e] = c.useState(
    []
  ), [O, le] = c.useState(""), [De, Ie] = c.useState({}), [ce, Le] = c.useState({}), [Me, ze] = c.useState({}), [je, Ee] = c.useState(!1), [de, Ve] = c.useState(!1), [E, $e] = c.useState({
    pageIndex: 0,
    pageSize: U
  }), [He] = c.useState(() => {
    const a = [], s = [];
    for (const l of e) {
      const m = l.accessorKey ?? l.id ?? "";
      m && l.pin === "left" && a.push(m), m && l.pin === "right" && s.push(m);
    }
    return { left: a, right: s };
  });
  c.useEffect(() => {
    if (!r) return;
    let a = !1;
    return se(!0), ie(null), r({
      page: E.pageIndex,
      pageSize: E.pageSize,
      sorting: J.map((s) => ({ id: s.id, desc: s.desc })),
      filters: j.map((s) => ({ id: s.id, value: s.value })),
      globalFilter: O
    }).then(({ data: s, total: l }) => {
      a || (I(s), Re(l));
    }).catch((s) => {
      a || ie(
        s instanceof Error ? s.message : "Failed to load data"
      );
    }).finally(() => {
      a || se(!1);
    }), () => {
      a = !0;
    };
  }, [r, E.pageIndex, E.pageSize, J, j, O]);
  const W = c.useMemo(() => {
    const a = [];
    _ && L && a.push({
      id: "__expand__",
      header: () => null,
      cell: ({ row: l }) => l.getCanExpand() ? /* @__PURE__ */ t(
        "button",
        {
          onClick: (m) => {
            m.stopPropagation(), l.toggleExpanded();
          },
          className: "flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground",
          "aria-label": l.getIsExpanded() ? "Collapse row" : "Expand row",
          children: /* @__PURE__ */ t(
            "span",
            {
              "aria-hidden": !0,
              className: g(
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
    }), f && a.push({
      id: "__select__",
      header: ({ table: l }) => /* @__PURE__ */ t(
        "input",
        {
          type: "checkbox",
          role: "checkbox",
          "aria-label": "Select all",
          checked: l.getIsAllPageRowsSelected(),
          ref: (m) => {
            m && (m.indeterminate = l.getIsSomePageRowsSelected() && !l.getIsAllPageRowsSelected());
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
          onClick: (m) => m.stopPropagation(),
          className: "h-4 w-4 cursor-pointer"
        }
      ),
      enableSorting: !1,
      enableHiding: !1,
      size: 40
    });
    const s = e.map((l) => {
      if (!l.formatter || l.cell) return l;
      const m = l.formatter;
      return {
        ...l,
        cell: ({ getValue: V }) => Ft(V(), m)
      };
    });
    return a.push(...s), w && w.length > 0 && a.push({
      id: "__actions__",
      header: "Actions",
      cell: ({ row: l }) => /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: w.map((m) => {
        var V;
        return (V = m.hidden) != null && V.call(m, l.original) ? null : /* @__PURE__ */ t(
          C,
          {
            variant: m.variant ?? "ghost",
            size: "sm",
            onClick: (Oe) => {
              Oe.stopPropagation(), m.onClick(l.original);
            },
            children: m.label
          },
          m.label
        );
      }) }),
      enableSorting: !1,
      enableHiding: !1
    }), a;
  }, [e, _, f, L, w]), ue = x ? D : n ?? [], Ue = o || Fe, me = i ?? Pe, v = qe({
    data: ue,
    columns: W,
    filterFns: {
      dateRange: ye,
      numberRange: Ne
    },
    state: {
      sorting: J,
      columnFilters: j,
      globalFilter: O,
      columnVisibility: De,
      rowSelection: ce,
      expanded: Me,
      pagination: E,
      columnPinning: He
    },
    // Server-side flags
    manualSorting: x,
    manualFiltering: x,
    manualPagination: x,
    pageCount: x ? Math.ceil(B / E.pageSize) : void 0,
    // Row expansion
    getRowCanExpand: () => _ && !!L,
    // State handlers
    enableRowSelection: f,
    enableMultiRowSelection: f,
    enableSorting: b,
    enableMultiSort: R,
    onSortingChange: Te,
    onColumnFiltersChange: _e,
    onGlobalFilterChange: le,
    onColumnVisibilityChange: Ie,
    onExpandedChange: ze,
    onPaginationChange: $e,
    onRowSelectionChange: (a) => {
      const s = typeof a == "function" ? a(ce) : a;
      if (Le(s), N) {
        const l = Object.keys(s).filter((m) => s[m]).map((m) => ue[Number(m)]);
        N(l);
      }
    },
    getCoreRowModel: tt(),
    getFilteredRowModel: x ? void 0 : et(),
    getSortedRowModel: x ? void 0 : Ze(),
    getPaginationRowModel: z ? Qe() : void 0,
    getExpandedRowModel: Je(),
    initialState: {
      pagination: { pageSize: U }
    }
  }), Q = v.getSelectedRowModel().rows.map((a) => a.original), Ye = /* @__PURE__ */ d("div", { className: "flex flex-wrap items-center justify-between gap-2 py-2", children: [
    /* @__PURE__ */ d("div", { className: "flex flex-1 flex-wrap items-center gap-2", children: [
      F && /* @__PURE__ */ d("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ t(rt, { className: "absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ t(
          "input",
          {
            value: O,
            onChange: (a) => le(a.target.value),
            placeholder: "Search…",
            className: "h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          }
        )
      ] }),
      S && /* @__PURE__ */ d(
        C,
        {
          variant: de ? "secondary" : "outline",
          size: "sm",
          "aria-label": "Toggle filters",
          title: "Toggle filters",
          onClick: () => Ve((a) => !a),
          children: [
            /* @__PURE__ */ t(nt, { className: "h-4 w-4" }),
            "Filters",
            j.length > 0 && /* @__PURE__ */ t("span", { className: "ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs leading-none text-primary-foreground", children: j.length })
          ]
        }
      ),
      S && j.map((a) => {
        const s = e.find(
          (m) => (m.accessorKey ?? m.id) === a.id
        ), l = typeof (s == null ? void 0 : s.header) == "string" ? s.header : a.id;
        return /* @__PURE__ */ d(
          "span",
          {
            className: "inline-flex items-center gap-1 rounded-full border border-input bg-accent px-2 py-0.5 text-xs",
            children: [
              l,
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    const m = v.getColumn(a.id);
                    m == null || m.setFilterValue(void 0);
                  },
                  className: "ml-0.5 rounded-full hover:text-destructive",
                  "aria-label": `Clear filter: ${l}`,
                  children: /* @__PURE__ */ t(ot, { className: "h-3 w-3" })
                }
              )
            ]
          },
          a.id
        );
      }),
      f && Q.length > 0 && h && h.map((a) => /* @__PURE__ */ d(
        C,
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
    /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: [
      P,
      q && /* @__PURE__ */ t(
        C,
        {
          variant: "outline",
          size: "icon",
          "aria-label": "Export CSV",
          title: "Export CSV",
          onClick: () => _t(
            v.getFilteredRowModel().rows,
            e,
            k
          ),
          children: /* @__PURE__ */ t(at, { className: "h-4 w-4" })
        }
      ),
      A && /* @__PURE__ */ d("div", { className: "relative", children: [
        /* @__PURE__ */ t(
          C,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Columns",
            title: "Columns",
            onClick: () => Ee((a) => !a),
            children: /* @__PURE__ */ t(st, { className: "h-4 w-4" })
          }
        ),
        je && /* @__PURE__ */ t("div", { className: "absolute right-0 top-10 z-50 min-w-[160px] rounded-md border bg-background p-2 shadow-md", children: v.getAllLeafColumns().filter((a) => a.getCanHide()).map((a) => /* @__PURE__ */ d(
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
      T
    ] })
  ] }), Ae = S && /* @__PURE__ */ t(M, { children: v.getFlatHeaders().map((a) => {
    const s = a.column.columnDef;
    return /* @__PURE__ */ t(
      re,
      {
        className: "align-top",
        style: Z(a.column),
        children: a.isPlaceholder ? null : /* @__PURE__ */ t(
          Tt,
          {
            columnId: a.column.id,
            filterMeta: s.filterMeta,
            value: a.column.getFilterValue(),
            onChange: (l) => a.column.setFilterValue(l)
          }
        )
      },
      a.id
    );
  }) }), Be = z && /* @__PURE__ */ d("div", { className: "flex flex-wrap items-center justify-between gap-2 py-2 text-sm", children: [
    /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ t("span", { className: "text-muted-foreground", children: "Rows per page:" }),
      /* @__PURE__ */ t(
        "select",
        {
          value: v.getState().pagination.pageSize,
          onChange: (a) => v.setPageSize(Number(a.target.value)),
          className: "h-8 rounded border border-input bg-background px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring",
          children: G.map((a) => /* @__PURE__ */ t("option", { value: a, children: a }, a))
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "flex items-center gap-1", children: [
      x ? /* @__PURE__ */ t("span", { className: "text-muted-foreground", children: B > 0 ? (() => {
        const { pageIndex: a, pageSize: s } = v.getState().pagination, l = a * s + 1, m = Math.min(l + s - 1, B);
        return `${l}–${m} of ${B}`;
      })() : "…" }) : /* @__PURE__ */ t("span", { className: "text-muted-foreground", children: (() => {
        const { pageIndex: a, pageSize: s } = v.getState().pagination, l = v.getFilteredRowModel().rows.length, m = a * s + 1, V = Math.min(m + s - 1, l);
        return l > 0 ? `${m}–${V} of ${l}` : "0 of 0";
      })() }),
      /* @__PURE__ */ t(
        C,
        {
          variant: "outline",
          size: "sm",
          onClick: () => v.firstPage(),
          disabled: !v.getCanPreviousPage(),
          children: "«"
        }
      ),
      /* @__PURE__ */ t(
        C,
        {
          variant: "outline",
          size: "sm",
          onClick: () => v.previousPage(),
          disabled: !v.getCanPreviousPage(),
          children: "‹"
        }
      ),
      /* @__PURE__ */ t(
        C,
        {
          variant: "outline",
          size: "sm",
          onClick: () => v.nextPage(),
          disabled: !v.getCanNextPage(),
          children: "›"
        }
      ),
      /* @__PURE__ */ t(
        C,
        {
          variant: "outline",
          size: "sm",
          onClick: () => v.lastPage(),
          disabled: !v.getCanNextPage(),
          children: "»"
        }
      )
    ] })
  ] });
  return /* @__PURE__ */ d("div", { className: g("space-y-2", y), children: [
    Ye,
    /* @__PURE__ */ t("div", { className: "overflow-x-auto rounded-md border", children: /* @__PURE__ */ d(xe, { children: [
      /* @__PURE__ */ d(ve, { children: [
        v.getHeaderGroups().map((a) => /* @__PURE__ */ t(M, { children: a.headers.map((s) => /* @__PURE__ */ t(
          re,
          {
            colSpan: s.colSpan,
            style: {
              width: s.getSize() !== 150 ? s.getSize() : void 0,
              ...Z(s.column)
            },
            className: g(
              s.column.getIsPinned() && "shadow-[inset_-1px_0_0_0_hsl(var(--border))]"
            ),
            children: s.isPlaceholder ? null : /* @__PURE__ */ d(
              "div",
              {
                className: g(
                  "flex select-none items-center gap-1",
                  s.column.getCanSort() && "cursor-pointer hover:text-foreground"
                ),
                onClick: s.column.getCanSort() ? s.column.getToggleSortingHandler() : void 0,
                children: [
                  ge(
                    s.column.columnDef.header,
                    s.getContext()
                  ),
                  s.column.getIsSorted() === "asc" && /* @__PURE__ */ t("span", { "aria-hidden": !0, children: "↑" }),
                  s.column.getIsSorted() === "desc" && /* @__PURE__ */ t("span", { "aria-hidden": !0, children: "↓" }),
                  s.column.getIsSorted() === !1 && s.column.getCanSort() && /* @__PURE__ */ t(
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
          s.id
        )) }, a.id)),
        de && Ae
      ] }),
      /* @__PURE__ */ t(we, { children: Ue ? Array.from({ length: U }).map((a, s) => /* @__PURE__ */ t(Pt, { columnCount: W.length }, s)) : me ? /* @__PURE__ */ t(M, { children: /* @__PURE__ */ t(
        $,
        {
          colSpan: W.length,
          className: "h-24 text-center text-destructive",
          children: me
        }
      ) }) : v.getRowModel().rows.length === 0 ? /* @__PURE__ */ t(M, { children: /* @__PURE__ */ t(
        $,
        {
          colSpan: W.length,
          className: "h-24 text-center text-muted-foreground",
          children: u
        }
      ) }) : v.getRowModel().rows.flatMap((a) => {
        const s = a.getVisibleCells();
        return [
          /* @__PURE__ */ t(
            M,
            {
              "data-state": a.getIsSelected() ? "selected" : void 0,
              onClick: p ? () => p(a.original) : void 0,
              className: g(p && "cursor-pointer"),
              children: s.map((l) => /* @__PURE__ */ t(
                $,
                {
                  style: Z(l.column),
                  className: g(
                    l.column.getIsPinned() && "shadow-[inset_-1px_0_0_0_hsl(var(--border))]"
                  ),
                  children: ge(
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
                  $,
                  {
                    colSpan: s.length,
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
    Be
  ] });
}
const Se = c.createContext(
  void 0
);
function Kt({
  children: e,
  defaultTheme: n = "system",
  storageKey: r = "gt-ui-theme"
}) {
  const [o, i] = c.useState(
    () => localStorage.getItem(r) || n
  );
  c.useEffect(() => {
    const p = window.document.documentElement;
    if (p.classList.remove("light", "dark"), o === "system") {
      const w = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      p.classList.add(w);
      return;
    }
    p.classList.add(o);
  }, [o]);
  const u = c.useCallback(
    (p) => {
      localStorage.setItem(r, p), i(p);
    },
    [r]
  );
  return /* @__PURE__ */ t(Se.Provider, { value: { theme: o, setTheme: u }, children: e });
}
function Xt() {
  const e = c.useContext(Se);
  if (e === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}
const ke = c.forwardRef(({ className: e, value: n, ...r }, o) => /* @__PURE__ */ t(
  ee.Root,
  {
    ref: o,
    className: g(
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
ke.displayName = ee.Root.displayName;
let Dt = 0;
function he() {
  return `fu-${++Dt}-${Math.random().toString(36).slice(2, 7)}`;
}
function Ce(e) {
  return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`;
}
function It(e) {
  var r;
  if (e.type.startsWith("image/")) return !0;
  const n = (r = e.name.split(".").pop()) == null ? void 0 : r.toLowerCase();
  return ["jpg", "jpeg", "png", "gif", "webp", "heic", "heif", "avif"].includes(n ?? "");
}
function Lt({ file: e, className: n }) {
  const r = e.type, o = { className: g("h-8 w-8", n) };
  return r.startsWith("video/") ? /* @__PURE__ */ t(ut, { ...o }) : r.startsWith("audio/") ? /* @__PURE__ */ t(mt, { ...o }) : r.includes("zip") || r.includes("tar") || r.includes("gzip") ? /* @__PURE__ */ t(gt, { ...o }) : r.includes("javascript") || r.includes("typescript") || r.includes("json") || r.includes("html") || r.includes("css") ? /* @__PURE__ */ t(pt, { ...o }) : r.startsWith("text/") ? /* @__PURE__ */ t(ft, { ...o }) : /* @__PURE__ */ t(ht, { ...o });
}
function Mt({ entry: e, onRemove: n }) {
  const { file: r, preview: o, progress: i, status: u, error: p, id: w } = e;
  return /* @__PURE__ */ d("div", { className: "flex items-start gap-3 rounded-lg border bg-background p-3", children: [
    /* @__PURE__ */ t("div", { className: "flex-shrink-0", children: o ? /* @__PURE__ */ t(
      "img",
      {
        src: o,
        alt: r.name,
        className: "h-12 w-12 rounded object-cover"
      }
    ) : /* @__PURE__ */ t("div", { className: "flex h-12 w-12 items-center justify-center rounded bg-muted text-muted-foreground", children: /* @__PURE__ */ t(Lt, { file: r }) }) }),
    /* @__PURE__ */ d("div", { className: "min-w-0 flex-1 space-y-1", children: [
      /* @__PURE__ */ d("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ t("p", { className: "truncate text-sm font-medium", children: r.name }),
        /* @__PURE__ */ d("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
          u === "success" && /* @__PURE__ */ t(lt, { className: "h-4 w-4 text-green-500" }),
          u === "error" && /* @__PURE__ */ t(ct, { className: "h-4 w-4 text-destructive" }),
          u !== "uploading" && /* @__PURE__ */ t(
            C,
            {
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6",
              onClick: () => n(w),
              "aria-label": `Remove ${r.name}`,
              children: /* @__PURE__ */ t(dt, { className: "h-3 w-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("p", { className: "text-xs text-muted-foreground", children: Ce(r.size) }),
      u === "uploading" && /* @__PURE__ */ t(ke, { value: i, className: "h-1.5" }),
      u === "error" && p && /* @__PURE__ */ t("p", { className: "text-xs text-destructive", children: p })
    ] })
  ] });
}
function Gt({
  multiple: e = !1,
  accept: n,
  maxSize: r,
  onUpload: o,
  onChange: i,
  value: u,
  className: p,
  disabled: w = !1
}) {
  const f = u !== void 0, [N, h] = c.useState([]), F = f ? u : N, S = c.useRef(u);
  S.current = u;
  const b = c.useCallback(
    (k) => {
      if (f) {
        const T = k(S.current);
        i == null || i(T);
      } else
        h((T) => {
          const P = k(T);
          return i == null || i(P), P;
        });
    },
    [f, i]
  ), R = c.useCallback(
    async (k, T) => {
      const P = T.map((y) => ({
        id: he(),
        file: y.file,
        progress: 0,
        status: "error",
        error: y.errors.map((x) => x.message).join(", ")
      })), _ = k.map((y) => ({
        id: he(),
        file: y,
        preview: It(y) ? URL.createObjectURL(y) : void 0,
        progress: 0,
        status: o ? "uploading" : "idle"
      })), L = [..._, ...P];
      if (b(e ? (y) => [...y, ...L] : (y) => (y.forEach((x) => {
        x.preview && URL.revokeObjectURL(x.preview);
      }), L.slice(0, 1))), o)
        for (const y of _)
          try {
            await o(y.file, (x) => {
              b(
                (D) => D.map(
                  (I) => I.id === y.id ? { ...I, progress: x } : I
                )
              );
            }), b(
              (x) => x.map(
                (D) => D.id === y.id ? { ...D, status: "success", progress: 100 } : D
              )
            );
          } catch (x) {
            b(
              (D) => D.map(
                (I) => I.id === y.id ? {
                  ...I,
                  status: "error",
                  error: x instanceof Error ? x.message : "Upload failed"
                } : I
              )
            );
          }
    },
    [e, o, b]
  ), z = c.useCallback(
    (k) => {
      b((T) => {
        const P = T.find((_) => _.id === k);
        return P != null && P.preview && URL.revokeObjectURL(P.preview), T.filter((_) => _.id !== k);
      });
    },
    [b]
  );
  c.useEffect(() => () => {
    f || N.forEach((k) => {
      k.preview && URL.revokeObjectURL(k.preview);
    });
  }, []);
  const { getRootProps: U, getInputProps: G, isDragActive: A } = wt({
    onDrop: R,
    multiple: e,
    accept: n,
    maxSize: r,
    disabled: w
  }), q = F.length > 0;
  return /* @__PURE__ */ d("div", { className: g("space-y-3", p), children: [
    /* @__PURE__ */ d(
      "div",
      {
        ...U(),
        className: g(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors",
          A ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/30",
          w && "cursor-not-allowed opacity-50"
        ),
        children: [
          /* @__PURE__ */ t("input", { ...G() }),
          /* @__PURE__ */ t(it, { className: "mb-3 h-10 w-10 text-muted-foreground" }),
          A ? /* @__PURE__ */ t("p", { className: "text-sm font-medium", children: "Drop files here…" }) : /* @__PURE__ */ d(Xe, { children: [
            /* @__PURE__ */ d("p", { className: "text-sm font-medium", children: [
              /* @__PURE__ */ d("span", { className: "hidden sm:inline", children: [
                "Drag & drop files here, or",
                " ",
                /* @__PURE__ */ t("span", { className: "text-primary underline-offset-2 hover:underline", children: "click to browse" })
              ] }),
              /* @__PURE__ */ t("span", { className: "sm:hidden text-primary underline-offset-2", children: "Tap to add photos" })
            ] }),
            r && /* @__PURE__ */ d("p", { className: "mt-1 text-xs text-muted-foreground", children: [
              "Max size: ",
              Ce(r)
            ] })
          ] })
        ]
      }
    ),
    q && /* @__PURE__ */ t("div", { className: "space-y-2", children: F.map((k) => /* @__PURE__ */ t(Mt, { entry: k, onRemove: z }, k.id)) })
  ] });
}
const oe = H.Root, ae = H.Trigger, qt = H.Anchor, K = c.forwardRef(({ className: e, align: n = "center", sideOffset: r = 4, ...o }, i) => /* @__PURE__ */ t(H.Portal, { children: /* @__PURE__ */ t(
  H.Content,
  {
    ref: i,
    align: n,
    sideOffset: r,
    className: g(
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
K.displayName = H.Content.displayName;
function X({ className: e, classNames: n, showOutsideDays: r = !0, ...o }) {
  return /* @__PURE__ */ t(
    yt,
    {
      showOutsideDays: r,
      className: g("p-3", e),
      classNames: {
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center",
        button_previous: g(
          "absolute left-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-30 transition-opacity"
        ),
        button_next: g(
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
        day_button: g(
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
        dropdown: g(
          "absolute inset-0 w-full opacity-0 cursor-pointer z-10",
          "[&+span]:pointer-events-none"
        ),
        months_dropdown: "relative inline-flex items-center gap-1 text-sm font-medium cursor-pointer",
        years_dropdown: "relative inline-flex items-center gap-1 text-sm font-medium cursor-pointer",
        chevron: "h-4 w-4 text-muted-foreground",
        ...n
      },
      components: {
        Chevron: ({ orientation: i, ...u }) => i === "left" ? /* @__PURE__ */ t(bt, { ...u, className: "h-4 w-4" }) : /* @__PURE__ */ t(xt, { ...u, className: "h-4 w-4" })
      },
      ...o
    }
  );
}
X.displayName = "Calendar";
function zt() {
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
function Jt({
  value: e,
  onChange: n,
  placeholder: r = "Pick a date",
  disabled: o = !1,
  className: i,
  timeZone: u,
  fromYear: p,
  toYear: w
}) {
  const f = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ d(oe, { children: [
    /* @__PURE__ */ t(ae, { asChild: !0, children: /* @__PURE__ */ d(
      C,
      {
        variant: "outline",
        disabled: o,
        className: g(
          "w-[240px] justify-start text-left font-normal",
          !e && "text-muted-foreground",
          i
        ),
        children: [
          /* @__PURE__ */ t(ne, { className: "mr-2 h-4 w-4" }),
          e ? Y(e, "PPP") : /* @__PURE__ */ t("span", { children: r })
        ]
      }
    ) }),
    /* @__PURE__ */ t(K, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ t(
      X,
      {
        mode: "single",
        selected: e,
        onSelect: n,
        captionLayout: "dropdown",
        startMonth: new Date(p ?? f - 80, 0),
        endMonth: new Date(w ?? f + 10, 11),
        timeZone: u,
        autoFocus: !0
      }
    ) })
  ] });
}
function Qt({
  value: e,
  onChange: n,
  placeholder: r = "Pick date & time",
  disabled: o = !1,
  className: i,
  timeZone: u,
  fromYear: p,
  toYear: w
}) {
  const f = (/* @__PURE__ */ new Date()).getFullYear(), N = (S) => {
    if (!S) {
      n == null || n(void 0);
      return;
    }
    const b = e ? e.getHours() : 0, R = e ? e.getMinutes() : 0;
    n == null || n(pe(fe(S, b), R));
  }, h = (S) => {
    const [b, R] = S.target.value.split(":").map(Number), z = e ?? /* @__PURE__ */ new Date();
    n == null || n(pe(fe(z, b), R));
  }, F = e ? `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}` : "";
  return /* @__PURE__ */ d(oe, { children: [
    /* @__PURE__ */ t(ae, { asChild: !0, children: /* @__PURE__ */ d(
      C,
      {
        variant: "outline",
        disabled: o,
        className: g(
          "w-[280px] justify-start text-left font-normal",
          !e && "text-muted-foreground",
          i
        ),
        children: [
          /* @__PURE__ */ t(ne, { className: "mr-2 h-4 w-4" }),
          e ? Y(e, "PPP HH:mm") : /* @__PURE__ */ t("span", { children: r })
        ]
      }
    ) }),
    /* @__PURE__ */ d(K, { className: "w-auto p-0", align: "start", children: [
      /* @__PURE__ */ t(
        X,
        {
          mode: "single",
          selected: e,
          onSelect: N,
          captionLayout: "dropdown",
          startMonth: new Date(p ?? f - 80, 0),
          endMonth: new Date(w ?? f + 10, 11),
          timeZone: u,
          autoFocus: !0
        }
      ),
      /* @__PURE__ */ d("div", { className: "border-t p-3 flex items-center gap-2", children: [
        /* @__PURE__ */ t(vt, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
        /* @__PURE__ */ t("label", { className: "text-sm text-muted-foreground sr-only", htmlFor: "time-input", children: "Time" }),
        /* @__PURE__ */ t(
          "input",
          {
            id: "time-input",
            type: "time",
            value: F,
            onChange: h,
            className: g(
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
function Zt({
  value: e,
  onChange: n,
  placeholder: r = "Pick a date range",
  disabled: o = !1,
  className: i,
  timeZone: u,
  fromYear: p,
  toYear: w,
  presets: f,
  numberOfMonths: N = 2
}) {
  const h = (/* @__PURE__ */ new Date()).getFullYear(), F = f ?? zt(), S = e != null && e.from ? e.to ? `${Y(e.from, "LLL dd, y")} – ${Y(e.to, "LLL dd, y")}` : Y(e.from, "LLL dd, y") : r;
  return /* @__PURE__ */ d(oe, { children: [
    /* @__PURE__ */ t(ae, { asChild: !0, children: /* @__PURE__ */ d(
      C,
      {
        variant: "outline",
        disabled: o,
        className: g(
          "w-[300px] justify-start text-left font-normal",
          !(e != null && e.from) && "text-muted-foreground",
          i
        ),
        children: [
          /* @__PURE__ */ t(ne, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ t("span", { className: "truncate", children: S })
        ]
      }
    ) }),
    /* @__PURE__ */ t(K, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ d("div", { className: "flex flex-col sm:flex-row", children: [
      F.length > 0 && /* @__PURE__ */ d("div", { className: "flex flex-col gap-1 border-b sm:border-b-0 sm:border-r p-2 min-w-[140px]", children: [
        /* @__PURE__ */ t("p", { className: "px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Presets" }),
        F.map((b) => /* @__PURE__ */ t(
          C,
          {
            variant: "ghost",
            size: "sm",
            className: "justify-start font-normal",
            onClick: () => n == null ? void 0 : n(b.range()),
            children: b.label
          },
          b.label
        ))
      ] }),
      /* @__PURE__ */ t(
        X,
        {
          mode: "range",
          selected: e,
          onSelect: n,
          captionLayout: "dropdown",
          startMonth: new Date(p ?? h - 80, 0),
          endMonth: new Date(w ?? h + 10, 11),
          numberOfMonths: N,
          timeZone: u,
          autoFocus: !0
        }
      )
    ] }) })
  ] });
}
export {
  C as Button,
  X as Calendar,
  Wt as DataTable,
  Jt as DatePicker,
  Zt as DateRangePicker,
  Qt as DateTimePicker,
  Gt as FileUpload,
  kt as Loader,
  oe as Popover,
  qt as PopoverAnchor,
  K as PopoverContent,
  ae as PopoverTrigger,
  ke as Progress,
  te as Spinner,
  xe as Table,
  we as TableBody,
  Rt as TableCaption,
  $ as TableCell,
  Ct as TableFooter,
  re as TableHead,
  ve as TableHeader,
  M as TableRow,
  Kt as ThemeProvider,
  Nt as buttonVariants,
  g as cn,
  Ft as formatCellValue,
  zt as getDefaultPresets,
  St as spinnerVariants,
  Xt as useTheme
};
//# sourceMappingURL=index.js.map
