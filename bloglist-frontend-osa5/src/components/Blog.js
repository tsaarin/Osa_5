import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showinfo: false,
    }
  }


  toggleInfo = (event) => {
    this.setState({showinfo: !this.state.showinfo})
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const inlineStyle = {
      marginLeft: 5
    }

    const hideIfNotOwnBlog = { display: this.props.showDelete ? '' : 'none' }
    const showWhenInfoVisible = { display: this.state.showinfo ? '' : 'none' }
    
    return (
      <div>
        <div className='blogInfo' style={blogStyle} onClick={this.toggleInfo}>
          {this.props.blog.title} {this.props.blog.author}
          <div className='blogDetails' style={{...inlineStyle, ...showWhenInfoVisible}}>
            <p> {this.props.blog.url} </p>
            <div>
              {this.props.blog.likes} likes
              <button className='button' onClick={this.props.likeBlog}>like</button>
            </div>
            <p> added by {this.props.blog.user.name} </p>
            <button style={{...hideIfNotOwnBlog}} onClick={this.props.deleteBlog}>delete</button>
          </div>
        </div>  
      </div>
    )
  }
}


export default Blog