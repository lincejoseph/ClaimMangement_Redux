import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import {connect} from 'react-redux';

class UserDetails extends React.Component {

  constructor() {
    super();
    this.logout = this.logout.bind(this);
    var today = new Date(),
    time = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes();
    this.state = {
      currentTime: time,
    }
  }

logout() {
    this.dispatchLoggedOutToStore();
    browserHistory.push('/login');
}

dispatchLoggedOutToStore() {
    console.log('dispatching logged-out user');
    this.props.dispatch(this.logoutAction())
}

logoutAction(){
    return {
        type: 'LOGIN',
        loggedInUser: null
    }
}
  render() {
    const today= this.state
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="mr-sm-2  text-white " >
             <label className="">Welcome:</label> {this.props.loggedInUser}
             <br/>
             <label className=""> Last Login :</label>  {today.currentTime}
            </Navbar.Text>
            <Nav.Link eventKey={2} href="#" onClick={this.logout} className="mr-sm-2 text-white font-weight-bold">
                        Logout
            </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log('Userdetails page --- App state loggedinuser --->', state);
  return {loggedInUser: state.LoginReducer.loggedInUser};
}
const componentConnector = connect(mapStateToProps);
export default componentConnector(UserDetails);



  
  