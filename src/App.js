import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './Layout/Layout';
import Signup from './Components/Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Layout />
       <Signup />
      </div>
    );
  }
}

export default App;
