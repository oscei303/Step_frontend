import React from 'react'
import LoginForm from '../components/LoginForm'


class LoginContainer extends React.Component {

    state={
        username: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


render(){
    return <LoginForm />
}



}
export default LoginContainer