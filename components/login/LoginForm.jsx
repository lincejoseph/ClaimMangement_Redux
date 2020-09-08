import React from 'react';
import axios from 'axios';
import { Form,Alert,Button,Container,Row,Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { Logger } from 'react-logger-lib';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {invalidUser: false,
        emptyuser : false};
    this.validateLogin = this.validateLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    localStorage.setItem('App', 'INFO');
    localStorage.setItem('LoginForm', 'INFO');
   
	
}
 
    handleChange(event) {

       const { name, value } = event.target;
        let errors = this.state.errors;
        Logger.of('App.LoginForm.handleChange').info('name=', name);
        let emptyuser= this.state.emptyuser;
        if(value.length < 3){
            emptyuser = true;
        }
          this.setState({ errors, [name]: value, emptyuser }, () => {

            Logger.of('App.LoginForm.handleChange').info('errors=', errors);

        })

    }

validateLogin(e) {

   Logger.of('LoginForm').info('Inside The Login Validation Method');
    e.preventDefault();        
    axios.get(`http://localhost:3000/api/getUsers`)
    .then(res => {
        let foundUser = false;
        for(let i=0;i < res.data.length; i++) {
            if(res.data[i].username === this.refs['username'].value
            && res.data[i].password === this.refs['password'].value) {
                foundUser = true;
                sessionStorage .setItem('UserName', this.refs['username'].value);  
            }
        }
        Logger.of('LoginForm').info('Found matching User---->', 'foundUser=', foundUser);
       
     
        if(foundUser) {
            Logger.of('LoginForm').info('inside match user'); 
            //this.state={isLoggedIn:'Y'};
           browserHistory.push('/home');
           
        }else {
            this.setState({invalidUser: true});
        }
    }).catch(error => {this.setState({invalidUser: true})})
}
  render() {

    return (
      
      <Form onSubmit={this.validateLogin}>
	  <div className="row mt-3"/>
        <div className="container-fluid col-sm-4 grid-margin border border-success rounded-sm">
           <h2> </h2>
                 <div className="row mt-3"></div>
                <h4>Sign In</h4>
                <div className="form-group">
                    <label>Username</label>
                    <Form.Control type="text" placeholder="Username" ref="username" name="username"  onChange = { this.handleChange }/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <Form.Control type="password" placeholder="Password" ref="password" name="password" onChange = { this.handleChange }/>
                </div>
                <div className="form-group">
                <Row className="justify-content-md-center">
                <Col> 
                {
                (this.state.invalidUser) &&
                (<Alert key='error-message' variant='warning'>Invalid Credentials</Alert>)
                 }
                  {
                (this.state.emptyuser) &&
                (<Alert key='error-message' variant='warning'>Username/Password should be atleast 3 characters</Alert>)
                 }
                  </Col>
                </Row>
                </div>
                
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
				<div className="row mt-3">
				  
				</div>
                </div>
               
            </Form>
     
    )
  }
}
export default LoginForm;