import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Calendar from './Pages/Calendar';

import './App.css';

class App extends Component {

  componentDidMount(){
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
