import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import { Navbar } from './components/layouts/Navbar';
import { Landing } from './components/layouts/Landing';
import { Login } from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layouts/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route
              path='/*'
              element={
                <section className='container'>
                  <Alert />
                  <Routes>
                    <Route path='register' element={<Register />} />
                    <Route path='login' element={<Login />} />
                  </Routes>
                </section>
              }
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
