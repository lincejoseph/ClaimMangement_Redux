import React from 'react';
import Table from 'react-bootstrap/Table'; 
import ClaimList from './UpdateClaimList.jsx';
import Menu from './../common/Menu.jsx';

class ClaimSummary extends React.Component {

  render() {


    return (
      <div>
      <Menu/>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Claim Number</th>
            <th>Claim Type</th>
            <th>Claim Programs</th>
            <th>Claim Start Date</th>
            <th>Claim End Date</th>
          </tr>
        </thead>
        <tbody>
          <ClaimList />
        </tbody>
      </Table>
      </div>
    );
  }
}
export default ClaimSummary;