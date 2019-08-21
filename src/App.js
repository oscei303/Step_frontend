
import React from "react"
import MainContainer from './containers/MainContainer';
import  { Route } from 'react-router-dom'
import Player from './components/Player'




class App extends React.PureComponent {
  
  

  render() {

  
    return (
      <div>
        <Player>
          {({ player }) => {
            if (!player) {
              return <p>loading....</p>;
            }
            return    <Route path='/' render={() => <MainContainer player={player}  /> }/>
          }}
        </Player>
     
      </div>
    );
  }
}

export default App
