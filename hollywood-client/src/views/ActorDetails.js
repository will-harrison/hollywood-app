import React, { Component } from 'react';
import { Card, Button } from 'antd';
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
      <div style={styles.container}>
        {error && <div>{error}</div>}
        {!error && (
          <Card style={styles.actor}>
            <div style={styles.name}>{actor.name}</div>
            <div><img style={styles.headshot} src={actor.headshot} alt={actor.name} /></div>
            <div>{actor.age}</div>
            <div>{actor.gender}</div>
            <Button style={styles.button} onClick={this.setUpdate}>Update</Button>
            <Button style={styles.button} onClick={this.removeActor}>Delete</Button>
            <hr />
            <h3>Movies</h3>
            {actor.movies && actor.movies.map(m => (
              <div key={m.id}>
                <Link to={`/movies/${m.id}`}>{m.title}</Link>
              </div>
            ))}
          </Card>
        )}
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center"
  },
  actor: {
    marginTop: 50
  },
  name: {
    fontSize: 24,
    padding: 20
  },
  headshot: {
    height: 300
  },
  button: {
    margin: "15px 5px"
  }
}

export default ActorDetails;