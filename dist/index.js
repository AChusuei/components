import { clsx as We } from "clsx";
import { twMerge as Ke } from "tailwind-merge";
import { jsx as t, jsxs as d, Fragment as Xe } from "react/jsx-runtime";
import * as c from "react";
import { Slot as Ge } from "@radix-ui/react-slot";
import { cva as ve } from "class-variance-authority";
import { useReactTable as qe, getExpandedRowModel as Je, getPaginationRowModel as Qe, getSortedRowModel as Ze, getFilteredRowModel as et, getCoreRowModel as tt, flexRender as pe } from "@tanstack/react-table";
import { Search as rt, SlidersHorizontal as nt, X as ot, Download as at, Columns2 as st, UploadCloudIcon as it, CheckCircleIcon as lt, AlertCircleIcon as dt, XIcon as ct, FileVideoIcon as ut, FileAudioIcon as mt, FileArchiveIcon as gt, FileCodeIcon as pt, FileTextIcon as ft, FileIcon as ht, ChevronLeft as bt, ChevronRight as xt, CalendarIcon as ne, Clock as vt } from "lucide-react";
import * as te from "@radix-ui/react-progress";
import { useDropzone as wt } from "react-dropzone";
import * as H from "@radix-ui/react-popover";
import { DayPicker as yt } from "react-day-picker";
import { format as Y, setMinutes as fe, setHours as he } from "date-fns";
function g(...e) {
  return Ke(We(e));
}
const Nt = ve(
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
), k = c.forwardRef(
  ({ className: e, variant: n, size: r, asChild: o = !1, ...i }, m) => /* @__PURE__ */ t(
    o ? Ge : "button",
    {
      className: g(Nt({ variant: n, size: r, className: e })),
      ref: m,
      ...i
    }
  )
);
k.displayName = "Button";
const St = ve(
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
), re = c.forwardRef(
  ({ className: e, size: n, color: r, label: o = "Loading...", ...i }, m) => /* @__PURE__ */ t(
    "div",
    {
      ref: m,
      role: "status",
      "aria-label": o,
      className: g(St({ size: n, color: r }), e),
      ...i,
      children: /* @__PURE__ */ t("span", { className: "sr-only", children: o })
    }
  )
);
re.displayName = "Spinner";
const kt = c.forwardRef(
  ({ overlay: e = !1, className: n, ...r }, o) => e ? /* @__PURE__ */ t(
    "div",
    {
      className: "absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
      "aria-live": "polite",
      children: /* @__PURE__ */ t(re, { ref: o, className: n, ...r })
    }
  ) : /* @__PURE__ */ t(re, { ref: o, className: n, ...r })
);
kt.displayName = "Loader";
const we = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ t(
  "table",
  {
    ref: r,
    className: g("w-full caption-bottom text-sm", e),
    ...n
  }
) }));
we.displayName = "Table";
const ye = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t("thead", { ref: r, className: g("[&_tr]:border-b", e), ...n }));
ye.displayName = "TableHeader";
const Ne = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
  "tbody",
  {
    ref: r,
    className: g("[&_tr:last-child]:border-0", e),
    ...n
  }
));
Ne.displayName = "TableBody";
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
const z = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
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
z.displayName = "TableRow";
const Se = c.forwardRef(({ className: e, ...n }, r) => /* @__PURE__ */ t(
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
Se.displayName = "TableHead";
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
      const o = String(e), i = (r = n.variants) == null ? void 0 : r[o], m = (i == null ? void 0 : i.label) ?? o, p = (i == null ? void 0 : i.className) ?? "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground";
      return /* @__PURE__ */ t("span", { className: p, children: m });
    }
    default:
      return String(e);
  }
}
function Pt({ columnCount: e }) {
  return /* @__PURE__ */ t(z, { children: Array.from({ length: e }).map((n, r) => /* @__PURE__ */ t($, { children: /* @__PURE__ */ t("div", { className: "h-4 w-full animate-pulse rounded bg-muted" }) }, r)) });
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
        className: "h-8 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
        children: [
          /* @__PURE__ */ t("option", { value: "", children: "All" }),
          e.options.map((o) => /* @__PURE__ */ t("option", { value: o.value, children: o.label }, o.value))
        ]
      }
    );
  if (e.filterVariant === "dateRange") {
    const o = n ?? [void 0, void 0];
    return /* @__PURE__ */ d("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "date",
          value: o[0] ?? "",
          onChange: (i) => r([i.target.value || void 0, o[1]]),
          className: "h-8 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
          placeholder: "From"
        }
      ),
      /* @__PURE__ */ t(
        "input",
        {
          type: "date",
          value: o[1] ?? "",
          onChange: (i) => r([o[0], i.target.value || void 0]),
          className: "h-8 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
          placeholder: "To"
        }
      )
    ] });
  }
  if (e.filterVariant === "numberRange") {
    const o = n ?? [void 0, void 0];
    return /* @__PURE__ */ d("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ t(
        "input",
        {
          type: "number",
          value: o[0] ?? "",
          onChange: (i) => r([
            i.target.value !== "" ? Number(i.target.value) : void 0,
            o[1]
          ]),
          className: "h-8 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
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
          className: "h-8 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
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
      className: "h-8 w-full rounded border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring",
      placeholder: "Filter…"
    }
  );
}
const ke = (e, n, r) => {
  const [o, i] = r, m = e.getValue(n);
  return m ? !(o && m < o || i && m > i) : !0;
};
ke.autoRemove = (e) => {
  const [n, r] = e;
  return !n && !r;
};
const Ce = (e, n, r) => {
  const [o, i] = r, m = e.getValue(n);
  return !(o !== void 0 && m < o || i !== void 0 && m > i);
};
Ce.autoRemove = (e) => {
  const [n, r] = e;
  return n === void 0 && r === void 0;
};
function _t(e, n, r) {
  const o = n.filter(
    (h) => h.id !== "__select__" && h.id !== "__actions__"
  ), i = o.map((h) => typeof h.header == "string" ? h.header : h.accessorKey ?? h.id ?? ""), m = e.map(
    (h) => o.map((F) => {
      const C = F.accessorKey ?? F.id ?? "", b = h.getValue(C), R = b == null ? "" : String(b);
      return R.includes(",") || R.includes('"') || R.includes(`
`) ? `"${R.replace(/"/g, '""')}"` : R;
    })
  ), p = [i, ...m].map((h) => h.join(",")).join(`
`), w = new Blob([p], { type: "text/csv;charset=utf-8;" }), f = URL.createObjectURL(w), N = document.createElement("a");
  N.href = f, N.setAttribute("download", `${r}.csv`), document.body.appendChild(N), N.click(), document.body.removeChild(N), URL.revokeObjectURL(f);
}
function be(e) {
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
  emptyMessage: m = "No results.",
  onRowClick: p,
  rowActions: w,
  enableRowSelection: f = !1,
  onSelectionChange: N,
  bulkActions: h,
  enableGlobalFilter: F = !0,
  enableColumnFilters: C = !1,
  enableSorting: b = !0,
  enableMultiSort: R = !1,
  enablePagination: j = !0,
  defaultPageSize: U = 20,
  pageSizeOptions: q = [20, 50, 100],
  enableColumnVisibility: O = !0,
  enableExport: J = !1,
  exportFilename: S = "export",
  refreshSlot: T,
  toolbarActionsSlot: P,
  enableRowExpansion: _ = !1,
  renderSubRow: M,
  className: y
}) {
  const x = !!r, [D, I] = c.useState([]), [A, Te] = c.useState(0), [_e, se] = c.useState(x), [De, ie] = c.useState(null), [Q, Ie] = c.useState([]), [L, le] = c.useState(
    []
  ), [B, de] = c.useState(""), [Le, Me] = c.useState({}), [ce, ze] = c.useState({}), [je, Ee] = c.useState({}), [Ve, $e] = c.useState(!1), [W, ue] = c.useState(!1), Z = c.useRef(null);
  c.useEffect(() => {
    if (!W) return;
    function a(s) {
      Z.current && !Z.current.contains(s.target) && ue(!1);
    }
    return document.addEventListener("mousedown", a), () => document.removeEventListener("mousedown", a);
  }, [W]);
  const [E, He] = c.useState({
    pageIndex: 0,
    pageSize: U
  }), [Ue] = c.useState(() => {
    const a = [], s = [];
    for (const l of e) {
      const u = l.accessorKey ?? l.id ?? "";
      u && l.pin === "left" && a.push(u), u && l.pin === "right" && s.push(u);
    }
    return { left: a, right: s };
  });
  c.useEffect(() => {
    if (!r) return;
    let a = !1;
    return se(!0), ie(null), r({
      page: E.pageIndex,
      pageSize: E.pageSize,
      sorting: Q.map((s) => ({ id: s.id, desc: s.desc })),
      filters: L.map((s) => ({ id: s.id, value: s.value })),
      globalFilter: B
    }).then(({ data: s, total: l }) => {
      a || (I(s), Te(l));
    }).catch((s) => {
      a || ie(
        s instanceof Error ? s.message : "Failed to load data"
      );
    }).finally(() => {
      a || se(!1);
    }), () => {
      a = !0;
    };
  }, [r, E.pageIndex, E.pageSize, Q, L, B]);
  const K = c.useMemo(() => {
    const a = [];
    _ && M && a.push({
      id: "__expand__",
      header: () => null,
      cell: ({ row: l }) => l.getCanExpand() ? /* @__PURE__ */ t(
        "button",
        {
          onClick: (u) => {
            u.stopPropagation(), l.toggleExpanded();
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
          ref: (u) => {
            u && (u.indeterminate = l.getIsSomePageRowsSelected() && !l.getIsAllPageRowsSelected());
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
          onClick: (u) => u.stopPropagation(),
          className: "h-4 w-4 cursor-pointer"
        }
      ),
      enableSorting: !1,
      enableHiding: !1,
      size: 40
    });
    const s = e.map((l) => {
      if (!l.formatter || l.cell) return l;
      const u = l.formatter;
      return {
        ...l,
        cell: ({ getValue: V }) => Ft(V(), u)
      };
    });
    return a.push(...s), w && w.length > 0 && a.push({
      id: "__actions__",
      header: "Actions",
      cell: ({ row: l }) => /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: w.map((u) => {
        var V;
        return (V = u.hidden) != null && V.call(u, l.original) ? null : /* @__PURE__ */ t(
          k,
          {
            variant: u.variant ?? "ghost",
            size: "sm",
            onClick: (Be) => {
              Be.stopPropagation(), u.onClick(l.original);
            },
            children: u.label
          },
          u.label
        );
      }) }),
      enableSorting: !1,
      enableHiding: !1
    }), a;
  }, [e, _, f, M, w]), me = x ? D : n ?? [], Ye = o || _e, ge = i ?? De, v = qe({
    data: me,
    columns: K,
    filterFns: {
      dateRange: ke,
      numberRange: Ce
    },
    state: {
      sorting: Q,
      columnFilters: L,
      globalFilter: B,
      columnVisibility: Le,
      rowSelection: ce,
      expanded: je,
      pagination: E,
      columnPinning: Ue
    },
    // Server-side flags
    manualSorting: x,
    manualFiltering: x,
    manualPagination: x,
    pageCount: x ? Math.ceil(A / E.pageSize) : void 0,
    // Row expansion
    getRowCanExpand: () => _ && !!M,
    // State handlers
    enableRowSelection: f,
    enableMultiRowSelection: f,
    enableSorting: b,
    enableMultiSort: R,
    onSortingChange: Ie,
    onColumnFiltersChange: le,
    onGlobalFilterChange: de,
    onColumnVisibilityChange: Me,
    onExpandedChange: Ee,
    onPaginationChange: He,
    onRowSelectionChange: (a) => {
      const s = typeof a == "function" ? a(ce) : a;
      if (ze(s), N) {
        const l = Object.keys(s).filter((u) => s[u]).map((u) => me[Number(u)]);
        N(l);
      }
    },
    getCoreRowModel: tt(),
    getFilteredRowModel: x ? void 0 : et(),
    getSortedRowModel: x ? void 0 : Ze(),
    getPaginationRowModel: j ? Qe() : void 0,
    getExpandedRowModel: Je(),
    initialState: {
      pagination: { pageSize: U }
    }
  }), ee = v.getSelectedRowModel().rows.map((a) => a.original), Oe = /* @__PURE__ */ d("div", { className: "flex flex-wrap items-center justify-between gap-2 px-3 py-2", children: [
    /* @__PURE__ */ d("div", { className: "flex flex-1 flex-wrap items-center gap-2", children: [
      F && /* @__PURE__ */ d("div", { className: "relative min-w-[180px] max-w-[320px]", children: [
        /* @__PURE__ */ t(rt, { className: "absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ t(
          "input",
          {
            value: B,
            onChange: (a) => de(a.target.value),
            placeholder: "Search…",
            className: "h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          }
        )
      ] }),
      C && /* @__PURE__ */ d("div", { className: "relative", ref: Z, children: [
        /* @__PURE__ */ d(
          k,
          {
            variant: W ? "secondary" : "outline",
            size: "sm",
            "aria-label": "Toggle filters",
            title: "Toggle filters",
            onClick: () => ue((a) => !a),
            children: [
              /* @__PURE__ */ t(nt, { className: "h-4 w-4" }),
              "Filters",
              L.length > 0 && /* @__PURE__ */ t("span", { className: "ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs leading-none text-primary-foreground", children: L.length })
            ]
          }
        ),
        W && /* @__PURE__ */ d("div", { className: "absolute left-0 top-[calc(100%+4px)] z-50 w-[520px] rounded-lg border bg-popover p-4 shadow-lg", children: [
          /* @__PURE__ */ d("div", { className: "mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t("span", { className: "text-sm font-semibold", children: "Filters" }),
              L.length > 0 && /* @__PURE__ */ d("span", { className: "rounded-full bg-primary px-2 py-0.5 text-xs leading-none text-primary-foreground", children: [
                L.length,
                " active"
              ] })
            ] }),
            L.length > 0 && /* @__PURE__ */ t(
              "button",
              {
                onClick: () => le([]),
                className: "text-xs text-muted-foreground hover:text-foreground",
                children: "Clear all"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-x-4 gap-y-3", children: v.getFlatHeaders().map((a) => {
            const s = a.column.columnDef;
            if (!s.filterMeta) return null;
            const l = typeof s.header == "string" ? s.header : a.column.id;
            return /* @__PURE__ */ d("div", { children: [
              /* @__PURE__ */ t("label", { className: "mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground", children: l }),
              /* @__PURE__ */ t(
                Tt,
                {
                  columnId: a.column.id,
                  filterMeta: s.filterMeta,
                  value: a.column.getFilterValue(),
                  onChange: (u) => a.column.setFilterValue(u)
                }
              )
            ] }, a.id);
          }) })
        ] })
      ] }),
      C && L.map((a) => {
        const s = e.find(
          (u) => (u.accessorKey ?? u.id) === a.id
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
                    const u = v.getColumn(a.id);
                    u == null || u.setFilterValue(void 0);
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
      f && ee.length > 0 && h && h.map((a) => /* @__PURE__ */ d(
        k,
        {
          variant: a.variant ?? "outline",
          size: "sm",
          onClick: () => a.onClick(ee),
          children: [
            a.label,
            " (",
            ee.length,
            ")"
          ]
        },
        a.label
      ))
    ] }),
    /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: [
      P,
      J && /* @__PURE__ */ t(
        k,
        {
          variant: "outline",
          size: "sm",
          "aria-label": "Export CSV",
          title: "Export CSV",
          onClick: () => _t(
            v.getFilteredRowModel().rows,
            e,
            S
          ),
          children: /* @__PURE__ */ t(at, { className: "h-4 w-4" })
        }
      ),
      O && /* @__PURE__ */ d("div", { className: "relative", children: [
        /* @__PURE__ */ t(
          k,
          {
            variant: "outline",
            size: "sm",
            "aria-label": "Columns",
            title: "Columns",
            onClick: () => $e((a) => !a),
            children: /* @__PURE__ */ t(st, { className: "h-4 w-4" })
          }
        ),
        Ve && /* @__PURE__ */ t("div", { className: "absolute right-0 top-10 z-50 min-w-[160px] rounded-md border bg-background p-2 shadow-md", children: v.getAllLeafColumns().filter((a) => a.getCanHide()).map((a) => /* @__PURE__ */ d(
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
  ] }), Ae = j && /* @__PURE__ */ d("div", { className: "flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 text-sm", children: [
    /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ t("span", { className: "text-muted-foreground", children: "Rows per page:" }),
      /* @__PURE__ */ t(
        "select",
        {
          value: v.getState().pagination.pageSize,
          onChange: (a) => v.setPageSize(Number(a.target.value)),
          className: "h-8 rounded border border-input bg-background px-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring",
          children: q.map((a) => /* @__PURE__ */ t("option", { value: a, children: a }, a))
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "flex items-center gap-1", children: [
      x ? /* @__PURE__ */ t("span", { className: "text-muted-foreground", children: A > 0 ? (() => {
        const { pageIndex: a, pageSize: s } = v.getState().pagination, l = a * s + 1, u = Math.min(l + s - 1, A);
        return `${l}–${u} of ${A}`;
      })() : "…" }) : /* @__PURE__ */ t("span", { className: "text-muted-foreground", children: (() => {
        const { pageIndex: a, pageSize: s } = v.getState().pagination, l = v.getFilteredRowModel().rows.length, u = a * s + 1, V = Math.min(u + s - 1, l);
        return l > 0 ? `${u}–${V} of ${l}` : "0 of 0";
      })() }),
      /* @__PURE__ */ t(
        k,
        {
          variant: "outline",
          size: "sm",
          onClick: () => v.firstPage(),
          disabled: !v.getCanPreviousPage(),
          children: "«"
        }
      ),
      /* @__PURE__ */ t(
        k,
        {
          variant: "outline",
          size: "sm",
          onClick: () => v.previousPage(),
          disabled: !v.getCanPreviousPage(),
          children: "‹"
        }
      ),
      /* @__PURE__ */ t(
        k,
        {
          variant: "outline",
          size: "sm",
          onClick: () => v.nextPage(),
          disabled: !v.getCanNextPage(),
          children: "›"
        }
      ),
      /* @__PURE__ */ t(
        k,
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
    Oe,
    /* @__PURE__ */ t("div", { className: "overflow-x-auto rounded-md border", children: /* @__PURE__ */ d(we, { children: [
      /* @__PURE__ */ t(ye, { children: v.getHeaderGroups().map((a) => /* @__PURE__ */ t(z, { children: a.headers.map((s) => /* @__PURE__ */ t(
        Se,
        {
          colSpan: s.colSpan,
          style: {
            width: s.getSize() !== 150 ? s.getSize() : void 0,
            ...be(s.column)
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
                pe(
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
      )) }, a.id)) }),
      /* @__PURE__ */ t(Ne, { children: Ye ? Array.from({ length: U }).map((a, s) => /* @__PURE__ */ t(Pt, { columnCount: K.length }, s)) : ge ? /* @__PURE__ */ t(z, { children: /* @__PURE__ */ t(
        $,
        {
          colSpan: K.length,
          className: "h-24 text-center text-destructive",
          children: ge
        }
      ) }) : v.getRowModel().rows.length === 0 ? /* @__PURE__ */ t(z, { children: /* @__PURE__ */ t(
        $,
        {
          colSpan: K.length,
          className: "h-24 text-center text-muted-foreground",
          children: m
        }
      ) }) : v.getRowModel().rows.flatMap((a) => {
        const s = a.getVisibleCells();
        return [
          /* @__PURE__ */ t(
            z,
            {
              "data-state": a.getIsSelected() ? "selected" : void 0,
              onClick: p ? () => p(a.original) : void 0,
              className: g(p && "cursor-pointer"),
              children: s.map((l) => /* @__PURE__ */ t(
                $,
                {
                  style: be(l.column),
                  className: g(
                    l.column.getIsPinned() && "shadow-[inset_-1px_0_0_0_hsl(var(--border))]"
                  ),
                  children: pe(
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
          ...a.getIsExpanded() && M ? [
            /* @__PURE__ */ t(
              z,
              {
                className: "bg-muted/30 hover:bg-muted/30",
                children: /* @__PURE__ */ t(
                  $,
                  {
                    colSpan: s.length,
                    className: "px-4 py-3",
                    children: M(a.original)
                  }
                )
              },
              `${a.id}__expanded`
            )
          ] : []
        ];
      }) })
    ] }) }),
    Ae
  ] });
}
const Re = c.createContext(
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
  const m = c.useCallback(
    (p) => {
      localStorage.setItem(r, p), i(p);
    },
    [r]
  );
  return /* @__PURE__ */ t(Re.Provider, { value: { theme: o, setTheme: m }, children: e });
}
function Xt() {
  const e = c.useContext(Re);
  if (e === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return e;
}
const Fe = c.forwardRef(({ className: e, value: n, ...r }, o) => /* @__PURE__ */ t(
  te.Root,
  {
    ref: o,
    className: g(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      e
    ),
    ...r,
    children: /* @__PURE__ */ t(
      te.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (n || 0)}%)` }
      }
    )
  }
));
Fe.displayName = te.Root.displayName;
let Dt = 0;
function xe() {
  return `fu-${++Dt}-${Math.random().toString(36).slice(2, 7)}`;
}
function Pe(e) {
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
  const { file: r, preview: o, progress: i, status: m, error: p, id: w } = e;
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
          m === "success" && /* @__PURE__ */ t(lt, { className: "h-4 w-4 text-green-500" }),
          m === "error" && /* @__PURE__ */ t(dt, { className: "h-4 w-4 text-destructive" }),
          m !== "uploading" && /* @__PURE__ */ t(
            k,
            {
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6",
              onClick: () => n(w),
              "aria-label": `Remove ${r.name}`,
              children: /* @__PURE__ */ t(ct, { className: "h-3 w-3" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("p", { className: "text-xs text-muted-foreground", children: Pe(r.size) }),
      m === "uploading" && /* @__PURE__ */ t(Fe, { value: i, className: "h-1.5" }),
      m === "error" && p && /* @__PURE__ */ t("p", { className: "text-xs text-destructive", children: p })
    ] })
  ] });
}
function Gt({
  multiple: e = !1,
  accept: n,
  maxSize: r,
  onUpload: o,
  onChange: i,
  value: m,
  className: p,
  disabled: w = !1
}) {
  const f = m !== void 0, [N, h] = c.useState([]), F = f ? m : N, C = c.useRef(m);
  C.current = m;
  const b = c.useCallback(
    (S) => {
      if (f) {
        const T = S(C.current);
        i == null || i(T);
      } else
        h((T) => {
          const P = S(T);
          return i == null || i(P), P;
        });
    },
    [f, i]
  ), R = c.useCallback(
    async (S, T) => {
      const P = T.map((y) => ({
        id: xe(),
        file: y.file,
        progress: 0,
        status: "error",
        error: y.errors.map((x) => x.message).join(", ")
      })), _ = S.map((y) => ({
        id: xe(),
        file: y,
        preview: It(y) ? URL.createObjectURL(y) : void 0,
        progress: 0,
        status: o ? "uploading" : "idle"
      })), M = [..._, ...P];
      if (b(e ? (y) => [...y, ...M] : (y) => (y.forEach((x) => {
        x.preview && URL.revokeObjectURL(x.preview);
      }), M.slice(0, 1))), o)
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
  ), j = c.useCallback(
    (S) => {
      b((T) => {
        const P = T.find((_) => _.id === S);
        return P != null && P.preview && URL.revokeObjectURL(P.preview), T.filter((_) => _.id !== S);
      });
    },
    [b]
  );
  c.useEffect(() => () => {
    f || N.forEach((S) => {
      S.preview && URL.revokeObjectURL(S.preview);
    });
  }, []);
  const { getRootProps: U, getInputProps: q, isDragActive: O } = wt({
    onDrop: R,
    multiple: e,
    accept: n,
    maxSize: r,
    disabled: w
  }), J = F.length > 0;
  return /* @__PURE__ */ d("div", { className: g("space-y-3", p), children: [
    /* @__PURE__ */ d(
      "div",
      {
        ...U(),
        className: g(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors",
          O ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/30",
          w && "cursor-not-allowed opacity-50"
        ),
        children: [
          /* @__PURE__ */ t("input", { ...q() }),
          /* @__PURE__ */ t(it, { className: "mb-3 h-10 w-10 text-muted-foreground" }),
          O ? /* @__PURE__ */ t("p", { className: "text-sm font-medium", children: "Drop files here…" }) : /* @__PURE__ */ d(Xe, { children: [
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
              Pe(r)
            ] })
          ] })
        ]
      }
    ),
    J && /* @__PURE__ */ t("div", { className: "space-y-2", children: F.map((S) => /* @__PURE__ */ t(Mt, { entry: S, onRemove: j }, S.id)) })
  ] });
}
const oe = H.Root, ae = H.Trigger, qt = H.Anchor, X = c.forwardRef(({ className: e, align: n = "center", sideOffset: r = 4, ...o }, i) => /* @__PURE__ */ t(H.Portal, { children: /* @__PURE__ */ t(
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
X.displayName = H.Content.displayName;
function G({ className: e, classNames: n, showOutsideDays: r = !0, ...o }) {
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
        Chevron: ({ orientation: i, ...m }) => i === "left" ? /* @__PURE__ */ t(bt, { ...m, className: "h-4 w-4" }) : /* @__PURE__ */ t(xt, { ...m, className: "h-4 w-4" })
      },
      ...o
    }
  );
}
G.displayName = "Calendar";
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
  timeZone: m,
  fromYear: p,
  toYear: w
}) {
  const f = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ d(oe, { children: [
    /* @__PURE__ */ t(ae, { asChild: !0, children: /* @__PURE__ */ d(
      k,
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
    /* @__PURE__ */ t(X, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ t(
      G,
      {
        mode: "single",
        selected: e,
        onSelect: n,
        captionLayout: "dropdown",
        startMonth: new Date(p ?? f - 80, 0),
        endMonth: new Date(w ?? f + 10, 11),
        timeZone: m,
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
  timeZone: m,
  fromYear: p,
  toYear: w
}) {
  const f = (/* @__PURE__ */ new Date()).getFullYear(), N = (C) => {
    if (!C) {
      n == null || n(void 0);
      return;
    }
    const b = e ? e.getHours() : 0, R = e ? e.getMinutes() : 0;
    n == null || n(fe(he(C, b), R));
  }, h = (C) => {
    const [b, R] = C.target.value.split(":").map(Number), j = e ?? /* @__PURE__ */ new Date();
    n == null || n(fe(he(j, b), R));
  }, F = e ? `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}` : "";
  return /* @__PURE__ */ d(oe, { children: [
    /* @__PURE__ */ t(ae, { asChild: !0, children: /* @__PURE__ */ d(
      k,
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
    /* @__PURE__ */ d(X, { className: "w-auto p-0", align: "start", children: [
      /* @__PURE__ */ t(
        G,
        {
          mode: "single",
          selected: e,
          onSelect: N,
          captionLayout: "dropdown",
          startMonth: new Date(p ?? f - 80, 0),
          endMonth: new Date(w ?? f + 10, 11),
          timeZone: m,
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
  timeZone: m,
  fromYear: p,
  toYear: w,
  presets: f,
  numberOfMonths: N = 2
}) {
  const h = (/* @__PURE__ */ new Date()).getFullYear(), F = f ?? zt(), C = e != null && e.from ? e.to ? `${Y(e.from, "LLL dd, y")} – ${Y(e.to, "LLL dd, y")}` : Y(e.from, "LLL dd, y") : r;
  return /* @__PURE__ */ d(oe, { children: [
    /* @__PURE__ */ t(ae, { asChild: !0, children: /* @__PURE__ */ d(
      k,
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
          /* @__PURE__ */ t("span", { className: "truncate", children: C })
        ]
      }
    ) }),
    /* @__PURE__ */ t(X, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ d("div", { className: "flex flex-col sm:flex-row", children: [
      F.length > 0 && /* @__PURE__ */ d("div", { className: "flex flex-col gap-1 border-b sm:border-b-0 sm:border-r p-2 min-w-[140px]", children: [
        /* @__PURE__ */ t("p", { className: "px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wide", children: "Presets" }),
        F.map((b) => /* @__PURE__ */ t(
          k,
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
        G,
        {
          mode: "range",
          selected: e,
          onSelect: n,
          captionLayout: "dropdown",
          startMonth: new Date(p ?? h - 80, 0),
          endMonth: new Date(w ?? h + 10, 11),
          numberOfMonths: N,
          timeZone: m,
          autoFocus: !0
        }
      )
    ] }) })
  ] });
}
export {
  k as Button,
  G as Calendar,
  Wt as DataTable,
  Jt as DatePicker,
  Zt as DateRangePicker,
  Qt as DateTimePicker,
  Gt as FileUpload,
  kt as Loader,
  oe as Popover,
  qt as PopoverAnchor,
  X as PopoverContent,
  ae as PopoverTrigger,
  Fe as Progress,
  re as Spinner,
  we as Table,
  Ne as TableBody,
  Rt as TableCaption,
  $ as TableCell,
  Ct as TableFooter,
  Se as TableHead,
  ye as TableHeader,
  z as TableRow,
  Kt as ThemeProvider,
  Nt as buttonVariants,
  g as cn,
  Ft as formatCellValue,
  zt as getDefaultPresets,
  St as spinnerVariants,
  Xt as useTheme
};
//# sourceMappingURL=index.js.map
