import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateClient from './createclient';
import '../App.css';


export default class InstructorDetail extends Component {
  constructor(props) {
    super(props);


    this.state = {
      fname: '',
      lname: '',
      clients: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/gym/instructor/'+this.props.match.params.id)
      .then(response => {
          console.log(response)
        this.setState({
          fname: response.data.instructor.first_name,
          lname: response.data.instructor.last_name,
          clients: response.data.instructors_clients
        })  
        console.log(this.state.clients) 
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
 
  
    return (
        <div>
        <h3>{this.state.fname} {this.state.lname}</h3>
        <Link to={"/client_create"}>Create new Client</Link>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Client's Name</th>
              <th> Client's fitness plan</th>
            </tr>
          </thead>
          <tbody>
          {this.state.clients.map((client) => (

            <tr key={client._id}>
              <td>
                {client.pic_name ?
                <img className='rounded-circle account-img' src={'http://localhost:3030/uploads/'+client.pic_name} alt='' />
                :<img className='rounded-circle account-img' src={require('../images/logo192.png')} alt='WHATS HAPPENING' />
                }
              
                <Link to={"/client/"+client._id}>{client.first_name} {client.last_name}</Link>
              </td>

              <td>
              <Link to={"/fitness_plan/"+client.fitness_plan._id}>{client.fitness_plan.title}</Link>
              </td>
            </tr>

           ))}

          </tbody>
        </table>
        {/* <CreateClient /> */}
    </div>
    )
  }
}