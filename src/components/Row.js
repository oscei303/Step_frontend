import React from 'react'
import Step from './Step'
import Tone from 'tone'

var context = new AudioContext();




class Row extends React.Component{

       state={
        osc: "sine",
        note: 'C2',
        attack: 0.6,
        decay: 0.1,
        sustain: 0.2,
        release: 0.9
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




    playTone = (osc, note, attack, decay, sustain, release) => {
        console.log(this.state.attack, this.state.decay, this.state.release, this.state.sustain, 'inside synth')
        context.resume().then(()=>{
            const filter = new Tone.Filter(200, "highpass");

            const synth = new Tone.Synth({
                "oscillator": {
                    "type": osc,
                    "modulationFrequency": 10
                },
                "envelope": {
                    "attack": attack,
                    "decay": decay,
                    "sustain": sustain,
                    "release": release,
                },
                "detune": {
                    "cents": 5
    
                }
            }).toMaster()
            Tone.start()
            synth.triggerAttackRelease(note, "16n");
           
        })    
    }

    attackUp = () => {
        context.resume().then(
         this.setState({
             attack: this.state.attack + 1
         })
        )
    }
    attackDown = () => {
        context.resume().then(
         this.setState({
             attack: this.state.attack - 1
         })
        )
    }
    decayUp = () => {
        context.resume().then(
         this.setState({
             decay: this.state.decay + 1
         })
        )
    }
    decayDown = () => {
        context.resume().then(
         this.setState({
             decay: this.state.decay - 1
         })
        )
    }
    sustainUp = () => {
        context.resume().then(
         this.setState({
             sustain: this.state.sustain + 1
         })
        )
    }
    sustainDown = () => {
        context.resume().then(
         this.setState({
             sustain: this.state.sustain - 1
         })
        )
    }
    releaseUp = () => {
        context.resume().then(
         this.setState({
             release: this.state.release + 1
         })
        )
    }
    releaseDown = () => {
        context.resume().then(
         this.setState({
             release: this.state.release - 1
         })
        )
    }


   
    renderStep = () => {
        // console.log(this.state)
        return this.props.row.map((step, colIndex) => {
            // console.log(step)
            return (
                <div className='row'>
             
                    <Step
                    playTone={() => this.playTone(this.state.osc, this.state.note, this.state.attack, this.state.decay, this.state.sustain, this.state.release)}
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

                        <div className='row'>
                         <h4 className='row1'>A</h4>
                         <h4 className='row2' onClick={this.attackUp}>+</h4>
                         <h4 className='row2' onClick={this.attackDown}>-</h4>
                         <h4 className='row1'>D</h4>
                         <h4 className='row2' onClick={this.decayUp}>+</h4>
                         <h4 className='row2' onclick={this.decayDown}>-</h4>
                         <h4 className='row1'>S</h4>
                         <h4 className='row2' onClick={this.sustainUp}>+</h4>
                         <h4 className='row2' onClick={this.sustainDown}>-</h4>
                         <h4 className='row1'>R</h4>
                         <h4 className='row2' onClick={this.releaseUp}>+</h4>
                         <h4 className='row2' OnClick={this.releaseDown}>-</h4>
                        </div>
            </div>
        )
    }
}

export default Row 