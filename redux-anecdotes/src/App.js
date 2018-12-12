import React from 'react';
import actionFor from './actionCreators'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
//import 'App.css'

class App extends React.Component {
  render() {
    return (
        <div>
          <AnecdoteList store={ this.props.store } />
          <AnecdoteForm store={ this.props.store } />
      </div>
    )
  }
}

export default App