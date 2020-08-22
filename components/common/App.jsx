import React from 'react';
import Header from './HeaderLogin.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default App;





