import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      error: false
    }
  }

  componentDidMount() {
    api.movies.getAll().then(movies => {
      console.log(movies)
      if (!movies.length && movies.length !== 0) {
        console.log("Return value was not an array of movies.", movies);
        movies = [];
        this.setState(state => {
          return {
            error: "Unable to fetch movies."
          }
        })
      };
      this.setState(state => {
        return {
          movies
        }
      })
    })
  }

  render() {
    console.log(this.state)
    let { movies, error } = this.state;
    return (
      <div style={styles.container}>
        <Link to={"/movies/new"}>Add New Movie</Link>
        <h2>Movies</h2>
        {error && <div>{error}</div>}
        {movies.map(m => (
          <div key={m.id} style={styles.movie}>
            <Link to={`/movies/${m.id}`}>
              <div style={styles.title}>{m.title} &mdash; {m.actors.length} Actors</div>
            </Link>
            <div>(Rated: {m.rating})</div>
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
  movie: {
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