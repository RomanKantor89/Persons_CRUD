import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import * as moment from 'moment';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class UserList extends Component {

  // Class properties 

  state = { persons: [] };

  url = "https://mighty-gorge-42559.herokuapp.com/api/persons";

  componentDidMount() {

    // Get all
    fetch(this.url)
      .then(response => {
        // Optional...
        //this.setState({ httpStatusCode: response.status, httpStatusOk: response.ok });
        if (response.ok) {
          // Parse the response body as JSON
          return response.json();
        } else if (response.status === 404) {
          // Not found 
          throw Error('HTTP 404, Not found');
        } else {
          // Some other situation
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        // "responseData" is an object; here, we're interested in its "data" property
        // Study the shape of the data in the reqres.in service
        this.setState({ persons: responseData });
        // Optional...
        //console.log(responseData);
      })
      .catch(error => {
        // Handles an error thrown above, as well as network general errors
        console.log(error)
      });

  }

  render() {
    document.title = 'Person list';

    return (
      <div>
        <h4>List of persons, from the deployed web service</h4>
        <p><Link className='btn btn-default' to='/persons/create'>Add a new person</Link></p>
        <table className='table table-striped'>
          <TableHeader />
          <TableBody persons={this.state.persons} />
        </table>
      </div>
    );
  }
}

export default UserList;

// ############################################################
// Most of the following was copied from the react-tania-updated code example
// ############################################################

// Function component, table header
const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Birth date</th>
        <th>Email</th>
        <th>Credit score</th>
        <th>Risk rating</th>
      </tr>
    </thead>
  );
}

// Function component
// Its purpose is to render the HTML table body element
const TableBody = (props) => {

  // Using the array of objects, create a new array of React elements
  let rows = props.persons.map((person, index) => {
    return (
      <TableRow person={person} key={index} />
    );
  });

  return <tbody>{rows}</tbody>
}

// Function component
// Its purpose is to render a single HTML table row
const TableRow = props => {

  // For coding convenience (below), create a very short variable name
  const u = props.person;

  // Alternative declaration syntax...
  //const { u } = this.props;

  // Render the row
  return (
    <tr>
      <td>{u.firstName} {u.lastName}</td>
      <td>{moment(u.birthDate).format('YYYY-MM-DD')}</td>
      <td><a href="mailto:{u.email}">{u.email}</a></td>
      <td>{u.creditScore}{u.creditScore > 600 && <FontAwesomeIcon icon="check-circle" color="green" />}</td>
      <td>{u.rating}{u.rating < 10 && <FontAwesomeIcon icon="exclamation-circle" color="brown" />}</td>
      <td><Link className='btn btn-default' to={`/persons/detail/${u._id}`}>Details</Link>&nbsp;&nbsp;
            <Link className='btn btn-warning' to={`/persons/edit/${u._id}`}>Edit</Link>&nbsp;&nbsp;
            <Link className='btn btn-danger' to={`/persons/delete/${u._id}`}>Delete</Link></td>
    </tr>
  );
}
