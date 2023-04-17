// import logo from './logo.svg';
import "./App.css";
import DataFetching from "./components/DataFetching/DataFetching";
import FormReducer from "./components/Hooks/FormReducer";
import UseReducer from "./components/Hooks/useReducer";
import ReducerWithContext from "./components/ReducerContext";
function App() {
  return (
    <div className="App">
    {/* <UseReducer /> */}
    {/* <FormReducer /> */}
    {/* <ReducerWithContext /> */}
    <DataFetching />
    </div>
  );
}

export default App;
