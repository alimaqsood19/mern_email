import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App.js';
import reducers from './reducers/index.js';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); //Redux Store that holds application state/data

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, //Provider tag, child component App, allows components to access store
  document.querySelector('#root') //Second argument is the root element in index
);
