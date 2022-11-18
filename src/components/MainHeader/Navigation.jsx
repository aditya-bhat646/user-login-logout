/* eslint-disable no-console */
import React, { useContext } from 'react';

import AuthContext from '../store/Auth-Context';

import classes from './Navigation.module.css';

function Navigation() {
  const authContext = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {authContext.isLoggedIn && (
          <li>
            <button
              type="button"
              onClick={authContext.onLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
