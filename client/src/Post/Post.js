import React from 'react'
import './post.scss'

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
                            editing: true
                        })
                    }}
                    style={{
                        display: this.state.editing ?
                            'none' : 'block'
                    }}
                >Edit Post</button>
                <p>Quote: {this.state.editing ?
                    <input
                        name='text'
                        onChange={this.handleChanges}
                        value={this.state.post.text}
                    /> :
                    this.props.post.text
                }</p>
                <p>Character: {this.state.editing ?
                    <input
                        name='user_id'
                        onChange={this.handleChanges}
                        value={this.state.post.user_id}
                        type='number'
                    /> :
                    this.props.post.user_id
                }</p>
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
