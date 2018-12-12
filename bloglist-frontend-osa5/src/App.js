import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      error: null,  
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      notification: {
        message: null,
        type: null
      }
    }
  }

  setNotification = (message, type) => {
    this.setState({
      notification: {
        message,
        type
      }
    })
  }

  clearNotificationAfterDelay = () => {
    setTimeout(() => {
      this.setState({ 
        notification: { message: null, type: null } 
      })
    }, 5000)
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log('logged user: ', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  } 

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLikeIncrease = (id) => {
    return () => {
      const blog = this.state.blogs.find(blog => blog.id === id)
      const updatedBlog = {...blog, user: blog.user._id, likes: blog.likes + 1}

      blogService
        .update(blog.id, updatedBlog)
        .then(() => {
          return blogService.getAll()
        })
        .then(blogs => {
            this.setState({ blogs })
        })
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
      
    } catch (exception) {
      this.setNotification('username or password incorrect', 'error')
      this.clearNotificationAfterDelay()
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({user: null, title: '', author: '', url: '' })
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title ? this.state.title : undefined,
      author: this.state.author ? this.state.author : undefined, 
      url: this.state.url ? this.state.url : undefined
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        const message = `a new blog '${this.state.title}' by ${this.state.author} added`   
        // Problem: since populate called only in axios.get, would need to refresh page in order to like a new blog
        // Same with other operation, ok to get every time or need to update state in a different manner?
        /* this.setState({
          blogs: this.state.blogs.concat(newBlog),
        }) */
        this.setNotification(message, 'notification')
        this.clearNotificationAfterDelay()
      })
      .then(() => {
        return blogService.getAll()
      })
      .then(blogs => {
        this.setState({ 
          blogs,
          title: '',
          author: '',
          url: ''
        })
      })
      .catch(err => {
        this.setNotification(err.response.data.error, 'error')
        this.clearNotificationAfterDelay()
      })
      
  }

  deleteBlog = (id) => {
    return () => {
      const blog = this.state.blogs.find(blog => blog.id === id)
      if (window.confirm(`delete '${blog.title}' by ${blog.author}?`))
        blogService
          .remove(blog.id)
          .then(() => {
            return blogService.getAll()
          })
          .then(blogs => {
              const message = 'Blog deleted'
              this.setState({
                blogs
              })
              this.setNotification(message, 'notification')
              this.clearNotificationAfterDelay()
          })
          .catch(err => {
            this.setNotification('unauthorized to delete blog', 'error')
            this.clearNotificationAfterDelay()
          })
    }
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Log in to application</h2>    
        <LoginForm
          username={this.state.username}
          password={this.state.password}
          onSubmit={this.login}            
          handleChange={this.handleFieldChange}
        />
      </div>
    )

    const blogForm = () => (
      <div>
        <Togglable buttonLabel="create new">
          <BlogForm
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            onSubmit={this.addBlog}
            onChange={this.handleFieldChange}
          />
        </Togglable>
        
      </div>
    )
    
    const blogList = () => (
      <div>
        <h2>blogs</h2>
        <div>
          {this.state.user.username} logged in
          <button className='button' onClick={this.logout}>logout</button>
        </div>
        <br/>
        {blogForm()}
        <br/>
        {this.state.blogs.map(blog => {
          return <Blog key={blog.id} blog={blog} likeBlog={this.handleLikeIncrease(blog.id)} deleteBlog={this.deleteBlog(blog.id)} showDelete={!blog.user.name || this.state.user.username === blog.user.username}/>
        })}
      </div>
    )

    return (
      <div>
        <Notification content={this.state.notification} />        
        {this.state.user === null ? loginForm() : blogList()}
      </div>
    ) 
  }
}

export default App;
