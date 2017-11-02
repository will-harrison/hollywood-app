import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actors: [],
      error: false
    }
  }

  componentDidMount() {
    api.actors.getAll().then(actors => {
      if (!actors.length && actors.length !== 0) {
        console.log("Return value was not an array of actors.", actors);
        actors = [];
        this.setState(state => {
          return {
            error: "Unable to fetch actors."
          }
        })
      };
      this.setState(state => {
        return {
          actors
        }
      })
    })
  }

  render() {
    let { actors, error } = this.state;
    return (
      <div style={styles.container}>
        <Link to={"/actors/new"}>Add New Actor</Link>
        <h2>Movies</h2>
        {error && <div>{error}</div>}
        {actors.map(a => (
          <div key={a.id} style={styles.actor}>
            <Link to={`/actors/${a.id}`}>
              <div style={styles.title}>{a.name} &mdash; {a.movies.length} Movies</div>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

const styles = {
  container: {
    margin: "50px 150px"
  },
  actor: {
    marginTop: 10,
  },
  title: {
    fontSize: 20
  },
  image: {
    height: 200
  }
}

export default Movies;