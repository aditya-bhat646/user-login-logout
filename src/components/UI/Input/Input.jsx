import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

function Input({
  label, id, type, onChange, value, isValid,
}) {
  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={id}>
        {label}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

Input.propTypes = {
  isValid: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

Input.defaultProps = {
  isValid: undefined,
};

export default Input;
