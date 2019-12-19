function nextColumn(){
    // console.log(this.state.activeColumn)
    if (this.state.activeColumn < this.state.matrix[0].length - 1)
        return this.setState({
            activeColumn: this.state.activeColumn + 1
        })
    else
        return this.setState({
            activeColumn: 0
        })
    }

    export {
        nextColumn
    }