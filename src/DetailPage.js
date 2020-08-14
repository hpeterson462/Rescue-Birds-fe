import React, { Component } from 'react'
import { fetchBird } from './birds-api'

export default class DetailPage extends Component {

    state = {
        bird: {}
    }

    componentDidMount = async () => {
        const data = await fetchBird(this.props.match.params.id)

        this.setState({
            bird: data.body
        })
    }

    render() {
        return (
            <div>
                Your new bird: {this.state.bird.name} hatches about {this.state.bird.numberOfEggs}. eggs each season.
            </div>
        )
    }
}
