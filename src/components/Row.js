import React from 'react'
import Step from './Step'
import Tone from 'tone'

var context = new AudioContext();




class Row extends React.Component{

       state={
        osc: "sine",
        note: 'C2'
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }


    handleContext = (osc, note) => {
         if (Tone.context.state !== 'running') {
             Tone.context.resume().then(()=>{
                 this.playTone(osc, note)

             });
    }
    }




    playTone = (osc, note) => {
        context.resume().then(()=>{

            const synth = new Tone.Synth({
                "oscillator": {
                    "type": osc,
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
            Tone.start()
            synth.triggerAttackRelease(note, "16n");
            console.log('waddup')

        })    
    }





    renderStep = () => {
        // console.log(this.state)
        return this.props.row.map((step, colIndex) => {
            // console.log(step)
            return (
                <div className='row'>
             
                    <Step
                    playTone={() => this.playTone(this.state.osc, this.state.note)}
                    stepON={step}
                    toggleStep={this.props.toggleStep} 
                    activeStep={this.props.activeColumn === colIndex}
                    rowIndex={this.props.rowIndex}
                    colIndex={colIndex}
                    key={this.props.rowIndex+'-'+ colIndex} 
                    />


                </div>



            )
            
            
        })
    }    

    

    


    render(){
        return (
            <div>
                  <div className='row'>
                            <select onChange={this.handleChange} name='osc'>

                                <option>sine</option>
                                <option>pwm</option>
                                <option>square</option>
                                <option>triangle</option>
                            </select>    
                            <select onChange={this.handleChange} name='note'>
                                <option>C2</option>
                                <option>D2</option>
                                <option>E2</option>
                                <option>F2</option>
                                <option>G2</option>
                                <option>A2</option>
                                <option>B2</option>
                                <option>C3</option>
                                <option>D3</option>
                                <option>E3</option>
                                <option>F3</option>
                                <option>G3</option>
                                <option>A3</option>
                                <option>B3</option>
                                <option>C4</option>
                                <option>D4</option>
                                <option>E4</option>
                                <option>F4</option>
                                <option>G4</option>
                                <option>A4</option>
                                <option>B4</option>
                            </select>    
                        </div>  
                {this.renderStep()}

            </div>
        )
    }
}

export default Row 