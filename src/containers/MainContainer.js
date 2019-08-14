import React, { Fragment } from 'react'
import MySequencer from './MySequencer'
// import LoginContainer from './LoginContainer';


class MainContainer extends React.Component {



render(){
    return (
        <Fragment>
            <MySequencer steps={this.props.steps} sequencer={this.props.sequencer} />
        </Fragment>
    )
}


}

export default MainContainer