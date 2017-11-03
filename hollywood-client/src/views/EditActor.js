import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';
import api from '../api';

class EditActor extends Component {
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

  componentDidMount() {
    let { actorId } = this.props.match.params;
    api.actors.getById(actorId).then(actor => {
      if (!actor.id) {
        console.log("This actor does not exist", actor);
        actor = {};
        this.setState({
          error: "Unable to fetch actor"
        });
      }
      this.setState(state => {
        return {
          actor
        };
      });
    });
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
    let { actorId } = this.props.match.params;
    api.actors.update(actorId, this.state.actor).then(() => {
      this.props.history.push(`/actors/${actorId}`);
    })
  }

  render() {
    let { actor, error } = this.state;
    return (
      <div style={styles.container}>
        {error && <div>{error}</div>}
        {!error && (
          <Form style={styles.form} onSubmit={this.onFormSubmit}>
            <Form.Item label={"Name"}>
              <Input
                name={"name"}
                value={actor.name}
                placeholder={"Name"}
                onChange={this.onInputChange}
                autoFocus />
            </Form.Item>
            <Form.Item label={"Headshot"}>
              <Input
                name={"headshot"}
                value={actor.headshot}
                placeholder={"Headshot"}
                onChange={this.onInputChange} />
            </Form.Item>
            <Form.Item label={"Age"}>
              <Input
                name={"age"}
                value={actor.age}
                placeholder={"Age"}
                onChange={this.onInputChange} />
            </Form.Item>
            <Form.Item label={"Gender"}>
              <Select
                name={"gender"}
                value={actor.gender}
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
  }
}

export default EditActor;