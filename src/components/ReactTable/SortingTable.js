import React, { useMemo } from "react";
import { useTable,useSortBy } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "../MOCK_DATA.json";
import "./table.css";
const SortingTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useTable({
    columns,
    data,
  },useSortBy);

  

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
                <th {...column.getHeaderProps(column.getSortByToggleProps())}> 
                {column.render("Header")}
                 <span>
                    {column.isSorted ? (column.isSortedDesc ? "👍" : "👇") :"😂"}
                 </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* //pass in getTableBodyProps */}

        <tbody {...getTableBodyProps()}>
          {/* row goes into the table body */}

          {rows.map((row) => {
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
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                //Header property coming from Header column in imported.
                <td {...column.getFooterProps()}> {column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default SortingTable;
