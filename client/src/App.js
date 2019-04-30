import React from 'react';
import Post from './Post'
import User from './User'
import NewPost from './Post/NewPost'
import NewUser from './User/NewUser'
import UserSelector from './UserSelector/UserSelector';
import axios from 'axios'
import './App.scss';

const url = 'https://first-conjoined.herokuapp.com/api/'

class App extends React.Component {
  state = {
    posts: [],
    users: localStorage.getItem('users') !== null ? JSON.parse(localStorage.getItem('users')) : [],
    user: localStorage.getItem('bool') !== null ? JSON.parse(localStorage.getItem('bool')) : true,
    newOne: false,
    specific: false,
    person: {
      id: '',
      list: [],
      character: ''
    }
  }

  componentDidMount() {
    axios
      .get(`${url}${this.state.user ? 'users' : this.state.specific ? `posts/user${this.state.person.id}` : 'posts'}`)
      .then(res => {
        this.state.specific ?
          this.setState({
            ...this.state,
            person: {
              ...this.state.person,
              list: res.data
            }
          })
          :
          this.setState({
            ...this.state,
            [this.state.user ? 'users' : 'posts']: res.data
          })
        this.state.user && localStorage.setItem('users', JSON.stringify(res.data))
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
          this.state.user && localStorage.setItem('users', JSON.stringify(res.data))
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
        this.setState({
          ...this.state,
          [this.state.user ? 'users' : 'posts']: res.data
        })
        this.state.user && localStorage.setItem('users', JSON.stringify(res.data))
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
        this.state.user && localStorage.setItem('users', JSON.stringify(res.data))
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
        this.state.user && localStorage.setItem('users', JSON.stringify(res.data))
      })
      .catch(err => console.log(err))
  }

  newOne = () => {
    this.setState({ newOne: !this.state.newOne })
  }

  handleSelector = e => {
    const name = e.target[e.target.selectedIndex].text
    console.log(name)
    this.setState({
      ...this.state,
      user: false,
      specific: true,
      person: {
        ...this.state.person,
        id: e.target.value,
        character: name
      }
    })
    setTimeout(() => this.getSpecific(), 500)
  }

  getSpecific = () => {
    axios
      .get(`${url}posts/user${this.state.person.id}`)
      .then(res => {
        this.setState({
          ...this.state,
          person: {
            ...this.state.person,
            list: res.data
          }
        })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 onClick={() => this.switch()}>{this.state.user ?
            'Users' :
            this.state.specific ?
              `${this.state.person.character}'s Quotes` :
              'All Quotes'}</h1>
        </header>

        <section>
          <div className='selector-div'>
            <span>Select a character:</span>
            <select
              value={this.state.person.id}
              onChange={this.handleSelector}
            >
              <option value='0'></option>
              {this.state.users.map((user, id) => (
                <UserSelector user={user} key={id} />
              ))}
            </select>
          </div>
          {!this.state.newOne ?
            this.state.user ?
              this.state.users.map((user, id) => (
                <User user={user} edit={this.edit} del={this.del} key={id} />
              ))
              :
              this.state.specific ?
                this.state.person.list.map((post, id) => (
                  <Post post={post} users={this.state.users} edit={this.edit} del={this.del} specific={this.state.specific} key={id} />
                ))
                :
                this.state.posts.map((post, id) => (
                  <Post post={post} users={this.state.users} edit={this.edit} del={this.del} key={id} />
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
