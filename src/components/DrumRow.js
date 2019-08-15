import React from 'react'
import DrumStep from './DrumStep'
import Tone from 'tone'



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




        playTone = (row) => {
            console.log(row)
            if(row === 0){
                  const player = new Tone.Player("/hh02.wav").toMaster()
                  player.autostart = true
            }   
            if(row === 1){
                  const player = new Tone.Player("/oh02.wav").toMaster()
                  player.autostart = true
            }   
            if(row === 2){
                  const player = new Tone.Player("/sd11.wav").toMaster()
                  player.autostart = true
            }   
            if(row === 3){
                  const player = new Tone.Player("/bd05.wav").toMaster()
                  player.autostart = true
            }   
        
            // const player = new Tone.Players({
            //         BD: "/bd05.wav"
            //         // CP: "/clap.wav",
            //         // OH: "/hh_open.wav",
            //         // CH: "/hh_closed.wav"
            //     })
            //  const lineMap = ["BD"]
            // //  debugger
            //  player.get(lineMap[0]).start()
          
        }





    renderStep = () => {
        // console.log(this.state)
        return this.props.row.map((step, colIndex) => {
            // console.log(step)
            return (
                <div className='row'>
             
                    <DrumStep
                    playTone={() =>this.playTone(this.props.rowIndex)}
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

                                <option>..... ...</option>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>    
                            <select onChange={this.handleChange} name='note'>
                                <option>.... ...  </option>
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