import React, { Fragment } from 'react'
import Channel from './Channel'
import Tone from 'tone'



const synth = new Tone.Synth({
            "oscillator": {
                "type": "square",
                "modulationFrequency": 5
            },
            "envelope": {
                "attack": 0.6,
                "decay": 0.1,
                "sustain": 0.2,
                "release": 0.9,
            },
            "detune": {

            }
        }).toMaster()


 let intervalID 
 


class MySequencer extends React.Component {

        state = {
            matrix: [
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0]
            ],
            activateStart: false,
            activeColumn: 0,
            playing: true
        }


    toneStart = (note) => {
        Tone.start()
        synth.triggerAttackRelease(note, "16n");

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
              intervalID = setInterval(() => this.nextColumn(), 400)

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




    render(){
        // console.log(this.state.matrix)
        return (
            <div>
                <Fragment>
                   <Channel
                     activeColumn={this.state.activeColumn}
                     toggleStep={this.toggleStep}
                     matrix={this.state.matrix} />
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

export default MySequencer 

