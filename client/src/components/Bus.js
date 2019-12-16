import React, { Component } from 'react';
import '../App.css';
import Bus6Chart from './Bus6Chart';
import Bus13Chart from './Bus13Chart';
import Bus18Chart from './Bus18Chart';

class Bus extends Component {
  render() {
    return (
      <div className="bus-box--height slider">
        <div className="ApexCharts--margin-30"></div>
        <div className="ApexCharts__mixed--chart slide" id="slide-1"><Bus6Chart/></div>
        <div className="ApexCharts__mixed--chart slide" id="slide-2"><Bus13Chart/></div>
        <div className="ApexCharts__mixed--chart slide" id="slide-3"><Bus18Chart/></div>
      </div>
      );
  }
}




export default Bus;