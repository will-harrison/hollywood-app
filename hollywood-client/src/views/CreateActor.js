import React, { Component } from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import api from '../api';

class CreateActor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actor: {
        name: "",
        age: "",
        gender: "female",
        headshot: ""
      }
    }
  }

  onInputChange = (e) => {
    e.persist();
    this.setState(state => {
      return {
        actor: {
          ...state.actor,
          [e.target.name]: e.target.value
        }
      }
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    api.actors.create(this.state.actor).then(() => {
      this.props.history.push("/actors")
    })
  }

  render() {
    return (
      <div style={styles.container}>
        <Form onSubmit={this.onFormSubmit} style={styles.form}>
          <Form.Item label={"Name"}>
            <Input
              name={"name"}
              value={this.state.actor.name}
              placeholder={"Name"}
              onChange={this.onInputChange}
              autoFocus />
          </Form.Item>
          <Form.Item label={"Age"}>
            <Input
              name={"age"}
              value={this.state.actor.age}
              placeholder={"Age"}
              onChange={this.onInputChange} />
          </Form.Item>
          <Form.Item label={"Headshot"}>
            <Input
              name={"headshot"}
              value={this.state.actor.headshot}
              placeholder={"Headshot"}
              onChange={this.onInputChange} />
          </Form.Item>
          <Form.Item label={"Gender"}>
            <Select
              name={"gender"}
              value={this.state.actor.gender}
              onChange={this.onInputChange}
              required>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </Select>
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
    width: "500px"
  }
}

export default CreateActor;