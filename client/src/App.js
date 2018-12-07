import React, { Component } from 'react';
import Register from './components/Register';
import Login from './components/Login';

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      users: []
    };
  }
  render() {
    return (
      <div className="App">
        <Register/>
        <Login />
      </div>
    );
  }
}

export default App;
