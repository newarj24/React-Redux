import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='navbar navbar-expand navbar-dark bg-primary'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <Link to='/' className='navbar-brand'>
            Pluralsight Admin
          </Link>
        </div>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/' exact>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/courses'>
              Courses
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/about'>
              About
            </NavLink>
          </li>
        </ul>
        <ul className='navbar-nav navbar-right'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/authors'>
              Author Details
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
