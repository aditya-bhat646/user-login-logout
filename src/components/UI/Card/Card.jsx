import React from 'react';
import PropTypes from 'prop-types';

import classes from './Card.module.css';

function Card({ className, children }) {
  return (
    <div className={`${classes.card} ${className}`}>{children}</div>
  );
}

Card.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(Object).isRequired,
};

export default Card;
