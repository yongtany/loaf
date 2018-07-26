import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../Navbar';
import Footer from '../Footer';
import Landing from '../Landing';
import Members from '../Members';
import Projects from '../Projects';
import Mypage from '../Mypage';
import Auth from '../Auth';


const App = props  => [
    // Nav,
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
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/members" component={Members} />
    </Switch>
);

const PublicRoutes = props => (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route exact path="/projects" component={Projects} />
    </Switch>
);

export default App;
