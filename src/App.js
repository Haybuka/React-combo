
import { Provider } from 'react-redux';
import './App.css'
import store from './reduxToolKit/app/store';
import UserView from './component/users/userView';



function App() {
  return (

    <Provider store={store}>
      <p>Redux </p>
      <UserView />
    </Provider>
  );
}

export default App;
