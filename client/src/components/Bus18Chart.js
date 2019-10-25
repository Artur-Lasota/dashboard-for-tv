import React, { Component } from 'react';
import '../App.css';
import Chart from "react-apexcharts";

class Bus18Chart extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          
          x : [],
          percents: [],
          minutes: [],
          series: [0]
        };

        this.colorFill = this.colorFill.bind(this);
      }

      componentDidMount() {
        fetch('/api/bus_to_chart18')
            .then(response => response.json())
            .then((data) => {
              if(data !== undefined && data.bus_to_chart18 !== undefined) {
                this.setState({ 
                  percents: data.bus_to_chart18[0]
                })
              }
            });
            this.busToChartTimer();
          }
  
          busToChartTimer(){
              setInterval( async() => {
                  fetch('/api/bus_to_chart18')
                  .then(response => response.json())
                  .then(data => {
                    if(data !== undefined && data.bus_to_chart18 !== undefined) {
                      this.setState({
                        percents: data.bus_to_chart18[0]
                      })
                    }
                  })
              }, 1000*60)
            }
  

      colorFill(bus){
        var percent = parseInt(bus.percent)
        if(bus.minute !== undefined)
        {
          if(bus.minute<10){
            return <Chart
                  options={
                    {
                      colors: ['#C72230'],
                      labels: ['18'],
                      plotOptions: {
                        radialBar: {
                          startAngle: -90,
                          endAngle: 90,
                          track: {
                              background: "#e7e7e7",
                              strokeWidth: '97%',
                              shadow: {
                                  enabled: true,
                                  top: 2,
                                  left: 0,
                                  color: '#999',
                                  opacity: 1,
                                  blur: 2
                              }
                          },
                          dataLabels: {
                            name: {
                              fontSize: '76px', //size of label example our bus number
                              color: "#fff",
                              offsetY: -40
                              },
                            value: {
                              fontSize: '22px',  // size of label example our time to bus departure
                              color: '#fff',
                              offsetY: -26,
                              formatter: function (val) {
                                if(val !== 0)
                                {
                                  var min = 60 * (val * 0.01)
                                  return '00:0' + (parseInt(min))
                                }
                                  else return '00:00'
                                }
                            }
                          }
                        }
                      }
                    }
                  }
                  series={[percent]}
                  labels={this.state.labels}
                  type="radialBar"
                  width={600}
                />
            }
          else if (bus.minute >=10 && bus.minute<15){
            return <Chart
            options={
              {
                colors: ['#E8DB6B'],
                labels: ['18'],
                plotOptions: {
                  radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: '97%',
                        shadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: '#999',
                            opacity: 1,
                            blur: 2
                        }
                    },
                    dataLabels: {
                      name: {
                        fontSize: '76px', //size of label example our bus number
                        color: "#fff",
                        offsetY: -40
                        },
                      value: {
                        fontSize: '22px',  // size of label example our time to bus departure
                        color: '#fff',
                        offsetY: -26,
                        formatter: function (val) {
                          var min = 60 * (val * 0.01)
                          return '00:' + (parseInt(min))
                        }
                      }
                    }
                  }
                }
              }
            }
            series={[percent]}
            labels={this.state.labels}
            type="radialBar"
            width={600}
          />
          } else {
            return <Chart
            options={
              {
                colors: ['#92D001'],
                labels: ['18'],
                plotOptions: {
                  radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: '97%',
                        shadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: '#999',
                            opacity: 1,
                            blur: 2
                        }
                    },
                    dataLabels: {
                      name: {
                        fontSize: '76px', //size of label example our bus number
                        color: "#fff",
                        offsetY: -40
                        },
                      value: {
                        fontSize: '22px',  // size of label example our time to bus departure
                        color: '#fff',
                        offsetY: -26,
                        formatter: function (val) {
                          var min = 60 * (val * 0.01)
                          return '00:' + (parseInt(min))
                        }
                      }
                    }
                  }
                }
              }
            }
            series={[percent]}
            labels={this.state.labels}
            type="radialBar"
            width={600}
          />
          }
        }
      }

    render() {
        return (
              <div>
                {this.colorFill(this.state.percents)}
              </div>
        );
      }
}



export default Bus18Chart;