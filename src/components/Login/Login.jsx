import React, { useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import FormContext from '../store/Form-Validity';

function Login() {
  const formContext = useContext(FormContext);

  return (
    <Card className={classes.login}>
      <form onSubmit={formContext.submitHandler}>
        <Input
          label="Email"
          id="email"
          type="email"
          onChange={formContext.emailChangeHandler}
          value={formContext.formState.email}
          isValid={formContext.formState.emailIsValid}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          onChange={formContext.passwordChangeHandler}
          value={formContext.formState.password}
          isValid={formContext.formState.passwordIsValid}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formContext.formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Login;
