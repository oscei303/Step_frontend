import React, { Fragment } from 'react'
import DrumsChannel from './DrumsChannel'





class MyDrums extends React.Component {



    render(){
        // console.log('insideDrums', this.props)
        return (
            <div>
                <Fragment>
                   <DrumsChannel
                     activeColumn={this.props.activeColumn}
                     toggleStep={this.props.toggleStep}
                     matrix={this.props.matrix} />
                </Fragment>
                  <div>
                </div>
            </div>
        ) 
    }  
}


export default MyDrums

