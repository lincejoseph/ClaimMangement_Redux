import React from 'react';
import axios from 'axios';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import {connect} from 'react-redux';

class ClaimList extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      claims: [],
      showUpdate: false
    }
    this.showUpdate = this.showUpdate.bind(this);
  }
  componentDidMount() {
    axios.get(`http://localhost:7000/claims`)
      .then(res => {
        const claimList = res.data;
        console.log("ClaimList obtained and setting to store-->" + claimList)
        this.dispatchClaimListToStore(claimList);
      })
  }

  dispatchClaimListToStore(claimList) {
    console.log('Dispatching ClaimList -->', claimList);
    this.props.dispatch(this.claimListAction(claimList))
  }

  claimListAction(claimList) {
    return {
      type: "LIST_CLAIM",
      claimList: claimList
    }
  }
  showUpdate(thisClaim) {
    console.log('Calling Update claim for --->', thisClaim.emp_id);
    browserHistory.push('updateclaim/' + thisClaim.emp_id);
  }

  render() {

    let myTr = "";
    let showUpdateContent = this.showUpdate;

    if(this.props.claimList){

        myTr = this.props.claimList.map(function(claim, index) {
          return (<tr key={index}>
            <td><a className="updateTdBut" href="#" onClick={() => showUpdateContent(claim)}>{claim.emp_id}</a></td>
            <td>{claim.emp_name}</td>
            <td>{claim.claim_number}</td>
            <td>{claim.claim_type}</td>
            <td>{claim.claim_program}</td>
            <td>{claim.start_date}</td>
            <td>{claim.end_date}</td>
          </tr>)
        });
      }
    return myTr;
  }
}
const mapStateToProps = state => {
  console.log('App state', state);
  return {claimList: state.ClaimListReducer.claimListObject}
}
export default connect(mapStateToProps)(ClaimList)