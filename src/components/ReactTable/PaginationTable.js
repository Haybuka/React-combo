import React, { useMemo } from "react";
import { useTable,usePagination } from "react-table";
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
  } = useTable({
    columns,
    data,
  },usePagination);

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
    </div>
  );
};

export default PaginationTable;
