import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">CRUD home</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/user-create" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/gym-list" className="nav-link">Gym Manager</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}