import React from 'react';
import Post from './Post'
import User from './User'
import NewPost from './Post/NewPost'
import NewUser from './User/NewUser'
import axios from 'axios'
import './App.scss';

const url = 'http://localhost:5000/api/'

class App extends React.Component {
  state = {
    posts: [],
    users: [],
    user: localStorage.getItem('bool') !== null ? JSON.parse(localStorage.getItem('bool')) : true,
    newOne: false
  }

  componentDidMount() {
    axios
      .get(`${url}${this.state.user ? 'users' : 'posts'}`)
      .then(res => {
        this.setState({
          ...this.state,
          [this.state.user ? 'users' : 'posts']: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  switch = () => {
    setTimeout(() => {
      this.setState({
        ...this.state,
        user: !this.state.user
      })

      localStorage.setItem('bool', this.state.user)

      axios
        .get(`${url}${this.state.user ? 'users' : 'posts'}`)
        .then(res => {
          this.setState({
            ...this.state,
            [this.state.user ? 'users' : 'posts']: res.data
          })
        })
        .catch(err => {
          console.log(err)
        })
    }, 500)
  }

  add = sub => {
    axios
      .post(`${url}${this.state.user ? 'users' : 'posts'}`, sub)
      .then(res => {
        console.log(res)
        this.setState({
          ...this.state,
          [this.state.user ? 'users' : 'posts']: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  edit = (sub, id) => {
    axios
      .put(`${url}${this.state.user ? 'users' : 'posts'}/${id}`, sub)
      .then(res => {
        this.setState({
          ...this.state,
          [this.state.user ? 'users' : 'posts']: res.data
        })
      })
      .catch(err => console.log(err))
  }

  del = id => {
    axios
      .delete(`${url}${this.state.user ? 'users' : 'posts'}/${id}`)
      .then(res => {
        this.setState({
          ...this.state,
          [this.state.user ? 'users' : 'posts']: res.data
        })
      })
      .catch(err => console.log(err))
  }

  newOne = () => {
    this.setState({ newOne: !this.state.newOne })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <h1 onClick={() => this.switch()}>{this.state.user ?
            'Users' :
            'Posts'}</h1>
        </header>

        <section>
          {!this.state.newOne ?
            this.state.user ?
              this.state.users.map((user, id) => (
                <User user={user} edit={this.edit} del={this.del} key={id} />
              ))
              :
              this.state.posts.map((post, id) => (
                <Post post={post} edit={this.edit} del={this.del} key={id} />
              ))
            :
            this.state.user ?
              <NewUser newOne={this.newOne} add={this.add} />
              :
              <NewPost newOne={this.newOne} add={this.add} />
          }
          <button
            onClick={() => this.newOne()}
            style={{
              display: this.state.newOne ?
                'none' : 'block'
            }}
          >New Post</button>
        </section>

        <footer>
          I only put this here because I wanted some space at the bottom.
        </footer>
      </div>
    );
  }
}

export default App;
