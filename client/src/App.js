import React, { Component } from 'react';
import WeatherContainer from './containers/WeatherContainer/WeatherContainer';
import News from './components/News/News';
import BitcoinContainer from './containers/BitcoinContainer/BitcoinContainer';
import BusContainer from './containers/BusContainer/BusContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <main className="main-font">
        <header>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </header>
        <WeatherContainer />
        <BitcoinContainer/>
        <BusContainer />
        <News />
      </main>
    );
  }
}

export default App;
