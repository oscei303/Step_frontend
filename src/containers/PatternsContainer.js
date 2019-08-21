import React from 'react'
import Pattern from '../components/Pattern'
import PatternD from '../components/PatternD'


class PatternsContainer extends React.Component {

    renderPattern = () => {
        return this.props.patterns.map((pattern, i) => {
            return <Pattern 
                        loadPattern={this.props.loadPattern}
                        key={pattern.id} 
                        patternNum={pattern.id} 
                        pattern={pattern} 
                        i={i} />
  
        })
    }
    renderDrums = () => {
        return this.props.drums.map((pattern, i) => {
            return <PatternD
                        loadDrums={this.props.loadDrums} 
                        key={pattern.id} 
                        patternNum={pattern.id} 
                        pattern={pattern} i={i} 
                        />
  
        })
    }


    render(){
        return(
            <div>
                <span>
                    <h3 id="sub">Patterns:</h3>
                    <div id="box">
                    {   this.props.patterns ?
                        this.renderPattern()
                        :
                        null
                    }
                    </div> 
                </span>
                <span>
                    <h3 id='sub'>Drum Patterns:</h3>
                <div id='box'>
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