import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode'
import AuthRoute from './Util/AuthRoute'


import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import Navbar from './components/Navbar';
import Theme from './Util/Theme'

const theme = createMuiTheme(Theme);

let authenticated;
const token = localStorage.FBIdToken;

  if(token){
      const decodedToken  = jwtDecode(token);
          if(decodedToken.exp * 1000 < Date.now()){
              window.location.href = '/login';
              authenticated = false ;
          }else{
            authenticated = true 
      }
    }

 
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <div className="container">
            <Navbar />

            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>

            </Switch>
          </div>
        </Router>
      </div>

    </MuiThemeProvider>
  );
}

export default App;