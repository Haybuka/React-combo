import React from 'react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import CakeContainer from './cakeContainer';
import HooksCakeContainer from './hooksCakeContainer';
import CreamContainer from './creamContainer';
import Item from './item';
import User from './user';

const ReduxDemo = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <CakeContainer />
        <HooksCakeContainer />
        <CreamContainer />
        <Item cake />
        <User />
        <Item />
      </div>
    </Provider>
  );
};

export default ReduxDemo;
