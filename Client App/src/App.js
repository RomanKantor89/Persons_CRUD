import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import './App.css';
import PersonList from './PersonList';
import PersonDetail from './PersonDetail';
import PersonEdit from './PersonEdit';
import PersonDelete from './PersonDelete';
import PersonCreate from './PersonCreate';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faCheckCircle, faExclamationCircle} from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle,faExclamationCircle);

class App extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Navbar className="navbar navbar-default" />
        <hr />

        <Switch>
          <Route exact path='/' render={() => (<Home />)} />
          <Route exact path='/persons' render={() => (<PersonList />)} />
          <Route exact path='/persons/create' render={() => (<PersonCreate />)} />
          <Route exact path='/persons/detail/:id' render={(props) => (<PersonDetail id={props.match.params.id} />)} />
          <Route exact path='/persons/edit/:id' render={(props) => (<PersonEdit id={props.match.params.id} />)} />
          <Route exact path='/persons/delete/:id' render={(props) => (<PersonDelete id={props.match.params.id} />)} />
          <Route render={() => (<NotFound />)} />
        </Switch>

        <p>&nbsp;</p>
        <hr />
        <footer>
          <p>&copy; 2019, Roman Kantor</p>
        </footer>
      </div>
    );
  }
}

export default App;

// Function component for the top-of-view header
const Header = () => {
  return (
    <div className="header">
      <div className="row">
        <h2>Roman Kantor Assignment 1</h2>
        <p>React app with typical features</p>
      </div>
    </div>
  );
}

// Function component for the navigation bar 
const Navbar = () => {
  return (
    <div className="container-fluid navbar-outline">
      <div className="navbar-header">
        <Link to='/' className='navbar-brand'>Home page</Link>
      </div>

      {/* <!-- All the navigation links are in the following div --> */}
      <div>
        <ul className="nav navbar-nav">
          <li>
            <Link to='/persons'>Persons list</Link>
          </li>
          <li>
            <Link to='/persons/create'>Add a person</Link>
          </li>
        </ul>
      </div>
    </div>

  );
}

// Function component for a content area
const Home = () => {
  return (
    <div>
      <p>This is the home page of the app.</p>
      <p>Click or tap an item on the nav menu.</p>
      <a href="https://mighty-gorge-42559.herokuapp.com/"> Web Service App</a>
      <p></p>
      <a href="https://mighty-refuge-25862.herokuapp.com/"> React App</a>
      <p>&nbsp;</p>
    </div>
  );
}

// Function component for a content area
const NotFound = () => {
  return (
    <div>
      <p>The requested resource was not found.</p>
      <p>&nbsp;</p>
    </div>
  );
}

