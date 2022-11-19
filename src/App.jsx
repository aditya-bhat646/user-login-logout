import React, { useContext } from 'react';

import AuthContext from './components/store/Auth-Context';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import { FormContextProvider } from './components/store/Form-Validity';

function App() {
  const authContext = useContext(AuthContext);

  return (
    <>
      <MainHeader />
      <main>
        {!authContext.isLoggedIn
        && (
          <FormContextProvider>
            <Login />
          </FormContextProvider>
        )}
        {authContext.isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
