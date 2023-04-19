import format from "date-fns/format";
import ColumnFilter from './ColumnFilter'
export const COLUMNS = [
  {
    //Table hooks up to the id to figure out what to render
    Header: "Id",
    Footer: "Id",
    //Accessor connects body to header
    accessor: "id",
    Filter : ColumnFilter,
    // to Disable filtering for a field
    disableFilters : true
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
    // Filter : ColumnFilter

  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
    Cell : ({value}) => {return `${value}.`},
    // Filter : ColumnFilter

  },
  {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "date_of_birth",
    // controls what is rendered on ui
    // this is how changes are made on the table value
    Cell : ({value}) => {return format(new Date(value),'dd/MM/yyyy')},
    // Filter : ColumnFilter

  },
  {
    Header: "Country",
    Footer: "Country",
    accessor: "country",
    // Filter : ColumnFilter

  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
    // Filter : ColumnFilter

  },
];

export const GROUPED_COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  ,
  {
    Header: "Name",
    Footer: "Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
      },
    ],
  },
  {
    Header: "Info",
    Footer: "Info",
    columns: [
      {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        Footer: "Phone",
        accessor: "phone",
      }
    ],
  },
];
