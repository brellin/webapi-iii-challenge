import React, { Component } from 'react'

export default class NewPost extends Component {
    state = {
        text: '',
        user_id: ''
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <>
                <input
                    name='text'
                    onChange={this.handleChanges}
                    value={this.state.text}
                />
                <input
                    name='user_id'
                    onChange={this.handleChanges}
                    value={this.state.user_id}
                    type='number'
                />
                <button
                    onClick={() => {
                        this.props.add(this.state)
                        this.setState({
                            text: '',
                            user_id: ''
                        })
                        this.props.newOne()
                    }}
                >Submit</button>
            </>
        )
    }
}
