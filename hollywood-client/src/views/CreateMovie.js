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
        rating: "G",
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
            value={this.state.movie.title}
            placeholder={"Title"}
            onChange={this.onInputChange}
            autoFocus />
          <input
            name={"summary"}
            value={this.state.movie.summary}
            placeholder={"Summary"}
            onChange={this.onInputChange} />
          <input
            name={"rottenTomatoes"}
            value={this.state.movie.rottenTomatoes}
            placeholder={"Rotten Tomatoes Score"}
            onChange={this.onInputChange}
            type={"number"}
            min={0}
            max={100} />
          <select
            name={"rating"}
            value={this.state.movie.rating}
            onChange={this.onInputChange}
            required>
            <option value={"G"}>G</option>
            <option value={"PG"}>PG</option>
            <option value={"PG-13"}>PG-13</option>
            <option value={"R"}>R</option>
            <option value={"NC-17"}>NC-17</option>
            <option value={"NR"}>NR</option>
          </select>
          <input
            name={"poster"}
            value={this.state.movie.poster}
            placeholder={"Poster"}
            onChange={this.onInputChange} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateMovie;