import React, { Fragment } from 'react'
import MySequencer from './MySequencer'
import  { Route, Switch } from 'react-router-dom'
import LogInContainer from './LogInContainer';


class MainContainer extends React.Component {

    state={
        loggedIn: false,
        username: '',
        password: '',
        currentUser: '',
        id: ''
    }


    handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value})
    }

    handleCreate = (event, routerProps) => {
        // console.log(routerProps)
        event.preventDefault()
            console.log('submit', this.state.username, 'password', this.state.password)
            fetch('http://localhost:3000/users', {
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
                    loggedIn: true,
                    username: this.state.username,
                    password: this.state.password,
                    currentUser: newUser,
                    id: newUser.id
                }, () => console.log('incrreate', this.state.currentUser))
                //    debugger
            })
      
           

           

    }

    // createUser = (routerProps, event) => {
        

    //     fetch('http://localhost:3000/users',{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             username: this.state.username,
    //             password_digest: this.state.password
    //         })
    //     }).then(r => r.json()).then(newUser => {
    //         routerProps.history.push('/main')
    //         console.log(routerProps)
            
    //            this.setState({
    //                 loggedIn: true,
    //                 username: this.state.username,
    //                 password: this.state.password,
    //                 currentUser: newUser,
    //                 id: newUser.id
    //            }, () => console.log('incrreate', this.state.currentUser))
    //         //    debugger
    //     })
    // }


render(){
   console.log('main', this.state)
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
                handleCreate={this.handleCreate}
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