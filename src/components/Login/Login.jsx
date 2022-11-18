import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../store/Auth-Context';

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

  return defaultFormState;
};

function Login() {
  const [formIsValid, setFormIsValid] = useState(false);

  const authContext = useContext(AuthContext);

  const [formState, dispatchFormAction] = useReducer(
    formInputReducer,
    defaultFormState,
  );

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      if (formState.email.includes('@')
      && formState.password.length > 6) {
        setFormIsValid(true);
      } else {
        setFormIsValid(false);
      }
    }, 500);

    return () => clearTimeout(timerIdentifier);
  }, [formState.emailIsValid, formState.passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchFormAction({
      type: 'EMAIL_INPUT',
      payload: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchFormAction({
      type: 'PASSWORD_INPUT',
      payload: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(formState.email, formState.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">
            E-Mail
            <input
              type="email"
              id="email"
              value={formState.email}
              onChange={emailChangeHandler}
            />
          </label>
        </div>
        <div
          className={`${classes.control} ${
            formState.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              value={formState.password}
              onChange={passwordChangeHandler}
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

export default Login;
