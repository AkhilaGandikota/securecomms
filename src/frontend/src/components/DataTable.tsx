/**
 * DataTable — generic sortable, paginated table component.
 * Used by the Admin Dashboard for messages, access logs, and flagged users.
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────────

export interface ColumnDef<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: ColumnDef<T>[];
  data: T[];
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  emptyMessage?: string;
  "data-ocid"?: string;
}

type SortDir = "asc" | "desc" | null;

// ─── Sort icon ───────────────────────────────────────────────────────────────────

function SortIcon({ direction }: { direction: SortDir }) {
  if (direction === "asc") return <ChevronUp className="w-3 h-3 ml-1 inline" />;
  if (direction === "desc")
    return <ChevronDown className="w-3 h-3 ml-1 inline" />;
  return <ChevronsUpDown className="w-3 h-3 ml-1 inline opacity-40" />;
}

// ─── DataTable ───────────────────────────────────────────────────────────────────

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 10,
  searchable = false,
  searchPlaceholder = "Search...",
  searchKeys = [],
  emptyMessage = "No data found.",
  "data-ocid": dataOcid,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Search filter
  const filtered = useMemo(() => {
    if (!searchQuery.trim() || searchKeys.length === 0) return data;
    const q = searchQuery.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) => {
        const val = row[k];
        return val != null && String(val).toLowerCase().includes(q);
      }),
    );
  }, [data, searchQuery, searchKeys]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      const cmp = av.localeCompare(bv, undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = sorted.slice((page - 1) * pageSize, page * pageSize);

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortKey(null);
      setSortDir(null);
    } else {
      setSortDir("asc");
    }
    setPage(1);
  }

  return (
    <div data-ocid={dataOcid} className="flex flex-col gap-3">
      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            data-ocid={dataOcid ? `${dataOcid}.search_input` : undefined}
            className="pl-9 bg-card border-border font-mono text-sm h-9"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
      )}

      <div className="rounded-sm border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    "px-3 py-2.5 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider whitespace-nowrap select-none",
                    col.sortable &&
                      "cursor-pointer hover:text-foreground transition-colors duration-150",
                    col.className,
                  )}
                  onClick={
                    col.sortable ? () => handleSort(String(col.key)) : undefined
                  }
                  onKeyDown={
                    col.sortable
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ")
                            handleSort(String(col.key));
                        }
                      : undefined
                  }
                  tabIndex={col.sortable ? 0 : undefined}
                >
                  {col.label}
                  {col.sortable && (
                    <SortIcon
                      direction={sortKey === String(col.key) ? sortDir : null}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-10 text-center text-muted-foreground text-sm"
                  data-ocid={dataOcid ? `${dataOcid}.empty_state` : undefined}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pageData.map((row, idx) => {
                const rowKey = String(
                  row.id ??
                    row.messageId ??
                    String((page - 1) * pageSize + idx),
                );
                return (
                  <tr
                    key={rowKey}
                    className="border-b border-border/50 hover:bg-muted/20 transition-colors duration-100"
                    data-ocid={
                      dataOcid
                        ? `${dataOcid}.item.${(page - 1) * pageSize + idx + 1}`
                        : undefined
                    }
                  >
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className={cn(
                          "px-3 py-2.5 text-foreground/90 align-middle",
                          col.className,
                        )}
                      >
                        {col.render
                          ? col.render(row)
                          : String(row[String(col.key) as keyof T] ?? "—")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>
            {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              data-ocid={dataOcid ? `${dataOcid}.pagination_prev` : undefined}
            >
              Prev
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pg =
                totalPages <= 5
                  ? i + 1
                  : page <= 3
                    ? i + 1
                    : page >= totalPages - 2
                      ? totalPages - 4 + i
                      : page - 2 + i;
              return (
                <Button
                  key={pg}
                  variant={pg === page ? "default" : "outline"}
                  size="sm"
                  className="h-7 w-7 p-0 text-xs"
                  onClick={() => setPage(pg)}
                >
                  {pg}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              data-ocid={dataOcid ? `${dataOcid}.pagination_next` : undefined}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
