import React from 'react';
import './App.css';
import { fetchBirds } from './birds-api.js'

class App extends React.Component() {

  state = {
    birds: []
  }

  componentDidMount = async () => {
    const data = await fetchBirds()

    this.setState({
      birds: data.body
    })
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <h2>Birds:</h2>
        </header>
        {
          this.state.birds.map((bird) => {
            return <div>
              {bird.name} : {bird.number_of_eggs} : {bird.flies} : {bird.title}
            </div>
          })
        }
      </div>
    );
  }
}

export default App;
