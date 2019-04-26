import React from 'react'
import './post.scss'
import UserSelector from '../UserSelector/UserSelector';

class Post extends React.Component {
    state = {
        post: {
            text: this.props.post.text,
            user_id: this.props.post.user_id
        },
        editing: false
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            post: {
                ...this.state.post,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSelector = e => {
        const name = e.target[e.target.selectedIndex]
        this.setState({
            ...this.state,
            post: {
                ...this.state.post,
                user_id: name
            }
        })
    }

    editPost = () => {
        this.props.edit(this.state.post, this.props.post.id)
        this.setState({
            ...this.state,
            editing: false
        })
    }

    render() {
        return (
            <div className='post'>
                <button
                    onClick={() => {
                        this.setState({
                            ...this.state,
                            editing: !this.state.editing
                        })
                    }}
                >{this.state.editing ? 'Cancel' : 'Edit Post'}</button>
                <p>{this.state.editing ?
                    <input
                        name='text'
                        onChange={this.handleChanges}
                        value={this.state.post.text}
                    /> :
                    this.props.post.text
                }</p>
                {this.state.editing &&
                    <>
                        <span>Character: </span> <select
                            value={this.state.post.user_id}
                            onChange={this.handleSelector}
                        >
                            <option value='0'></option>
                            {this.props.users.map((user, id) => (
                                <UserSelector user={user} key={id} />
                            ))}
                        </select>
                    </>}
                <button
                    style={{
                        display: this.state.editing ?
                            'none' : 'block'
                    }}
                    onClick={() => this.props.del(this.props.post.id)}
                >Delete</button>
                <button
                    style={{
                        display: !this.state.editing ?
                            'none' : 'block'
                    }}
                    onClick={() => this.editPost()}
                >Submit</button>
            </div>
        )
    }
}

export default Post
