import React from 'react'
import actionFor from '../actionCreators'

class AnecdoteList extends React.Component {
  vote = (id) => {
    return () => {
      this.props.store.dispatch(actionFor.anecdoteVoting(id))
    }
  }

  votesComparator = (a, b) => (
    b.votes - a.votes
  )

  render() {
    const anecdotes = this.props.store.getState().sort(this.votesComparator)    
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList