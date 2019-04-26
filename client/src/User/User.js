import React from 'react'
import './user.scss'

class User extends React.Component {
    state = {
        user: {
            name: this.props.user.name
        },
        editing: false
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }

    editUser = () => {
        this.props.edit(this.state.user, this.props.user.id)
        this.setState({
            ...this.state,
            editing: false
        })
    }

    render() {
        return (
            <div className='user'>
                <button
                    onClick={() => {
                        this.setState({
                            ...this.state,
                            editing: true
                        })
                    }}
                    style={{
                        display: this.state.editing ?
                            'none' : 'block'
                    }}
                >Edit User</button>
                <p>Name: {this.state.editing ?
                    <input
                        name='name'
                        onChange={this.handleChanges}
                        value={this.state.user.name}
                    /> :
                    this.props.user.name
                }</p>
                <button
                    style={{
                        display: this.state.editing ?
                            'none' : 'block'
                    }}
                    onClick={() => this.props.del(this.props.user.id)}
                >Delete</button>
                <button
                    style={{
                        display: !this.state.editing ?
                            'none' : 'block'
                    }}
                    onClick={() => this.editUser()}
                >Submit</button>
            </div >
        )
    }
}

export default User
