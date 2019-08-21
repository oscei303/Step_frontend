import React, { Fragment } from 'react'
import Channel from './Channel'
import MyDrums from './MyDrums'
import PatternsContainer from './PatternsContainer';
import { darken } from 'polished'
import styled from 'styled-components'


import { Dial, TextButton } from 'react-nexusui'





var context = new AudioContext();




 let intervalID 

 const Buttn = styled.button `
  padding: .75em 1em;
  outline: none;
  background-color: #EB4048;
  border: 3px solid black;
  border-radius: 2px;
  color: white;
  font-size: .75em;
  margin: 0.5em

  &:hover {
    background: ${darken(0.2, "#BE1E25")};
    cursor: pointer;
  }
  `
 const Btn = styled.button `
  padding: .15em .15em;
  outline: none;
  background-color: #EB4048;
  border: 1px solid black;
  border-radius: 2px;
  color: white;
  font-size: 1em;
  margin: 0.15em

  &:hover {
    background: ${darken(0.2, "#BE1E25")};
    cursor: pointer;
  }
  `
 
 const Bttn = styled.button `
  padding: .75em 1em;
  outline: none;
  background-color: #fffff;
  border: 3px solid #ECA72C;
  border-radius: 2px;
  color: black;
  font-size: 5.em;
  margin: 0.5em

  &:hover {
    background: ${darken(0.2, "#CAC0BF")};
    cursor: pointer;
  }
  `
 
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
            interval: 113,
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
            },()=> console.log(this.state.userDrums))
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
                userPatterns: patterns.patterns,
                userDrums: patterns.patterns
            }, () => console.log('patterns', this.state.userPatterns))

        })
    }


    displayBPM = (state) => {
        return state + 18
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

    increaseBPM = () => {
        this.setState({
            interval: this.state.interval + 1
        })
    }
    decreaseBPM = () => {
        this.setState({
            interval: this.state.interval - 1
        })
    }

    loadDrums = (clickedId) => {
        debugger
       const loadedPattern = this.state.userDrums.find(pattern => {
            return pattern.id === clickedId
        })
        this.setState({
            drumMatrix: loadedPattern.pattern
        })
            
    }
    loadPattern = (clickedId) => {
        debugger
       const loadedPattern = this.state.userPatterns.find(pattern => {
            return pattern.id === clickedId
        })
        this.setState({
            matrix: loadedPattern.pattern
        })
            
    }





    render(){
           console.log('seq', this.props.user)
        return (       <div>
                <Fragment>
                    <div id="dial" >
                        <h4 id='title'>BPM: {this.displayBPM(this.state.interval) === 136 ? 'YAS! TECHNO' : this.displayBPM(this.state.interval)  }</h4>
                    <br></br>
                    <h1 id="title3" onClick={this.increaseBPM}>+</h1>
                    <br></br>
                    <h1 id="title3" onClick={this.decreaseBPM}>-</h1>
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
                    <Buttn onClick={this.toggleStart}>                            {this.state.activateStart ? 'PAUSE' : 'START'}</Buttn>
                    <Bttn onClick={this.savePattern}>SAVE PATTERN</Bttn>
                    <Bttn onClick={this.saveDrums}>SAVE DRUMS</Bttn>
                    <Bttn onClick={this.clearPattern}>CLEAR</Bttn>
                </div>
                <div>
                    <PatternsContainer
                        loadPattern={this.loadPattern}
                        loadDrums={this.loadDrums}
                        patterns={this.state.userPatterns}
                        drums={this.state.userDrums}
                    />
                </div>
            </div>
        ) 
    }  
}


    

export default MySequencer

