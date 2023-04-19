// import logo from './logo.svg';
// import "./App.css";
import BasicTable from "./components/ReactTable/BasicTable";
import FilteringTable from "./components/ReactTable/FilteringTable";
import SortingTable from "./components/ReactTable/SortingTable";

function App() {
  return (
    <div className="App">
      {/* <BasicTable /> */}
      {/* <SortingTable /> */}
      <FilteringTable />
    </div>
  );
}

export default App;
