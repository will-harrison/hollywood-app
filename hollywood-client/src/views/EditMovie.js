import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Select, Button } from 'antd';
import api from '../api';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: "",
        summary: "",
        rottenTomatoes: "",
        rating: "G",
        poster: ""
      },
      actors: [],
      error: false
    }
  }

  componentDidMount() {
    this.fetchMovieAndActors();
  }

  fetchMovieAndActors = () => {
    let { movieId } = this.props.match.params;
    api.movies.getById(movieId).then(movie => {
      if (!movie.id) {
        console.log("This movie doesn't exist", movie);
        movie = {};
        this.setState(state => {
          return {
            error: "Unable to fetch error"
          };
        });
      }
      this.setState(state => {
        return {
          movie
        };
      });

      api.actors.getAll().then(actors => {
        if (!actors.length && actors.length !== 0) {
          return;
        }
        this.setState(state => {
          return {
            actors
          }
        })
      })
    });
  }

  addToCast = (id) => {
    let { movieId } = this.props.match.params;
    api.movies.addActor(movieId, { id: id }).then(() => {
      this.fetchMovieAndActors();
    })
  }

  removeFromCast = (id) => {
    let { movieId } = this.props.match.params;
    api.movies.removeActor(movieId, { id: id }).then(() => {
      this.fetchMovieAndActors();
    })
  }

  onInputChange = (e) => {
    e.persist();
    this.setState(state => {
      return {
        movie: {
          ...state.movie,
          [e.target.name]: e.target.value
        }
      }
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    let { movieId } = this.props.match.params;
    api.movies.update(movieId, this.state.movie).then(() => {
      this.props.history.push(`/movies/${movieId}`)
    })
  }

  render() {
    let { movie, actors, error } = this.state;
    return (
      <div style={styles.container}>
        {error && <div>{error}</div>}
        {!error && (
          <div>
            <Link to={`/movies/${movie.id}`}>Back</Link>
            <Form style={styles.form} onSubmit={this.onFormSubmit}>
              <Form.Item label={"Title"}>
                <Input
                  name={"title"}
                  value={movie.title}
                  placeholder={"Title"}
                  onChange={this.onInputChange}
                  autoFocus />
              </Form.Item>
              <Form.Item label={"Summary"}>
                <Input
                  name={"summary"}
                  value={movie.summary}
                  placeholder={"Summary"}
                  onChange={this.onInputChange} />
              </Form.Item>
              <Form.Item label={"Rotten Tomatoes"}>
                <Input
                  name={"rottenTomatoes"}
                  value={movie.rottenTomatoes}
                  placeholder={"Rotten Tomatoes Score"}
                  onChange={this.onInputChange}
                  type={"number"}
                  min={0}
                  max={100} />
              </Form.Item>
              <Form.Item label={"Rating"}>
                <Select
                  name={"rating"}
                  value={movie.rating}
                  onChange={this.onInputChange}
                  required>
                  <option value={"G"}>G</option>
                  <option value={"PG"}>PG</option>
                  <option value={"PG-13"}>PG-13</option>
                  <option value={"R"}>R</option>
                  <option value={"NC-17"}>NC-17</option>
                  <option value={"NR"}>NR</option>
                </Select>
              </Form.Item>
              <Form.Item label={"Poster"}>
                <Input
                  name={"poster"}
                  value={movie.poster}
                  placeholder={"Poster"}
                  onChange={this.onInputChange} />
              </Form.Item>
              <Form.Item label={"Summary"}>
                <Button style={styles.button} type="submit">Submit</Button>
                <Button style={styles.button} onClick={() => this.props.history.push(`/movies/${movie.id}`)}>Cancel</Button>
              </Form.Item>
            </Form>
            <hr />
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <h3>Current Actors</h3>
                {movie.actors && movie.actors.map(a => (
                  <div key={a.id}>{a.name} <Button style={styles.button} onClick={() => this.removeFromCast(a.id)}>Fire</Button></div>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                <h3>Available Actors</h3>
                {actors && actors.map(a => (
                  <div key={a.id}>{a.name} <Button style={styles.button} onClick={() => this.addToCast(a.id)}>Cast</Button></div>
                ))}
              </div>
            </div>
          </div>
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
  form: {
    width: 500
  },
  button: {
    margin: "10px 5px",
    padding: "5px 15px"
  }
}

export default EditMovie;