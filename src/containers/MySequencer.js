import React, { Fragment } from 'react'
import Channel from './Channel'
import MyDrums from './MyDrums'
import PatternsContainer from './PatternsContainer';

import { Dial, TextButton } from 'react-nexusui'





var context = new AudioContext();




 let intervalID 

 
 
//  const DialProps = {
//      size : [0.3, 0.3],
//      interaction: "horizontal",
//      mode: "absolute",
//      min : 0,
//      max : 1,
//      step  : 0,
//      value  : 0,
//      onChange  : () => console.log('hi'),
//      onReady : (dial: Nexus.Dial) => console.log('getit'),
//  }

class MySequencer extends React.Component {
    

        state = {
            matrix: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            drumMatrix: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
            activateStart: false,
            activeColumn: 0,
            playing: true,
            interval: 150,
            loggedIn: false,
            userPatterns: [],
            userDrums: []
        }


      handleStart = () => {
          context.resume().then(() => {

              if(this.state.activateStart){
                this.startInterval()
              } else {
                  this.handleStop()
              }
          
          })
      }

      startInterval = () => {
          if(this.state.playing){
              intervalID = setInterval(() => this.nextColumn(), this.state.interval)

          }
      }

      handleStop = () => {
        clearInterval(intervalID)
      }

      toggleStart = () => {
          console.log(context)
          context.resume().then(() => {
                    if (this.state.activateStart) {
                        this.setState({
                            activateStart: false
                        }, () => this.handleStart())
                    } else {
                        this.setState({
                            activateStart: true
                        }, () => this.handleStart())
                    }
          })

          }
      
       
    nextColumn = () => {
        // console.log(this.state.activeColumn)
        if (this.state.activeColumn < this.state.matrix[0].length - 1)
        return this.setState({
            activeColumn: this.state.activeColumn + 1
        })
      else
       return this.setState({
           activeColumn: 0
       })
    }

    toggleStep = (rowIndex, colIndex) => {
        let newMatrix = this.state.matrix.map(row => {
            return [...row]
        })
        
        newMatrix[rowIndex][colIndex] = 1 - this.state.matrix[rowIndex][colIndex]

        this.setState({
            matrix: newMatrix
        })
    }

    toggleDrumStep = (rowIndex, colIndex) => {
        let newMatrix = this.state.drumMatrix.map(row => {
            return [...row]
        })
        
        newMatrix[rowIndex][colIndex] = 1 - this.state.drumMatrix[rowIndex][colIndex]

        this.setState({
            drumMatrix: newMatrix
        })
    }

    savePattern = () => {
        fetch(`http://localhost:3000/patterns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
               pattern: this.state.matrix,
               userID: this.props.user.id
            })
        }).then(r => r.json()).then(r => {
            this.setState({
                userPatterns: [...this.state.userPatterns, r]
            })
        })
    }

    saveDrums = () => {
        fetch(`http://localhost:3000/patterns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
               pattern: this.state.drumMatrix,
               userID: this.props.user.id
            })
        }).then(r => r.json()).then(r => {
            this.setState({
                userDrums: [...this.state.userDrums, r]
            })
        })
    }

    componentDidMount(){
        this.fetchPatterns()
        debugger
    }

    fetchPatterns = () => {
        fetch(`http://localhost:3000/users/${this.props.id}`)
        .then(r=>r.json())
        .then(patterns => {
            this.setState({
                userPatterns: patterns.patterns
            }, () => console.log('patterns', this.state.userPatterns))

        })
    }


    displayBPM = (state) => {
        return state + 15
    }


    clearPattern = () => {
        this.setState({
            matrix: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
                drumMatrix: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
        })
    }





    render(){
        //    console.log('seq', this.props.user)
        return (       <div>
                <Fragment>
                    <div id='dial'>
                        <h4>BPM: {this.displayBPM(this.state.interval) === 136 ? 'YAS TECHNO' : this.displayBPM(this.state.interval)  }</h4>
                    </div>
                   <Channel
                     activeColumn={this.state.activeColumn}
                     toggleStep={this.toggleStep}
                     matrix={this.state.matrix}
                      />
                <MyDrums
                    player={this.props.player}
                    activeColumn={this.state.activeColumn}
                    matrix={this.state.drumMatrix}
                    toggleStep={this.toggleDrumStep}
                    
                    
                />
                  
                </Fragment>
                  <div>
                    <button
                        onClick={this.toggleStart}>
                            {this.state.activateStart ? 'PAUSE' : 'START'}
                    </button>
                    <button
                        onClick={this.savePattern}>
                            SAVE PATTERN
                    </button>
                     <button
                        onClick={this.saveDrums}>
                            SAVE DRUMS
                    </button>
                    <button
                        onClick={this.clearPattern}>
                            CLEAR PATTERN
                    </button>
                </div>
                <div>
                    <PatternsContainer
                        patterns={this.state.userPatterns}
                        drums={this.state.userDrums}
                    />
                </div>
            </div>
        ) 
    }  
}


    

export default MySequencer

