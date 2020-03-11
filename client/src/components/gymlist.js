import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';



export default class GymList extends Component {
  constructor(props) {
    super(props);



    this.state = {
      users: [],
      client_count: 0,
      source: null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3030/gym/')
      .then(response => {
        console.log(response)
        this.setState({ users: response.data.updated_instructors })
        console.log(this.state.users)
      })
      .catch((error) => {
        console.log(error);
      })
  }





  render() {
    return (
      <div>
        <h3>Instructors</h3>
        <Link to={"/instructor_create"}>Create new Instructor</Link>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Instructors</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
             <tr key={user._id}><td>
               {user.pic_name ?
                    
                  <img className='rounded-circle account-img' src={'http://localhost:3030/uploads/'+user.pic_name} alt='' />
                  : <img className='rounded-circle account-img' src='logo192.png' alt='' />
               }
                 <Link to={"/instructor/"+user._id}>{user.first_name} {user.last_name}</Link>
                  <p><small>{user.client_count} client(s)</small></p>
            </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}