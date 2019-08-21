import React,{ Fragment } from 'react'
import { darken } from 'polished'
import styled from 'styled-components'
import Tone from 'tone'



const Button = styled.button `
  padding: 0.50em 1em;
  outline: none;
  background-color: #C7ED0B;
  border: 3px solid black;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  margin: 0.5em

  &:hover {
    background: ${darken(0.2, "#27ae60")};
    cursor: pointer;
  }
  
`

const ProgButton = styled.button `
padding: 0.25em 1em;
outline: none;
background-color: #93B7BE;
border: none;
border-radius: 5px;
color: white;
font-size: 1em;
margin: 0.5em

    &:hover {
        background: ${darken(0.2, "#27ae60")};
        cursor: pointer;
    }
`;
const TrigButton = styled.button `
padding: 0.50em 1em;
outline: none;
background-color: #27ae60;
border: 3px solid black;
border-radius: 5px;
color: white;
font-size: 1em;
margin: 0.5em

    &:hover {
        background: ${darken(0.2, "#27ae60")};
        cursor: pointer;
    }
`;
const ComboButton = styled.button `
padding: 0.10em 1em;
outline: none;
background-color: #27ae60;
border: none;
border-radius: 5px;
color: black;
font-size: 1em;
margin: 0.5em

    &:hover {
        background: ${darken(0.2, "#27ae60")};
        cursor: pointer;
    }
`;





class Step extends React.Component{


    triggerStep = (rowIndex, colIndex) => {
        // this.setState({
        //     stepON: !this.state.stepON
        // }, () => console.log(this.state.stepON))
           if (Tone.context.state !== 'running') {
               Tone.context.resume();
           }
        this.props.toggleStep(rowIndex, colIndex, this.props.activeStep)


    }

    buttonStyle = (active, stepON) => {
        // console.log(!active && !!this.props.stepON)
          switch (true) {
              case active && !!this.props.stepON:
                  return <ComboButton onClick={() => this.triggerStep(this.props.rowIndex, this.props.colIndex)}>{this.props.activeStep ? ' (ง’˘-˘)ง' : null}</ComboButton>
              case active && !this.props.stepON:
                  return <ProgButton onClick={() => this.triggerStep(this.props.rowIndex, this.props.colIndex)}>{this.props.activeStep ? '~(˘▾˘~)' : null}
                  </ProgButton>
              case !active && !!this.props.stepON:
                  return <TrigButton onClick={() => this.triggerStep(this.props.rowIndex, this.props.colIndex)}>{this.props.activeStep ? '~(˘▾˘~)' : null}</TrigButton>
              default:
                  return <Button onClick={() => this.triggerStep(this.props.rowIndex, this.props.colIndex)}>{this.props.activeStep ? '~(˘▾˘~)' : null}</Button>;
         }
    }



   

 render(){
     return (
         <Fragment>
            {this.props.activeStep && this.props.stepON ? this.props.playTone() : null}
             {
                 this.buttonStyle(this.props.activeStep, this.props.stepON)
             }

         </Fragment>
            
     )
 }

}

export default Step