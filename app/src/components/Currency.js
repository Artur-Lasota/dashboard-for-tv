import React, { Component } from 'react';
import '../App.css';
import Flag from 'react-world-flags'

class Currency extends Component {

    state= {
        currency: []
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/currency')
            .then(response => response.json())
            .then(data => this.setState({ currency: data.currency[0].rates }));
            this.currencyTimer();
        }

        currencyTimer(){
            setInterval( async() => {
                fetch('http://localhost:5000/api/currency')
                .then(response => response.json())
                .then(data => this.setState({ currency: data.currency[0].rates }));
            }, 1000*60*30)
        }

        renderFlag(flag, alt){
            return(
                <Flag
                basePath='img/flags'
                name={flag}
                format="png"
                pngSize={32}
                alt={alt}
                />
            )
        }

  render() {
    return (
         <div className="box box__text">
            <div className="first-block-element">
            <Flag code={ 'EU' } height="42"/> <span className="flag-position">{this.state.currency.EUR} PLN</span>
            </div>
            <div>
            <Flag code={ 'usa' } height="32"/> <span className="flag-position">{this.state.currency.USD} PLN</span>
            </div> 
            <div>
            <Flag code={ 'gb' } height="32"/> <span className="flag-position">{this.state.currency.GBP} PLN</span>
            </div>
            <div>
            <Flag  className="flag-position--square" code={ 'ch' } height="42"/> <span className="flag-text-position--square">{this.state.currency.CHF} PLN</span>
            </div>
       </div>
    );
  }
}

export default Currency;