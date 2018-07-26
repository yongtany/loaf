import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = (props) => (
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container">
            <Link className="navbar-brand" to="/">
              <img
                src='http://www.iconarchive.com/download/i95612/iconsmind/outline/Bread.ico'
                alt='brand'
                style={ { color: 'white', width: '30px', marginRight: '4px', marginBottom : '3px'} }
              />{' '}
              Loaf
            </Link>
              <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/crumbles" className="nav-link">Members</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/projects" className="nav-link">Projects</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
)


export default Navbar;