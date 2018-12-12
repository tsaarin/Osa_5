const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export default {
  anecdoteCreation(content) {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content,
        id: generateId(),
        votes: 0
      }
    }
  },
  anecdoteVoting(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  }
}