import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import { Provider } from 'react-redux';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Landing from './components/landing';
import Crumble from './components/crumble';
import Project from './components/project';
import Idea  from './components/idea';
import Login from './components/auth/Login';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
              <Route exact path="/projects" component={ Project } />
              <Route exact path="/ideas" component={ Idea } />
              <Route exact path="/crumbles" component={ Crumble } />
              <Route exact path="/login" component={ Login } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
