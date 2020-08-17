import React, { Component } from 'react'
import { fetchBird, deleteBird, updateBird, fetchRescues } from './birds-api.js';

export default class DetailPage extends Component {

    state = {
        bird: {},
        name: '',
        numberOfEggs: 0,
        flies: false,
        color: '',
        rescue_id: 1,
        rescues: []
    }

    componentDidMount = async () => {
        const data = await fetchBird(this.props.match.params.id)
        const rescuesData = await fetchRescues();
        const matchingRescue = rescuesData.body.find(rescue => rescue.id === data.body.rescue_name);

        this.setState({
            rescues: rescuesData.body,
            bird: data.body,
            name: data.body.name,
            number_of_eggs: data.body.numberOfEggs,
            flies: data.body.flies,
            color: data.body.color,
            rescue: matchingRescue.rescue_name
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateBird(
                this.props.match.params.id,
                {
                    name: this.state.name,
                    number_of_eggs: this.state.numberOfEggs,
                    flies: this.state.flies,
                    color: this.state.color,
                    rescue_id: this.state.rescue_id
                });

            const updatedBird = await fetchBird(this.props.match.params.id)

            this.setState({
                name: '',
                numberOfEggs: 0,
                flies: false,
                color: '',
                rescue_id: 1,
                bird: updatedBird.body
            });

        } catch (e) {
            console.log(e.message);
        }
        this.props.history.push('/');
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    }

    handleEggChange = e => {
        this.setState({ numberOfEggs: e.target.value });
    }

    handleIfFliesChange = e => {
        this.setState({ flies: e.target.value === 'yes' ? true : false });

    }

    handleColorChange = e => {
        this.setState({ color: e.target.value });
    }

    handleRescueChange = e => {
        this.setState({ rescue_id: e.target.value });
    }

    handleDelete = async () => {
        await deleteBird(this.props.match.params.id);

        this.props.history.push('/');
    }

    render() {
        console.log(this.state.rescues);
        return (
            <div>
                <div className="update-detail-description">
                    You rescued a {this.state.color} {this.state.name} that was found with {this.state.numberOfEggs} egg(s). It will be placed at {this.state.rescue}. Thank you for your help!
                </div>
                <section className="form-section">
                    <h3>Update this found bird?</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Bird Type:
                        <input onChange={this.handleNameChange} value={this.state.name} />
                        </label>
                        <label>
                            Number of Eggs Found:
                        <input type='number' onChange={this.handleEggChange} value={this.state.numberOfEggs} />
                        </label>
                        Is it able to fly?
                    <label>
                            Yes
                        <input type='radio' value='yes' onChange={this.handleIfFliesChange} />
                        </label>
                        <label>
                            No
                        <input type='radio' value='no' onChange={this.handleIfFliesChange} />
                        </label>
                        <label>
                            Color:
                        <select onChange={this.handleColorChange} value={this.state.color}>
                                <option value='blue'>Blue</option>
                                <option value='red'>Red</option>
                                <option value='black'>Black</option>
                                <option value='white'>White</option>
                                <option value='yellow'>Yellow</option>
                                <option value='green'>Green</option>
                                <option value='brown'>Brown</option>
                                <option value='orange'>Orange</option>
                            </select>
                        </label>
                        <label>
                            Preferred Rescue Sanctuary:
                        <select onChange={this.handleRescueChange} value={this.state.rescue_name}>
                                {
                                    this.state.rescues.map((rescue) => <option value={rescue.id} key={rescue.rescue_id}>{rescue.rescue_name}</option>)
                                }
                            </select>
                        </label>
                        <button>Update bird found</button>
                        <button onClick={this.handleDelete}>Delete bird</button>
                    </form>
                </section>
            </div>
        )
    }
}
