import React, { Component } from 'react';
import '../App.css';
import Gas from './Gas';
import Currency from './Currency';
import Chart from "react-apexcharts";

class Bitcoin extends Component {

    constructor(props) {
      super(props);
      this.state = {
        loaded: false,
        higherthan2: false,
        bitcoin: [],
        options: {
          chart: {
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        stroke: {
            curve: 'smooth'
        },
          colors: ["#ffb84d"],
          yaxis: {
              title: {
                  text: '',
                  style: {
                    color: '#fff',
                    fontSize: '20px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                }
              },
              labels: {
                show: true,
                style: {
                    color: '#d3d3d3',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                }
              }
          },
          xaxis: {
              labels: {
                  style: {
                      colors: '#d3d3d3',
                  }
              }
          }
        },
        series: []
      };
      // This binding is necessary to make `this` work in the callback
      this.checkBitcoinLength = this.checkBitcoinLength.bind(this);

    }

    componentDidMount() {
          fetch('/api/bitcoin')
            .then(response => response.json())
            .then(data => this.setState(state => {
              state.bitcoin.push(data.bitcoin[0].rates)}
              ))
            .then (data => this.setState({bitcoinString: data}))
            .then(this.setState({loaded: true}))
            .then(this.checkBitcoinLength());
        this.getBitcoin()
    }

    getBitcoin() {
        setInterval(async() =>{
            fetch('/api/bitcoin')
            .then(response => response.json())
            .then(data => this.setState(state => {
              state.bitcoin.push(data.bitcoin[0].rates)}))
            .then(this.setState({loaded: true}))
            .then(this.checkBitcoinLength())
      }
        , 1000*60);
    }

    checkBitcoinLength(){
      var arrBTC = [];
      var arrBTCSliced = [];
      if(this.state.bitcoin[0] !== undefined)
        {
          if(this.state.bitcoin.length>1){
            this.setState({higherthan2: true})
          for(var i = 0; i< this.state.bitcoin.length; i++){
            arrBTC.push(this.state.bitcoin[i].BTC)
          }
          arrBTCSliced = arrBTC.slice(Math.max(arrBTC.length - 10, 0))
          console.log(arrBTC.slice(Math.max(arrBTC.length - 10, 0)))
          this.setState({
            series: [
              { 
                name: 'BTC',
                data: arrBTCSliced
              }
            ]
        }) 
        } else return 'Cena bitcoin: ' + this.state.bitcoin[0].BTC + ' USD'
      } else return 'nothing'
    }


  render() {
    return (
      <div className="box">
      {
          this.state.loaded ? (
          <div>
      
          <div className="bitcoin box__text floating-left">
            {this.state.higherthan2 ? (
              <div>
                <Chart
                  options={this.state.options}
                  series= {this.state.series}
                  type="line"
                  width="950"
                  height="250"
                />
              </div>
            ) : (
            <div>
              {this.checkBitcoinLength()}
            </div>)
          }
          
          
          </div>
          <div className="currency floating-left">
              <Currency />
          </div>
          <div className="gas floating-left">
              <Gas />
          </div>
          <div className="clearfix" />
      
          </div>
          ) : ('nothing')
      }
      </div>
      );
  }


}

export default Bitcoin;