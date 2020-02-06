import React, { Component } from 'react';
import '../../App.css';


const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hoursHand = document.querySelector('.hour-hand');

class Timer extends Component {

  state = {
    time: new Date().toLocaleString()
  }
  
  componentDidMount() {
      // setInterval(() => {
      //   this.setState({ time: new Date().toLocaleString()});
      // }, 1000);

      setInterval(() => {
        //this.setDate();
      }, 1000);
    }
    
    setDate(){
        const now = new Date ();
        const seconds = now.getSeconds();
        const secondsDegrees = ((seconds / 60) *360) + 90;
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`
        console.log(seconds);
    
        const minutes = now.getMinutes();
        const minutesDegrees = ((minutes / 60) *360) + 90;
        minHand.style.transform = `rotate(${minutesDegrees}deg)`
        console.log(minutes);
    
        const hours = now.getHours();
        const hoursDegrees = ((hours / 12) *360) + 90;
        hoursHand.style.transform = `rotate(${hoursDegrees}deg)`
        console.log(hours);
    }

    

  render() {
    return (
      <div class="clock">
        <div class="clock-face">
          <div class="hand hour-hand"></div>
          <div class="hand min-hand"></div>
          <div class="hand second-hand"></div>
        </div>
      </div>
    );
  }
}

export default Timer;