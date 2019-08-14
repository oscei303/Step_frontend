
import './index.css';
import './App.css'
import { Provider } from 'react-redux';
import React from "react";
import ReactDOM from "react-dom";
import MainContainer from './containers/MainContainer';
import { createStore } from 'redux'

 const defaultState = { 
   
 }


function reducer(prevState=defaultState, action){
return prevState
}

const store = createStore(reducer)






class App extends React.PureComponent {
  

  render() {

  
    return (
      <div>
        <MainContainer 
    
            />
      </div>
    );
  }
}






const rootElement = document.getElementById("root");
ReactDOM.render(<Provider store={store}>
< App />
</Provider>
, rootElement);
