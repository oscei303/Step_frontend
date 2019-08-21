import React, { Fragment } from 'react'
import MySequencer from './MySequencer'
import  { Route, Switch } from 'react-router-dom'
import LogInContainer from './LogInContainer';


class MainContainer extends React.Component {

    state={
        loggedIn: false,
        username: '',
        password: '',
        currentUser: null,
        id: ''
    }


    handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value})
    }

    handleSubmit = (event, routerProps) => {
        console.log(routerProps)
        event.preventDefault()
            console.log('submit', this.state.username, 'password', this.state.password)
            this.setState({
                loggedIn: true,
                username: this.state.username,
                password: this.state.password

            }, () => this.createUser(routerProps, event))
           

    }

    createUser = (routerProps, event) => {
        

        fetch('http://localhost:3000/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password_digest: this.state.password
            })
        }).then(r => r.json()).then(newUser => {
            routerProps.history.push('/main')
            console.log(routerProps)
            
               this.setState({
                   currentUser: newUser,
                   id: newUser.id
               }, () => console.log('incrreate', this.state.currentUser))
        })
    }


render(){
   console.log('main', this.props)
    return (
        <Fragment>
            <Switch>


            {this.state.loggedIn 
            ? < Route path='/main' render={(routerProps) => <MySequencer 
                player={this.props.player}
                routerProps={routerProps}
                user={this.state.currentUser}
                id={this.state.id}
                username={this.state.username}/>}
            /> 
            : <Route path='/' render={(routerProps) => <LogInContainer 
                routerProps={routerProps}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                username={this.state.user}
                password={this.state.password} 
                />} />
            }




            </Switch>
            
        </Fragment>
    )
}


}

export default MainContainer