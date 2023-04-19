// import logo from './logo.svg';
// import "./App.css";
import BasicTable from "./components/ReactTable/BasicTable";
import FilteringTable from "./components/ReactTable/FilteringTable";
import PaginationTable from "./components/ReactTable/PaginationTable";
import SortingTable from "./components/ReactTable/SortingTable";

function App() {
  return (
    <div className="App">
      {/* <BasicTable /> */}
      {/* <SortingTable /> */}
      {/* <FilteringTable /> */}
      <PaginationTable />
    </div>
  );
}

export default App;
