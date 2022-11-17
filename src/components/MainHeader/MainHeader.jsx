import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';

function MainHeader({ isAuthenticated, onLogout }) {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      <Navigation isLoggedIn={isAuthenticated} onLogout={onLogout} />
    </header>
  );
}

MainHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default MainHeader;
