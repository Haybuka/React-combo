import React, { useMemo } from "react";
import { useTable, useRowSelect } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "../MOCK_DATA.json";
import "./table.css";
import { Checkbox } from "./Checkbox";
const RowSelection = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => {
                // console.log(row,'row')
                return<Checkbox {...row.getToggleRowsSelectedProps} />
            },
          },
          ...columns,
        ];
      });
    }
  );

//   console.log(selectedFlatRows)
  const firstPageRows = rows.slice(0, 10);
  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}> {column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td onClick={() => console.log(cell.row.values)} {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map((row) => console.log(row)),
            },
            null,
            2
          )}
        </code>
      </pre>
    </div>
  );
};

export default RowSelection;
