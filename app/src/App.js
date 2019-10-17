import React, { Component } from 'react';
import Weather from './components/Weather';
import News from './components/News';
import Bitcoin from './components/Bitcoin';
import Bus from './components/Bus';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main-font">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        
        <Weather />
        <Bitcoin />
        <Bus />
        <News />
      </div>
    );
  }
}

export default App;
