import React from 'react';
import{ Navbar,Nav, Form ,FormControl,Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import Menu from './../common/Menu.jsx';

  const validClaimNumber = new RegExp("[A-Za-z0-9]{3}-[A-Za-z0-9]{3}-[A-Za-z0-9]{3}");
  const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class UpdateClaim extends React.Component {

  constructor(props) {
    console.log('update claim');
    super(props);
    this.state = {
        showUpdate: this.props.showUpdate,    
         errors: {
            claimNumber: ''
          }
    };
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.submitClaim = this.submitClaim.bind(this);
    this.handleChange = this.handleChange.bind(this)
}

componentDidMount() {
    console.log('claim id ', this.props.params.claimId);
    axios.get(`http://localhost:7000/claims/${this.props.params.claimId}`)
    .then(res => {
      const claim = res.data;
      console.log(claim);
      this.setState({ claim });
    })
    .catch(error => {
       this.setState({claim:null})
       console.log('error', error);
    })
 }

cancelUpdate() {        
    console.log('Cancel Update');
    this.setState({showUpdate: false});
    browserHistory.push('claim');
}
handleChange(event){
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
   
    switch (name) {
      case 'claim_number': 
        errors.claimNumber = 
        validClaimNumber.test(value)
            ? ''
            : 'Please enter a valid Claim Number';         
        break;     
      
      default:
        break;
    }

    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
    })
  }
submitClaim(e) {

    e.preventDefault();
    let putJson = '';
    let claimObj = {
        
        emp_id: this.refs['emp_id'].value,
        emp_name: this.refs['emp_name'].value,
        claim_number: this.refs['claim_number'].value,
        claim_type: this.refs['claim_type'].value,
        claim_program: this.refs['claim_program'].value,
        start_date: this.refs['start_date'].value,
        end_date: this.refs['end_date'].value
    };
    for (const field in this.refs) {
        console.log(field);
        putJson +=  field + ':"' + this.refs[field].value + '"';            
        if(field !== 'end_date') {
            putJson += ",";
        }
    }
    console.log('claimObj', claimObj);
    putJson += ''        
    console.log(putJson);
    
    axios.put('http://localhost:7000/claims/' + this.refs['emp_id'].value, claimObj)
    .then(res => {
        console.log('res.status', res.status);
        browserHistory.push('claim');
    });        
}

  render() {
     const {errors} = this.state;
    if(this.state.claim) {
      const {id, emp_id, emp_name, claim_number, claim_type, claim_program, start_date, end_date} = this.state.claim;

    return (
   <div>
      <Menu/>
      <Container className="align-items-center">
        <Form onSubmit={this.submitClaim}>  
          
          <Row className="justify-content-md-center">
            <Col >
              <Form.Group>
                <Form.Label>Employee ID</Form.Label>
                <Form.Control type="text" defaultValue={emp_id} disabled  name="emp_id" ref="emp_id"/>
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Employee Name</Form.Label>
                <Form.Control type="text"  defaultValue={emp_name} disabled  name="emp_name" ref="emp_name"/>
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Claim Number</Form.Label>
                 <Form.Control type="text" defaultValue={claim_number}  name="claim_number" ref="claim_number"
                            onChange={this.handleChange} noValidate maxLength="11"/>

                 {errors.claimNumber.length > 0 && 
                <span style={{color: "red"}} className='error'>{errors.claimNumber}</span>}
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Claim Type</Form.Label>
                <Form.Control as="select" defaultValue={claim_type} ref="claim_type">
                  <option>Submitted</option>
                  <option>Received</option>
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>More Info Required</option>
                  <option>Denied</option>
                  <option>Rejected</option>
                </Form.Control>
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Claim Programs</Form.Label>
                <Form.Control type="text" defaultValue={claim_program}  ref="claim_program" />
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Claim Start Date</Form.Label>
                <Form.Control type="date" defaultValue={start_date} ref="start_date" />
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Claim End Date</Form.Label>
                <Form.Control type="date" defaultValue={end_date} ref="end_date"/>
              </Form.Group>
            </Col>

          </Row>
          <Row className="mx-auto">
            <Col >
             
              <Button md={{ span: 3, offset: 3 }} variant="secondary" size="lg" active onClick={this.cancelUpdate}>
                Cancel
              </Button>
                {' '}
              <Button md={{ span: 3, offset: 3 }} variant="primary" size="lg" type="submit" active>
               Update
              </Button>
              {' '}
              {' '}
            </Col>
          </Row>
        </Form>
      </Container>
</div>
    );
    }
    return null;
  }
}
export default UpdateClaim

