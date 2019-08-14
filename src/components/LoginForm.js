import React from 'react'

class LoginForm extends React.Component{

    render(){
        return(
            <div>
                <form>
                    <h1>Login </h1>
                    <input 
                        value=''
                        name='username' />
                    <input
                        value='' 
                        name='password'/>
                    <input 
                        type='submit'/>
                </form>
            </div>
        )
    }


}
export default LoginForm