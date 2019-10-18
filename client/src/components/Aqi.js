import React, { Component } from 'react';
import '../App.css';

class Aqi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      aqi: '',
      color: '',
      series: [0]
    };
  }

    componentDidMount() {
        fetch('/api/aqi')
            .then(response => response.json())
            .then(data => 
            this.setState({ aqi: data.aqi.aqivalue, color: data.aqi.color}));
            this.aqiTimer();
        }

    aqiTimer(){
      setInterval( async() => {
          fetch('/api/aqi')
          .then(response => response.json())
          .then(data => this.setState({aqi: data.aqi.aqivalue, color: data.aqi.color}));
      }, 1000*60*60*3)
    }

    

  render() {
    return (
    <div >
      <div className="aqi__text-relative">
        <div className="icon-aqi">
          <i className={'wi wi-smog wi-color--'+this.state.color}></i>
        </div>
        <div className="aqi__text-position">AQI: {this.state.aqi}</div>
      </div>
      </div>
      
    );
  }
}

export default Aqi;