import React, { Component } from 'react'
import './App.css';
import { createBird, fetchRescues } from './birds-api.js';

export default class CreatePage extends Component {

    state = {
        name: '',
        numberOfEggs: 0,
        flies: true,
        color: '',
        rescues: []
    }

    componentDidMount = async () => {
        const rescuesData = await fetchRescues();

        this.setState({
            rescues: rescuesData.body
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createBird({
                name: this.state.name,
                number_of_eggs: this.state.numberOfEggs,
                flies: this.state.flies,
                color: this.state.color,
                rescue_id: this.state.rescue_id
            });

            this.setState({
                name: '',
                numberOfEggs: 0,
                flies: true,
                color: '',
                rescue_id: 1
            });

            this.props.history.push('/');

        } catch (e) {
            console.log(e.message);
        }
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

    render() {
        return (
            <div className='content'>
                <h2>
                    Enter Bird Found
                </h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Bird Type:
                        <input onChange={this.handleNameChange} value={this.state.name} />
                    </label>
                    <label>
                        Number of Eggs Found:
                        <input type='number' onChange={this.handleEggChange} value={this.state.numberOfEggs} />
                    </label>
                    <section>Is it able to fly?
                    <label>
                            Yes
                        <input type='radio' value='yes' onChange={this.handleIfFliesChange} />
                        </label>
                        <label>
                            No
                        <input type='radio' value='no' onChange={this.handleIfFliesChange} />
                        </label>
                    </section>
                    <label>
                        Color:
                        <select onChange={this.handleColorChange}>
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
                        <select onChange={this.handleRescueChange} value={this.state.rescue}>
                            {
                                this.state.rescues.map((rescue) => <option value={rescue.id} key={rescue.id}>{rescue.rescue_name}</option>)
                            }
                        </select>
                    </label>
                    <button>Submit new bird</button>
                </form>
            </div >
        )
    }
}
