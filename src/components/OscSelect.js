import React from 'react'


class OscSelect extends React.Component {

    

render(){
    return(
              <div className='row'>
                            <select onChange={this.props.handleChange} name='osc'>
                                <option>OSCILLATOR</option>
                                <option>pwm</option>
                                <option>square</option>
                                <option>triangle</option>
                            </select>    
                        </div>    
    )
}
}

export default OscSelect