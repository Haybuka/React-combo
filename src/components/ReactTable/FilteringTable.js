import React, { useMemo } from "react";
import { useTable, useGlobalFilter,useFilters } from "react-table";
import { COLUMNS, GROUPED_COLUMNS } from "./columns";
import MOCK_DATA from "../MOCK_DATA.json";
import "./table.css";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  // To group columns using the grouped column from columnsJs
  //   const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);
  const defaultColumn = useMemo(() => {return {
    Filter : ColumnFilter
  }},[])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    state,
    setGlobalFilter,

  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useFilters,
    useGlobalFilter
  );
  const { globalFilter } = state;
  return (
    <div>
      {/*Global filtering is a client side filter
         Filters apply to all columns in the table
         requires state,setGlobal filter,flobalFilter from state to work */}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      {/* //pass in getTableProps */}
      <table {...getTableProps()}>
        {/* Header group goes into the head */}
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                //Header property coming from Header column in imported.
                <th {...column.getHeaderProps()}> 
                {column.render("Header")}
                <div>
                    {
                        column.canFilter ? column.render('Filter') : null
                    }
                </div>
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

export default FilteringTable;
