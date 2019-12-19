
import './index.css';
import './App.css'
import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Player from './components/Player'
import MainContainer from './containers/MainContainer'



// store.dispatch({type: })





const rootElement = document.getElementById("root");
ReactDOM.render(<Router><Route path='/' render={()=> <App /> }/>
</Router>
, rootElement);
