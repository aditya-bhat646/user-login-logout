/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

function Button({
  type, className, onClick, disabled, children,
}) {
  return (
    <button
      type={type || 'button'}
      className={`${classes.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

Button.defaultProps = {
  className: '',
  onClick() {
    console.log('Button-Prop-onClick-noProp/missing');
  },
  disabled: true,
};

export default Button;
