import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, onSubmit, handleChange }) => {
  return (
    <div>
    <form onSubmit={onSubmit}>
      <div>
        username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default LoginForm