import React from 'react'
import Pattern from '../components/Pattern'
import PatternD from '../components/PatternD'


class PatternsContainer extends React.Component {

    renderPattern = () => {
        return this.props.patterns.map(pattern => {
            return <Pattern key={pattern.id} patternNum={pattern.id} pattern={pattern} />
  
        })
    }
    renderDrums = () => {
        return this.props.drums.map(pattern => {
            return <PatternD key={pattern.id} patternNum={pattern.id} pattern={pattern} />
  
        })
    }


    render(){
        return(
            <div>
                <span>
                    <h3>Patterns:</h3>
                    <div>
                    {   this.props.patterns ?
                        this.renderPattern()
                        :
                        null
                    }
                    </div> 
                </span>
                <span>
                    <h3>Drum Patterns:</h3>
                <div>
                {   this.props.patterns ?
                    this.renderDrums()
                    :
                    null
                }
                </div> 
                </span>

            </div>
        )
    }


}

export default PatternsContainer