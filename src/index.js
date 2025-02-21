import React from 'react';
import ReactDOM from 'react-dom/client';
import './Style/style.css'
import './Style/responsive.css'
import './Style/font-awesome.min.css'
import './Style/bootstrap.min.css'
import App from './App';
import { Provider } from "react-redux";
import store from './Store/Store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
  </Provider>
);

