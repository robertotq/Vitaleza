import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Calendar from './Pages/Calendar';
import DetallesCita from './Pages/DetallesCita';

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
              <Route
              exact
              path ='/detallesCita'
              render={() => (
                  <DetallesCita />
                )} />
              </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    citaID: state.CitaID
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
      };
};

export default connect(mapStateToProps, mapDispatchtoProps)(App);
