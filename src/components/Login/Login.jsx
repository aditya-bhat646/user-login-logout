import React, { useState, useReducer } from 'react';
import PropTypes from 'prop-types';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const defaultFormState = {
  email: '',
  emailIsValid: undefined,
  password: '',
  passwordIsValid: undefined,
};

const formInputReducer = (state, action) => {
  if (action.type === 'EMAIL_INPUT') {
    return {
      ...state,
      email: action.payload,
      emailIsValid: action.payload.includes('@'),
    };
  }

  if (action.type === 'PASSWORD_INPUT') {
    return {
      ...state,
      password: action.payload,
      passwordIsValid: action.payload.trim().length > 6,
    };
  }

  if (action.type === 'ON_BLUR') {
    return { ...state };
  }

  return defaultFormState;
};

function Login({ onLogin }) {
  const [formIsValid, setFormIsValid] = useState(false);

  const [formInputState, dispatchFormAction] = useReducer(
    formInputReducer,
    defaultFormState,
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
    if (event.target.value.includes('@') && formInputState.passwordIsValid) {
      setFormIsValid(true);
    }
    dispatchFormAction({
      type: 'EMAIL_INPUT',
      payload: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    if (formInputState.emailIsValid && event.target.value.length > 6) {
      setFormIsValid(true);
    }
    dispatchFormAction({
      type: 'PASSWORD_INPUT',
      payload: event.target.value,
    });
  };

  const validateInputHandler = () => {
    if (formInputState.emailIsValid && formInputState.passwordIsValid) {
      setFormIsValid(true);
    }
    dispatchFormAction({
      type: 'ON_BLUR',
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(formInputState.email, formInputState.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formInputState.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">
            E-Mail
            <input
              type="email"
              id="email"
              value={formInputState.email}
              onChange={emailChangeHandler}
              onBlur={validateInputHandler}
            />
          </label>
        </div>
        <div
          className={`${classes.control} ${
            formInputState.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              value={formInputReducer.password}
              onChange={passwordChangeHandler}
              onBlur={validateInputHandler}
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
