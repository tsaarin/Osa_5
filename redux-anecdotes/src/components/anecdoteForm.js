import React from 'react'
import actionFor from '../actionCreators'

class AnecdoteForm extends React.Component {
  createAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch(actionFor.anecdoteCreation(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.createAnecdote}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button> 
        </form>
      </div>
    )
  }
}

export default AnecdoteForm 