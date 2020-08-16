import React from 'react';
import './App.css';
import { fetchBirds } from './birds-api.js';

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
      <>
        <h2>Rescue Birds</h2>
        <div className="birds" >
          {
            this.state.birds.map((bird) => {
              return <div className='bird' to={`/detail/${bird.id}`} key={`${bird.id}-${bird.name}`}>
                <p>
                  {bird.name}
                </p>
                <p>
                  Number of Eggs: <br />
                  {bird.number_of_eggs}
                </p>
                <p>
                  Able to fly:
                {bird.flies}
                </p>
                <p>
                  Preferred Rescue Sanctuary:
                {bird.rescue_name}
                </p>
              </div>
            })
          }
        </div >
      </>
    );
  }
}

export default ListPage;
