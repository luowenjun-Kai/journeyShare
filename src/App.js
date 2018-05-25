import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './App.css';

import Navbar from './components/navbar/navbar';
import Homeimg from './components/homeimg/homeimg';
import Share from './components/share/share';
import Story from './components/story/story';
class App extends Component {
  render() {
    return (
      <div className="App">
          <Router >
              <div>
                  <Navbar/>
                  <Route exact path="/" component={Homeimg}/>
                  <Route path='/share' component={Share}/>
                  <Route path='/story' component={Story}/>
              </div>
          </Router>
      </div>
    );
  }
}

export default App;
