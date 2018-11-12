import React, { Component } from 'react';
import Calendar from './calendar';
import logo from './logo.svg';
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
        <div>
          <div>
            ASDFASDFAsd
          </div>
            <Calendar />
        </div>
    );
  }
}

export default App;
