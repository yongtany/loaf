import React from 'react'
import { Link } from 'react-router-dom';
import Logo from './loaf_logo_2.png';

const Navbar = (props) => (
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container">
            <Link className="navbar-brand" to="/">
              <img
                src={Logo}
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
                    <Link to="/crumbles" className="nav-link">친구 찾기</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/projects" className="nav-link">프로 젝트</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      마이페이지
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <Link className="dropdown-item" to="/profile">내 프로필</Link>
                      <Link className="dropdown-item" to="#">로그아웃</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
)


export default Navbar;