import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const defaultEmailState = {
  value: '',
  isValid: undefined,
};

const defaultPasswordState = {
  value: '',
  isValid: undefined,
};

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.payload,
      isValid: action.payload.includes('@'),
    };
  }

  if (action.type === 'ON_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@'),
    };
  }
  return defaultEmailState;
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.payload,
      isValid: action.payload.trim() > 6,
    };
  }
  if (action.type === 'ON_BLUR') {
    return {
      value: state.value,
      isValid: state.value.length > 6,
    };
  }
  return defaultPasswordState;
};

function Login({ onLogin }) {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailAction] = useReducer(
    emailReducer,
    defaultEmailState,
  );

  const [passwordState, dispatchPasswordAction] = useReducer(
    passwordReducer,
    defaultPasswordState,
  );

  // useEffect(() => {
  //   const timerIdentifier = setTimeout(() => {
  //     if (enteredEmail.includes('@')
  //     && enteredPassword.trim().length >= 7) {
  //       setFormIsValid(true);
  //     } else {
  //       setFormIsValid(false);
  //     }
  //   }, 750);

  //   return () => clearTimeout(timerIdentifier);
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    if (event.target.value.trim().includes('@') && passwordState.isValid) {
      setFormIsValid(true);
    }
    dispatchEmailAction({
      type: 'USER_INPUT',
      payload: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    if (emailState.isValid && event.target.value.length > 6) {
      setFormIsValid(true);
    }
    dispatchPasswordAction({
      type: 'USER_INPUT',
      payload: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmailAction({
      type: 'ON_BLUR',
    });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordAction({
      type: 'ON_BLUR',
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.value === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">
            E-Mail
            <input
              type="email"
              id="email"
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </label>
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </label>
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
