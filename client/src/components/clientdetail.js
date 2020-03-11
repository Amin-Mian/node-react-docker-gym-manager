import React, { Component } from 'react';
import axios from 'axios';


export default class ClientDetail extends Component {
  constructor(props) {
    super(props);


    this.state = {
      fname: '',
      lname: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/gym/client/'+this.props.match.params.id)
      .then(response => {
          console.log(response)
        this.setState({
          fname: response.data.client.first_name,
          lname: response.data.client.last_name
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
        <div>
        <h3>{this.state.fname} {this.state.lname} details..</h3>
    </div>
    )
  }
}