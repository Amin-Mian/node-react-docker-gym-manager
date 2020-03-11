import React, { Component } from 'react';
import axios from 'axios';
const apiUrl = `http://localhost:3030`;
class addUserForm extends Component {
  constructor() {
    super();
    this.state = {
      name:'',
      message: '',
    
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
      this.setState({name: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    axios.get(apiUrl + `/user-create?name=${encodeURIComponent(this.state.name)}`)
      .then(res => res.data)
      .then(state => this.setState(state));
    
}

  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}> 
          <label htmlFor="name">Add user to Database: </label>   
            <input
            id="name"
            type="text"
            value={this.state.name}
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
export default addUserForm;