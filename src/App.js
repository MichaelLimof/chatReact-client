import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode'
import AuthRoute from './Util/AuthRoute'
//Redux
import {Provider} from 'react-redux'
import store from './redux/store'
import {SET_AUTHENTICATED, SET_UNAUTHENTICATED} from './redux/types'
import {logoutUser, getUserData} from './redux/actions/userActions'

import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import Navbar from './components/Navbar';
import Theme from './Util/Theme'
import axios from 'axios';

const theme = createMuiTheme(Theme);

const token = localStorage.FBIdToken;

  if(token){
      const decodedToken  = jwtDecode(token);
          if(decodedToken.exp * 1000 < Date.now()){
            store.dispatch(logoutUser())
              window.location.href = '/login';
              
          }else{
           store.dispatch({type:SET_AUTHENTICATED});
           axios.defaults.headers.common['Authorization'] = token
           store.dispatch(getUserData());
      }
    }

 
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
 
        <Router>
          <div className="container">
            <Navbar />

            <Switch>
            <Route 
              exact 
              path="/" 
              component={home}/>
            <AuthRoute 
              exact 
              path="/login" 
              component={login} 
              />
            <AuthRoute 
              exact
              path="/signup" 
              component={signup} 
              />

            </Switch>
          </div>
        </Router>

      </Provider>
    </MuiThemeProvider>
  );
}

export default App;