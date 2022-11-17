import React from 'react';
import PropTypes from 'prop-types';

import classes from './Navigation.module.css';

function Navigation({ isLoggedIn, onLogout }) {
  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button
              type="button"
              onClick={onLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
