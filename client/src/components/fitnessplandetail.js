import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreatePlan from './createplan.js'


export default class FitnessPlanDetail extends Component {
  constructor(props) {
    super(props);


    this.state = {
      title: '',
      description: '',
      clients:[],
      plan: {}
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/gym/fitness_plan/'+this.props.match.params.id)
      .then(response => {
          console.log(response)
        this.setState({
          title: response.data.fitness_plan.title,
          description: response.data.fitness_plan.description,
          clients: response.data.clients_in_plan,
          plan: response.data.fitness_plan

        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
        <div className="container">
          <Link to={"/plan_create"}>Create new Fitness Plan</Link>
        <h3 className="text-center"> Details:</h3>



        <div className="row">
          <div className="col-12">
            {this.state.plan.pic_name ?
              <img className='rounded article-img mx-auto d-block' src={'http://localhost:3030/uploads/'+this.state.plan.pic_name} alt='' />
              :<img className='rounded article-img mx-auto d-block' src={require('../images/logo192.png')} alt='WHATS HAPPENING' />
            }
          </div>
        </div>
        
               
        <p>{this.state.plan.description}</p>
        <h4> Clients registered with this plan:</h4>
        <ul>
        {this.state.clients.map((client) => (
            <li key={client._id}>
              <Link to={"/client/"+client._id}>{client.first_name} {client.last_name}</Link>
              </li> 
           ))}
        </ul>
    </div>
    )
  }
}