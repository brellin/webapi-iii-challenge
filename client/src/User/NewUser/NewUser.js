import React, { Component } from 'react'

export default class NewUser extends Component {
    state = {
        name: ''
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {
        console.log(this.state)
        return (
            <>
                <input
                    name='name'
                    onChange={this.handleChanges}
                    value={this.state.name}
                />
                <button
                    onClick={() => {
                        this.props.add(this.state)
                        this.setState({
                            name: ''
                        })
                        this.props.newOne()
                    }}
                >Submit</button>
            </>
        )
    }
}
