import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore,applyMiddleware } from "redux";
import './index.css';
import App from './App';
import reducers from "./reducers/root-reducer";
import thunk from 'redux-thunk';

ReactDOM.render(
  <Provider store={createStore(reducers,applyMiddleware(thunk))}>
    <App />
  </Provider>,
 document.querySelector(".container")
);
