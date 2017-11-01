import React, { Component } from 'react';
import api from '../api';

class CreateMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: "",
        summary: "",
        rottenTomatoes: "",
        rating: "",
        poster: ""
      }
    }
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
    api.movies.create(this.state.movie).then(() => {
      this.props.history.push("/movies")
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            name={"title"}
            value={this.state.title}
            placeholder={"Title"}
            onChange={this.onInputChange}
            autoFocus />
          <input
            name={"summary"}
            value={this.state.summary}
            placeholder={"Summary"}
            onChange={this.onInputChange} />
          <input
            name={"rottenTomatoes"}
            value={this.state.rottenTomatoes}
            placeholder={"Rotten Tomatoes Score"}
            onChange={this.onInputChange}
            type={"number"}
            min={0}
            max={100} />
          <input
            name={"rating"}
            value={this.state.rating}
            placeholder={"Rating"}
            onChange={this.onInputChange} />
          <input
            name={"poster"}
            value={this.state.poster}
            placeholder={"Poster"}
            onChange={this.onInputChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateMovie;