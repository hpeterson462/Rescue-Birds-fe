import React from 'react';
import './App.css';
import { fetchBirds } from './birds-api.js';
import { Link } from 'react-router-dom';

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
        <div className="birds">
          {
            this.state.birds.map((bird) => {
              return <Link to={`/detail/${bird.id}`} key={`${bird.id}-${bird.name}`}>
                <div className="bird">
                  <p>
                    {bird.name}
                  </p>
                  <p>
                    Number of Eggs: <br />
                    {bird.number_of_eggs}
                  </p>
                  <p>
                    Able to fly: <br />
                    {bird.flies ? 'yes' : 'no'}
                  </p>
                  <p>
                    Preferred Rescue Sanctuary: <br />
                    {bird.rescue_name}
                  </p>
                </div>
              </Link>
            })
          }
        </div >
      </>
    );
  }
}

export default ListPage;
