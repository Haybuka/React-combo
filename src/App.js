// import logo from './logo.svg';
// import "./App.css";
import AllTableHooks from "./components/ReactTable/AllTableHooks";
import BasicTable from "./components/ReactTable/BasicTable";
import FilteringTable from "./components/ReactTable/FilteringTable";
import PaginationTable from "./components/ReactTable/PaginationTable";
import RowSelection from "./components/ReactTable/RowSelection";
import SortingTable from "./components/ReactTable/SortingTable";

function App() {
  return (
    <div className="App">
      {/* <BasicTable /> */}
      {/* <SortingTable /> */}
      {/* <FilteringTable /> */}
      {/* <PaginationTable /> */}
      {/* <RowSelection /> */}
      <AllTableHooks />
    </div>
  );
}

export default App;
