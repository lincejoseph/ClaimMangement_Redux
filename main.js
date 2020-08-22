import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import Home from './components/common/Home.jsx';
import App from './components/common/App.jsx';
import LoginForm from './components/login/LoginForm.jsx';
import ClaimForm from './components/claim/ClaimSummary.jsx';
import UpdateClaimForm from './components/claim/UpdateClaim.jsx';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import LoginReducer from './reducer/LoginReducer'
import ClaimListReducer from './reducer/ClaimListReducer.js'

const store = createStore(combineReducers({LoginReducer,ClaimListReducer}));

store.subscribe(()=> 
  console.log("Updated values in store ---->"+JSON.stringify(store.getState())));

ReactDOM.render(
  
  <div>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={LoginForm} />
          <Route path="home" component={Home} />
          <Route path="claim" component={ClaimForm} />
          <Route path="updateclaim/:claimId" component={UpdateClaimForm} />
          <Route path="login" component={LoginForm} />
        </Route>
      </Router>
    </Provider> 
   </div>
  , document.getElementById('root')
);


