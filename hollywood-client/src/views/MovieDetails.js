import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: "",
        poster: "",
        summary: "",
        rating: "",
        rottenTomatoes: ""
      },
      error: false
    }
  }

  componentDidMount() {
    let { movieId } = this.props.match.params;
    api.movies.getById(movieId).then(movie => {
      if (!movie.id) {
        console.log("This is not a real movie.", movie);
        this.setState(state => {
          return {
            error: "Unable to fetch movie."
          }
        })
      }
      this.setState(state => {
        return {
          movie
        }
      })
    })
  }

  setUpdate = (e) => {
    let { movieId } = this.props.match.params;
    this.props.history.push(`/movies/${movieId}/edit`);
  }

  removeMovie = (e) => {
    let { movieId } = this.props.match.params;
    api.movies.removeMovie(movieId).then(() => {
      this.props.history.push("/movies")
    })
  }

  render() {
    let { movie, error } = this.state;
    return (
      <div style={styles.container}>
        {error && <div>{error}</div>}
        {!error && (
          <div>
            <div style={styles.title}>{movie.title}</div>
            <div>(Rated: {movie.rating})</div>
            <p>{movie.summary}</p>
            <div>{movie.rottenTomatoes > 80
              ? <img src="https://staticv2-4.rottentomatoes.com/static/images/icons/fresh-16.png" alt="Fresh" />
              : <img src="https://staticv2-4.rottentomatoes.com/static/images/icons/splat-16.png" alt="Rotten" />}
              &nbsp;&nbsp;{movie.rottenTomatoes}%
              </div>
            <div><img style={styles.image} src={movie.poster} alt={movie.title} /></div>
            <button onClick={this.setUpdate}>Update</button>
            <button onClick={this.removeMovie}>Delete</button>
            <hr />
            {movie.actors && movie.actors.map(actor => (
              <div key={actor.id}>
                <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
              </div>
            ))}
          </div>
        )}
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
    fontSize: 40
  },
  image: {
    height: 200
  }
}

export default MovieDetails;