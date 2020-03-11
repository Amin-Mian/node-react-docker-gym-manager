import React, { Component } from 'react';
import axios from 'axios';
const apiUrl = `http://localhost:3030`;
class deleteUserForm extends Component {
  constructor() {
    super();
    this.state = {
      id:'',
      message: '',
    
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
      this.setState({id: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    axios.get(apiUrl + `/user-delete?id=${encodeURIComponent(this.state.id)}`)
      .then(res => res.data)
      .then(state => this.setState(state));
    
}

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}> 
          <label htmlFor="name">Delete User from Database: </label>   
            <input
            id="name"
            type="text"
            value={this.state.id}
            onChange={this.handleChange}
            >
            </input>
            <button type="submit">Submit</button>
          </form>
           <p>{this.state.message}</p>
      </div>
    );
  }
}
export default deleteUserForm;