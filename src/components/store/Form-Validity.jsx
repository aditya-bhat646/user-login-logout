import React, {
  useState,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import PropTypes from 'prop-types';

import AuthContext from './Auth-Context';

const FormContext = React.createContext({
  formState: {},
  formIsValid: false || true,
  emailChangeHandler: () => {},
  passwordChangeHandler: () => {},
  submitHandler: () => {},
});

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

export function FormContextProvider({ children }) {
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

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const formContextValueProp = {
    formState,
    formIsValid,
    emailChangeHandler,
    passwordChangeHandler,
    submitHandler,
  };

  return (
    <FormContext.Provider value={formContextValueProp}>
      {children}
    </FormContext.Provider>
  );
}

FormContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormContext;
