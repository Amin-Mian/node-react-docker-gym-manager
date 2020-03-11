import React, { Component } from 'react';
import axios from 'axios';


export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:3030/users/list')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }
    console.log(user);

    axios.post('http://localhost:3030/users/update/' + this.props.match.params.id, user)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit User</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <input
            className="form-control"
            id="name"
            type="text"
            value={this.state.username}
            onChange={this.onChangeUsername}
            >
            </input>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit User" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}