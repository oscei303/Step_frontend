
import './index.css';
import './App.css'
import { Provider } from 'react-redux';
import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { createStore } from 'redux'
import reducer from './reducer'



// store.dispatch({type: })

const store = createStore(reducer)



const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={store}>
< App />
</Provider>
, rootElement);
