import React, { Component } from 'react';
import api from '../api';

class CreateActor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor: {
        name: "",
        age: "",
        gender: "female"
      }
    }
  }

  onInputChange = (e) => {
    e.persist();
    this.setState(state => {
      return {
        actor: {
          ...state.actor,
          [e.target.name]: e.target.value
        }
      }
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    api.actors.create(this.state.actor).then(() => {
      this.props.history.push("/actors")
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            name={"name"}
            value={this.state.actor.name}
            placeholder={"Name"}
            onChange={this.onInputChange}
            autoFocus />
          <input
            name={"age"}
            value={this.state.actor.age}
            placeholder={"Age"}
            onChange={this.onInputChange} />
          <select
            name={"gender"}
            value={this.state.actor.gender}
            onChange={this.onInputChange}
            required>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateActor;