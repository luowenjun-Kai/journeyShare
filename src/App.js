import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './App.css';

import Navbar from './components/navbar/navbar';
import Homeimg from './components/homeimg/homeimg';
import Share from './components/share/share';
class App extends Component {
  render() {
    return (
      <div className="App">
          <Router >
              <div>
                  <Navbar/>
                  <Route exact path="/" component={Homeimg}/>
                  <Route path='/share' component={Share}/>
              </div>
          </Router>
      </div>
    );
  }
}

export default App;
