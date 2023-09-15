import CakeContainer from "./components/cakeContainer";
import './App.css'
import { Provider } from "react-redux";
import store from "./redux/store";
import HooksCakeContainer from "./components/hooksCakeContainer";
import CreamContainer from "./components/creamContainer";
import Item from "./components/item";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CakeContainer />
        <HooksCakeContainer />
        <CreamContainer />
        <Item cake />
        <Item />
      </div>
    </Provider>
  );
}

export default App;
