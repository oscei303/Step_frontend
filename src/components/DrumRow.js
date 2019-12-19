import React from 'react'
import DrumStep from './DrumStep'
import Tone from 'tone'


const context = new AudioContext();
 

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

    // componentDidUpdate(){
    //     co
    // }



    playTone = (row) => {
            console.log('audio', context)
        //  console.log(Tone.context.state)
            const lineMap = ["BD", "CP", "CH", "OH", "T1", "T2", "T3", "BR"]
            if (Tone.context.state !== 'running' && Tone.context.state === 'running' ) {
                // const player = new Tone.Player("/bd05.wav").toMaster()
            Tone.context.resume();
        }
        context.resume().then(()=> {
             if (row === 7) {
                 context.resume().then(() => {
                     this.props.player.get(lineMap[7]).start()

                 })
             }
             if (row === 6) {
                 context.resume().then(() => {
                     this.props.player.get(lineMap[6]).start()

                 })
             }
             if (row === 5) {
                 context.resume().then(() => {
                     this.props.player.get(lineMap[5]).start()

                 })
             }
             if (row === 4) {
                 context.resume().then(() => {
                     this.props.player.get(lineMap[4]).start()

                 })
             }
             if (row === 3) {
                 context.resume().then(() => {
                     this.props.player.get(lineMap[3]).start()

                 })
             }
             if (row === 2) {
                 context.resume().then(() => {
                     this.props.player.get(lineMap[2]).start()

                 })
             }
             if (row === 1) {
                 context.resume().then(() => {
                     this.props.player.get(lineMap[1]).start()

                 })
             }
             if (row === 0) {
                 context.resume().then(() => {
                     this.props.player.get(lineMap[0]).start()

                 })
    
           
            }})

    }





    renderStep = () => {
        console.log('drums', this.props)
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
                            </select>    
                            <select onChange={this.handleChange} name='note'>
                                <option>.... ...  </option>
                            </select>    
                        </div>  
            
                {this.renderStep()}

            </div>
        )
    }
}

export default Row 