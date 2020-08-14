import React from 'react';
import './App.css';
import { fetchBirds } from './birds-api.js'

class ListPage extends React.Component {

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
      <div className="birds" >
        <h2>Birds:</h2>
        {
          this.state.birds.map((bird) => {
            return <div className='bird' to={`/detail/${bird.id}`} key={`${bird.id}-${bird.name}`}>
              <p>
                {bird.name}
              </p>
              <p>
                {bird.number_of_eggs}
              </p>
              <p>
                {bird.flies}
              </p>
              <p>
                {bird.title}
              </p>
            </div>
          })
        }
      </div >
    );
  }
}

export default ListPage;
