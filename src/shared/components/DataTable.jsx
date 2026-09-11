import { useMemo } from "react";

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data available.",
  loadingMessage = "Loading...",
  onRowClick,
  rowKey = "id",
  className = "",
}) {
  const rows = useMemo(
    () => (Array.isArray(data) ? data : []),
    [data]
  );

  const getRowKey = (row, index) =>
    row?.[rowKey] ??
    row?._id ??
    index;

  const getCellValue = (column, row) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }

    return row?.[column.key];
  };

  return (
    <div
      className={[
        "data-table-wrapper",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <table className="data-table">
        <thead className="data-table-head">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={
                  column.headerClassName || ""
                }
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="data-table-body">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length || 1}
                className="data-table-loading"
              >
                {loadingMessage}
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length || 1}
                className="data-table-empty"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={getRowKey(row, index)}
                className={
                  onRowClick
                    ? "data-table-row--clickable"
                    : ""
                }
                onClick={() =>
                  onRowClick?.(row)
                }
              >
                {columns.map((column) => {
                  const value =
                    getCellValue(
                      column,
                      row
                    );

                  return (
                    <td
                      key={column.key}
                      className={
                        column.cellClassName ||
                        ""
                      }
                    >
                      {column.render
                        ? column.render(
                            value,
                            row
                          )
                        : value ?? "—"}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}