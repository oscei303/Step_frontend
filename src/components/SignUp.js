import React from 'react'
import { darken } from 'polished'
import styled from 'styled-components'

const Button = styled.button `
  padding: 0.75em 1em;
  outline: none;
  background-color: #C7ED0B;
  border: 3px solid black;
  border-radius: 5px;
  color: black;
  font-size: 1em;
  margin: 0.5em
  border: 
  &:hover {
    background: ${darken(0.2, "#27ae60")};
    cursor: pointer;
  }
  
`

const Logo = styled.button `
  padding: 0.75em 1em;
  outline: none;
  background-color: #C7ED0B;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  margin: 0.5em

  &:hover {
    background: ${darken(0.2, "#27ae60")};
    cursor: pointer;
  }
  
`

class SignUp extends React.Component{

    render(){
        return(
            <div>
         
            <div>
                <form id='user-form'
                    onSubmit={(event) => this.props.handleCreate(event,this.props.routerProps)}>
                        
                    <div>
                        <input onChange={this.props.handleChange}
                            type='user'
                            value={this.props.username}
                            placeholder='username'
                            name='username' />
                    </div>
                    <div>
                        <input onChange={this.props.handleChange}
                        value = {this.props.password}
                        type='password'
                        placeholder='password'
                        name='password' />
                    </div>
                    <div>
                        <br></br>
                       <Button>login!</Button>
                       <Button>signup</Button>
                    </div>
                   
                    </form>
                    </div>
                </div>
        )
    }


}
export default SignUp