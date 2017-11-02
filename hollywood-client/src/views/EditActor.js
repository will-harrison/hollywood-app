import React, { Component } from 'react';
import api from '../api';

class EditActor extends Component {
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

  componentDidMount() {
    let { actorId } = this.props.match.params;
    api.actors.getById(actorId).then(actor => {
      if (!actor.id) {
        console.log("This actor does not exist", actor);
        actor = {};
        this.setState({
          error: "Unable to fetch actor"
        });
      }
      this.setState(state => {
        return {
          actor
        };
      });
    });
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
    let { actorId } = this.props.match.params;
    api.actors.update(actorId, this.state.actor).then(() => {
      this.props.history.push(`/actors/${actorId}`);
    })
  }

  render() {
    let { actor, error } = this.state;
    return (
      <div>
        {error && <div>{error}</div>}
        {!error && (
          <form onSubmit={this.onFormSubmit}>
            <input
              name={"name"}
              value={actor.name}
              placeholder={"Name"}
              onChange={this.onInputChange}
              autoFocus />
            <input
              name={"age"}
              value={actor.age}
              placeholder={"Age"}
              onChange={this.onInputChange} />
            <select
              name={"gender"}
              value={actor.gender}
              onChange={this.onInputChange}
              required>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
            <input type="submit" />
          </form>
        )}
      </div>
    );
  }
}

export default EditActor;