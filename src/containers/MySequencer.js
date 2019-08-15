import React, { Fragment } from 'react'
import Channel from './Channel'
import MyDrums from './MyDrums'

import { connect } from 'react-redux'




 let intervalID 
 


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
                    // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                ],
            activateStart: false,
            activeColumn: 0,
            playing: true,
            interval: 400,
            loggedIn: false,
            user: ''
        }


      handleStart = () => {
          console.log('start')
          if(this.state.activateStart){
            this.startInterval()
          } else {
              this.handleStop()
          }
      
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
          if(this.state.activateStart){
              this.setState({
                  activateStart: false
              }, () => this.handleStart())
            }else {
                this.setState({
                    activateStart: true
                }, ()=> this.handleStart())
              }
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




    render(){
        // console.log(this.state)
        return (
            <div>
                <Fragment>
                   <Channel
                     activeColumn={this.state.activeColumn}
                     toggleStep={this.toggleStep}
                     matrix={this.state.matrix}
                      />
                <MyDrums

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
                </div>
            </div>
        ) 
    }  
}

function msp(state){
    // console.log(state)
    return {...state}
}

function mdp(dispatch){
    return {

    }
}
export default connect(msp,mdp)(MySequencer) 

