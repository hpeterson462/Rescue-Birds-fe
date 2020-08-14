import React, { Component } from 'react'
import './App.css';
import { createBird } from './birds-api.js';

export default class CreatePage extends Component {

    state = {
        name: '',
        numberOfEggs: 1,
        flies: true,
        color: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await createBird({
            name: this.state.name,
            numberOfEggs: this.state.numberOfEggs
        });
        this.setState({
            name: '',
            numberOfEggs: 3,
            flies: true,
            color: ''
        })
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    }

    handleEggChange = e => {
        this.setState({ numberOfEggs: e.target.value });
    }

    handleIfFliesChange = e => {
        this.setState({ flies: e.target.value });

    }

    handleColorChange = e => {
        this.setState({ color: e.target.value });
    }

    render() {
        return (
            <div className='content'>
                <h2>
                    CREATE!
                </h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name
                        <input onChange={this.handleNameChange} value={this.state.name} />
                    </label>
                    <label>
                        Number of Eggs
                        <input type='number' onChange={this.handleEggChange} value={this.state.numberOfEggs} />
                    </label>
                        Does it fly?
                    <label>
                        <input type='radio' value='true' onClick={this.handleIfFliesChange} />
                    </label>
                    <select onChange={this.handleColorChange}>Color
                        <option value={this.state.color}>Blue</option>
                        <option value={this.state.color}>Red</option>
                        <option value={this.state.color}>Black</option>
                        <option value={this.state.color}>White</option>
                    </select>
                    <button>Create new bird</button>
                </form>
            </div >
        )
    }
}
