import React, { Component } from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
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
        poster: "",
        director: "",
        writer: "",
        releaseDate: ""
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
      <div style={styles.container}>
        <Form style={styles.form} onSubmit={this.onFormSubmit}>
          <Form.Item label={"Name"}>
            <Input
              name={"title"}
              value={this.state.movie.title}
              placeholder={"Title"}
              onChange={this.onInputChange}
              autoFocus />
          </Form.Item>
          <Form.Item label={"Director"}>
            <Input
              name={"director"}
              value={this.state.movie.director}
              placeholder={"Director"}
              onChange={this.onInputChange} />
          </Form.Item>
          <Form.Item label={"Writer"}>
            <Input
              name={"writer"}
              value={this.state.movie.writer}
              placeholder={"Writer"}
              onChange={this.onInputChange} />
          </Form.Item>
          <Form.Item label={"Release Date"}>
            <DatePicker
              name={"releaseDate"}
              value={this.state.movie.releaseDate}
              placeholder={"Release Date"}
              type={"date"}
              onChange={this.onInputChange} />
          </Form.Item>
          <Form.Item label={"Summary"}>
            <Input
              name={"summary"}
              value={this.state.movie.summary}
              placeholder={"Summary"}
              onChange={this.onInputChange} />
          </Form.Item>
          <Form.Item label={"Rotten Tomatoes Score"}>
            <Input
              name={"rottenTomatoes"}
              value={this.state.movie.rottenTomatoes}
              placeholder={"Rotten Tomatoes Score"}
              onChange={this.onInputChange}
              type={"number"}
              min={0}
              max={100} />
          </Form.Item>
          <Form.Item label={"Rating"}>
            <Select
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
            </Select>
          </Form.Item>
          <Form.Item label={"Movie Poster"}>
            <Input
              name={"poster"}
              value={this.state.movie.poster}
              placeholder={"Poster"}
              onChange={this.onInputChange} />
          </Form.Item>
          <Form.Item>
            <Input type="submit" />
          </Form.Item>
        </Form>
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
    width: "500px",
  }
}

export default CreateMovie;