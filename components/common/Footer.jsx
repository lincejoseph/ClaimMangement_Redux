import React from 'react';

class Footer extends React.Component {

	render() {
    return(
     
        <nav className="navbar navbar-dark">
          <div className="row col-12 bg-secondary justify-content-center text-black footer fixed-bottom">
            <span className="h6">Copyright reserved @ Cognizant</span>
          </div>
        </nav>
     );
  }
}
export default Footer;