import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';

import Forecast from "./components/forecast";

class App extends Component {
  render() {
    return ( 
      <div>
        <Route exact path="/" component={Forecast}/>  
      </div>
    );
  }
}

export default App;