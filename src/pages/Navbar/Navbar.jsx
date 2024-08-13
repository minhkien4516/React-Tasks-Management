import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/logo.png';

const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <>
      <div className="container-navbar">
        <nav className="navbar">
          <div className="navbar-logo">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
          </ul>
          <div className="navbar-btn">
            <Link to="/tasks/add-new">
              <button
                type="submit"
                className={
                  pathname.includes('add')
                    ? 'navbar-btn-add_hide'
                    : 'navbar-btn-add_show'
                }
              >
                Add Task
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
