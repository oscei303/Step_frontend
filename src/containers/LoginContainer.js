import React from 'react'
import SignUp from '../components/SignUp'


class LogInContainer extends React.Component {


render(){
    return(
        <SignUp
            routerProps={this.props.routerProps}
            handleCreate={this.props.handleCreate}
            handleChange={this.props.handleChange}
            username={this.props.user}
            password={this.props.password}
        />      
        ) 
}



}
export default LogInContainer