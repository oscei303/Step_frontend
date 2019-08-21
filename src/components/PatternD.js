import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'



const Button = styled.button `
padding: 0.40em 1em;
outline: none;
background-color: #ECA72C;
border: 1px solid #2D3047;
border-radius: 5px;
color: black;
font-size: 1em;
margin: 0.5em

    &:hover {
        background: ${darken(0.2, "#ECA72C")};
        cursor: pointer;
    }
`;


class PatternD extends React.Component {
    render(){
        return (
            <div>
                <Button>DRUMS {this.props.patternNum}</Button>
            </div>
        )
    }
}

export default PatternD