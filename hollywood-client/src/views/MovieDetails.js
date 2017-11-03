import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
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
        <Link to={`/movies`}>Back</Link>
        {error && <div>{error}</div>}
        {!error && (
          <Card style={styles.card}>
            <div style={styles.title}>{movie.title}</div>
            <div>(Rated: {movie.rating})</div>
            <p>{movie.summary}</p>
            <div><img style={styles.image} src={movie.poster} alt={movie.title} /></div>
            <div style={styles.container}>
              <div>
                <div>Written by</div>
                <div>{movie.writer}</div>
              </div>
              <div>
                <div>Directed by</div>
                <div>{movie.director}</div>
              </div>
            </div>
            <div>Release: {movie.releaseDate}</div>
            <div>{movie.rottenTomatoes > 80
              ? <img src="https://staticv2-4.rottentomatoes.com/static/images/icons/fresh-16.png" alt="Fresh" />
              : <img src="https://staticv2-4.rottentomatoes.com/static/images/icons/splat-16.png" alt="Rotten" />}
              &nbsp;&nbsp;{movie.rottenTomatoes}%
              </div>
            <Button style={styles.button} onClick={this.setUpdate}>Update</Button>
            <Button style={styles.button} onClick={this.removeMovie}>Delete</Button>
            <hr />
            <div>Cast</div>
            {movie.actors && movie.actors.map(actor => (
              <div key={actor.id}>
                <Link to={`/actors/${actor.id}`}>{actor.name}</Link>
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
    justifyContent: "center",
    padding: 20
  },
  card: {
    width: 500
  },
  movie: {
    marginTop: 10,
  },
  title: {
    fontSize: 40
  },
  image: {
    height: 400,
    display: "flex",
    margin: "0 auto"
  },
  button: {
    margin: "15px 5px"
  }
}

export default MovieDetails;