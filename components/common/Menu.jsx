import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import UserDetails from './UserDetails.jsx';
import Navbar from 'react-bootstrap/Navbar'

class Menu extends React.Component {

  render() {
    return (
      <div>
        <UserDetails />
        <Nav variant="pills" defaultActiveKey="#home">
          <Nav.Item>
            <Nav.Link href="#home" as={Link} to="home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#claim" as={Link} to="claim">Claim Summary</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
          <Nav.Link href="#claim" as={Link} to="claim">Update Claim Summary</Nav.Link>
        </Nav.Item> */}
          <Nav.Item>
            <Nav.Link eventKey="ilink-3">About Us</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="ilink-4">Contact Us</Nav.Link>
          </Nav.Item>
        </Nav>


        {this.props.children}
      </div>
    )
  }
}
export default Menu;