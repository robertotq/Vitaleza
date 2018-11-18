import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Calendar from './Pages/Calendar';
import DetallesCita from './Pages/DetallesCita';
import CrearCita from './Pages/CrearCita';
import CrearPaciente from './Pages/CrearPaciente';

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
              <Route
              exact
              path ='/crearCita'
              render={() => (
                  <CrearCita />
                )} />
              <Route
              exact
              path ='/crearPaciente'
              render={() => (
                  <CrearPaciente />
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
