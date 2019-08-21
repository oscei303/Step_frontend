import React from 'react'
import Row from '../components/Row'




        // const { sequencer } = this.props;

class Channel extends React.Component {


 
    renderSteps  = () => {
        return this.props.matrix.map( (row, rowIndex) => {

            return (
                    <div className='channel'>
                        
                        <div className='row'>
                         <Row
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
            {this.renderSteps()}
        </div>
    )
}

}

export default Channel