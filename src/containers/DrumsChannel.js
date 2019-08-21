import React from 'react'
import DrumRow from '../components/DrumRow'




class DrumsChannel extends React.Component {


 
    renderSteps  = () => {
        return this.props.matrix.map( (row, rowIndex) => {

            return (
                    <div className='channel'>
                        
                        <div className='row'>
                         <DrumRow
                            player={this.props.player}
                            key={rowIndex} 
                            row={row} 
                            rowIndex={rowIndex}
                            toggleStep={this.props.toggleStep} 
                            activeColumn={this.props.activeColumn}/>
                        </div>
                     </div>


            )
                
        })
    }
    

render(){
   

    return (
        <div>
            <h4>Bootleg 909 </h4>
            {this.renderSteps()}
        </div>
    )
}

}

export default DrumsChannel