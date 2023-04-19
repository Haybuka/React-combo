import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "../MOCK_DATA.json";
import "./table.css";
const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);

  const data = useMemo(() => MOCK_DATA, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      //   to start page index on pagination
      initialState: { pageIndex: 2 },
    },
    usePagination
  );
  const { pageIndex, pageSize } = state;
  return (
    <div>
      {/* //pass in getTableProps */}
      <table {...getTableProps()}>
        {/* Header group goes into the head */}
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                //Header property coming from Header column in imported.
                <th {...column.getHeaderProps()}> {column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        {/* //pass in getTableBodyProps */}

        <tbody {...getTableBodyProps()}>
          {/* row goes into the table body */}

          {page.map((row) => {
            //in other to prepare the row
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ textAlign: "center" }}>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to pahe :{" "}
          <input
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            type="number"
            defaultValue={pageIndex + 1}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
          {"<<"}
        </button>
        <button disabled={!canPreviousPage} onClick={() => previousPage()}>
          Previous
        </button>
        <button disabled={!canNextPage} onClick={() => nextPage()}>
          Next
        </button>
        <button disabled={!canNextPage} onClick={() => gotoPage(pageCount - 1)}>
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;
