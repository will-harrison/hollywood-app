import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class ActorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor: {},
      error: false
    }
  }

  componentDidMount() {
    let { actorId } = this.props.match.params;
    api.actors.getById(actorId).then(actor => {
      if (!actor.id) {
        console.log("This is not a real actor.", actor);
        this.setState(state => {
          return {
            error: "Unable to fetch actor."
          }
        })
      }
      this.setState(state => {
        return {
          actor
        }
      })
    })
  }

  setUpdate = (e) => {
    let { actorId } = this.props.match.params;
    this.props.history.push(`/actors/${actorId}/edit`);
  }

  removeActor = (e) => {
    let { actorId } = this.props.match.params;
    api.actors.remove(actorId).then(() => {
      this.props.history.push("/actors");
    })
  }

  render() {
    let { actor, error } = this.state;
    return (
      <div>
        {error && <div>{error}</div>}
        {!error && (
          <div>
            <div>{actor.name}</div>
            <div>{actor.age}</div>
            <div>{actor.gender}</div>
            <button onClick={this.setUpdate}>Update</button>
            <button onClick={this.removeActor}>Delete</button>

            <hr />
            {actor.movies && actor.movies.map(m => (
              <div key={m.id}>
                <Link to={`/movies/${m.id}`}>{m.title}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ActorDetails;