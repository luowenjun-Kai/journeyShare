import React, { Component } from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/navbar/navbar';
import StoryDetail from './components/storydetail/storydetail';
import StoryPage from './components/Page/story/story';
import HomePage from './components/Page/home/home';
import SharePage from './components/Page/share/share';
import SupportPage from './components/Page/support/support';
class App extends Component {
  render() {
    return (
      <div className="App">
          <Router >
              <div>
                  <Navbar/>
                  <Route exact path="/" component={HomePage}/>
                  <Route exact path='/story' component={StoryPage}/>
                  <Route exact path='/story/detail/:articleID' component={StoryDetail}/>
                  <Route exact path='/share' component={SharePage}/>
                  <Route exact path='/support' component={SupportPage}/>
              </div>
          </Router>
      </div>
    );
  }
}

export default App;
