import React, { Component } from 'react';
import './Weather.css';

class Weather extends Component {

    state= {
        forecast: [],
        loaded: false
    }

    componentDidMount() {
        fetch('api/weather')
            .then(response => response.json())
            .then(data => this.setState({ forecast: data.forecast, loaded: true }));
            this.weatherTimer();
        }

    weatherTimer(){
      setInterval( async() => {
        fetch('api/weather')
        .then(response => response.json())
        .then(data => this.setState({ forecast: data.forecast, loaded: true }));
      }, 1000*60*30)
    }

    changeIcon(icon){
      if(icon === 'partly-cloudy-day' || icon === 'partly-cloudy-night'){
        return 'cloudy'
      } else if(icon === ' wind'){
        return 'windy'
      } else if(icon === 'clear-day' || icon === 'clear-night'){
        return 'sunny'
      }
      return icon
    }

  render() {
    return (
      <div>
      {
        this.state.loaded ? (
          <div className="weather-box--margin">
            <div className="current-weather">
              <div className="icon-weather">
                <i className={'wi wi-day-'+this.changeIcon(this.state.forecast.icon)}></i>
              </div>
              <div className="temperature__current">
                {this.state.forecast.temperature}°C
              </div>
            </div>
            <div className="temperature__details">
              <div className="temperature__high">
                <i className='wi wi-thermometer'></i> {this.state.forecast.highTemp}°C
              </div>
              <div className="temperature__low">
                <i className='wi wi-thermometer'></i> {this.state.forecast.lowTemp}°C
              </div>
              <div className="temperature__rain">
                <i className='wi wi-raindrop'></i> {parseInt(this.state.forecast.rainProb)}%
              </div>
              <div className="mobile-clearfix"></div>
            </div>
          </div>
          ) : ('nothing')
      }
      </div>
    );
  }
}

export default Weather;