import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {

  const clearStatistics = () => {
    store.dispatch({ type: 'ZERO' })
  }

  const getTotalVotes = () => (
    Object.keys(currentState).reduce((sum, currentValue) => sum + currentState[currentValue], 0)
  )

  const average = () => {
    const voteSum = Object.keys(currentState).reduce((sum, currentValue) => {
      if (currentValue === 'good') {
        return sum + currentState[currentValue]
      } else if (currentValue === 'ok') {
        return sum
      } else {
        return sum - currentState[currentValue]
      }
    }, 0)

    return voteSum/getTotalVotes()
  }

  const positives = () => {
    const positiveCount = currentState['good']
    return positiveCount/getTotalVotes() * 100
  }

  const currentState = store.getState()
  const palautteita = getTotalVotes(currentState)

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{currentState.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{currentState.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{currentState.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average()}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positives()}</td>
            <td>%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={clearStatistics}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
