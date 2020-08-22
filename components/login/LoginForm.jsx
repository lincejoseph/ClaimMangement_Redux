import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Alert } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Logger } from 'react-logger-lib';
import {connect} from 'react-redux';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { invalidUser: false };
    this.validateLogin = this.validateLogin.bind(this);
    localStorage.setItem('LoginForm', 'INFO');
  }

  componentDidMount() {

    Logger.of('LoginForm').info('state=', this.state);
    Logger.of('LoginForm').info('props=', this.props);
    const user = localStorage.getItem('user');
    this.setState({ user });
  }

  validateLogin(e) {
    e.preventDefault();
    axios.get(`http://localhost:7001/users/`)
      .then(res => {
        let foundUser = false;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].username === this.refs['userId'].value
            && res.data[i].password === this.refs['password'].value) {
            foundUser = true;
          }
        }
        Logger.of('LoginForm').info('Found matching User---->', 'foundUser=', foundUser);

        if (foundUser) {
          console.log('#### inside match user ####');
          this.dispatchLoggedInUserToStore(this.refs['userId'].value);
          browserHistory.push('/home');

        } else {
          this.setState({ invalidUser: true });
        }
      }).catch(error => { this.setState({ invalidUser: true }) })
  }

  dispatchLoggedInUserToStore(user) {
    console.log(' user value dispatching ---> '+user);
    this.props.dispatch(this.loginAction(user))
}

loginAction(user){
    return {
        type: 'LOGIN',
        loggedInUser: user
    }
}

  render() {

    return (

      <Container className="row align-self-center justify-content-md-center">

        <Form onSubmit={this.validateLogin}>
          <Row className="justify-content-md-center">
            <Col>
              {
                (this.state.invalidUser) &&
                (<Alert key='error-message' variant='warning'>Please enter valid Login Credentials</Alert>)
              }
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" ref="userId" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" ref="password" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mx-auto">
            <Col md={{ span: 3, offset: 3 }}>
              <Form.Row md="2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form.Row>
            </Col>
          </Row>
        </Form>
      </Container>

    )
  }
}

const mapStateToProps = state => {
  console.log('App state value -->', state);
  return {loggedInUser: state.loggedInUser}
}

const componentConnector = connect(mapStateToProps);
export default componentConnector(LoginForm);