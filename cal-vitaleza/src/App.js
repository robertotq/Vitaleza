import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Calendar from './Pages/Calendar';

import './App.css';

const axios = require('axios');
const url = 'http://127.0.0.1:5000';

class App extends Component {

  componentDidMount(){
    axios.get(`${url}/user/robertoTQ`)
      .then(function (response){
        console.log(response);
      })
      .catch( function (error) {
        console.log(error);
      })
  }

  render() {
    return (
        <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path ='/'
              render={() => (
                  <Login />
                )} />
            <Route
              exact
              path ='/calendario'
              render={() => (
                  <Calendar />
                )} />
              </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
