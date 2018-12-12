import React from 'react'

const BlogForm = ({ title, author, url, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          name="author"
          value={author}
          onChange={onChange}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          name="url"
          value={url}
          onChange={onChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm