import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/navbar.js"
import UserList from "./components/userlist.js";
import EditUser from "./components/edituser.js";
import CreateUser from "./components/createuser.js";
import GymList from "./components/gymlist.js";
import InstructorDetail from "./components/instructordetail.js";
import ClientDetail from "./components/clientdetail.js";
import FitnessPlanDetail from "./components/fitnessplandetail.js";
import FileUpload from './components/fileupload.js';
import CreateInstructor from './components/createinstructor.js';
import CreateClient from './components/createclient.js';
import CreatePlan from './components/createplan.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
        <div className="container">

            <Router>
                <Navbar />
                <br/>
                  <Route path="/" exact component={UserList} />
                  <Route path="/edit/:id" component={EditUser} />
                  <Route path="/user-create" component={CreateUser} />
                  <Route path="/client_create"  component={CreateClient} />
                  <Route path="/plan_create"  component={CreatePlan} />
                  <Route path="/gym-list" component={GymList} />
                  <Route path="/instructor/:id" component={InstructorDetail} />
                  <Route path="/client/:id" component={ClientDetail} />
                  <Route path="/fitness_plan/:id" component={FitnessPlanDetail} />
                  <Route path="/instructor_create" component={CreateInstructor} />
            </Router>
            {/* <FileUpload /> */}
             {/* <CreateInstructor/>  */}
        </div>
    );
  }
}

export default App;