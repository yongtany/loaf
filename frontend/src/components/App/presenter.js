import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Footer from '../Footer';
import Landing from '../Landing';
import Members from '../Members';
import Navbar from '../Navbar';
//import Projects from '../Projects';
import MyProfile from '../MyProfile';
import Auth from '../Auth';
import RegisterProfile from '../RegisterProfile';
import RegisterProject from '../RegisterProject';
import ProjectFeed from '../ProjectFeed';
import ProjectDetail from '../ProjectDetail';


const App = props  => [
    props.isLoggedIn ? <Navbar key={1}/> : null,
    props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,// Priv : // Public
    <Footer key={3} />
  ];

App.propTypes = {
    isLoggedIn : PropTypes.bool.isRequired
  }
  const PrivateRoutes = props => (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/profile" component={MyProfile} />
        <Route exact path="/members" component={Members} />
        <Route exact path="/profile/registerProfile" component={RegisterProfile} />  
        <Route exact path="/project/registerProject" component={RegisterProject} />      
        <Route exact path="/projects" component={ProjectFeed}/>
        <Route exact path="/projects/:id" component={ProjectDetail}/>       
    </Switch>
);

const PublicRoutes = props => (
    <Switch>
        <Route exact path="/" component={Auth} />
    </Switch>
);

export default App;
