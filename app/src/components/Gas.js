import React, { Component } from 'react';
import '../App.css';
import Icon from '@material-ui/core/Icon';

class Gas extends Component {

    state= {
        loaded: false,
        gas: [],
        gasPodlaskie: []
    }

     componentDidMount() {
        fetch('http://localhost:5000/api/gas')
            .then(response => response.json())
            .then(data => this.setState({ gas: data.gas, loaded: true }));
            this.gasTimer();
            
        }

        gasTimer(){
            setInterval( async() => {
                fetch('http://localhost:5000/api/news')
                .then(response => response.json())
                .then(data => this.setState({ news: data.news, loaded: true }));
            }, 1000*60*60*24)
        }

        //  gasPodlaskieFilter(){
        //     this.state.gas.map((g) => 
        //    {
        //        if(g.title === "Podlaskie"){
        //            this.setState((g) => ({
        //                gasPodlaskie: g
        //            }))
        //        }

        //     })
        // }

        changeToIcon(diffSymb){
            if(diffSymb === '+')
                {
                    return 'keyboard_arrow_up'
                }
            else return 'keyboard_arrow_down'
        }

        changeColor(diff){
            if(diff === '+')
            {
                return 'incerease'
            } else
            return 'decreases'
        }

  render() {
      return (
        <div className="box">
        {
            this.state.loaded ? (
            <div>
        {
            this.state.gas.map((g, i) => 
            <div className="box__text fuel-prices__main-box" key={i}>
                <div  className="fuel-prices--display-inline first-block-element-gas">
                    <div className="fuel-prices__text" >
                        DIE: {g.diePrice}
                    </div>
                    <div className="fuel-prices__text-diff ">
                        <Icon className={"icon_large--"+this.changeColor(g.diePriceDiff)} style={{ fontSize: 42 }}>
                            {this.changeToIcon(g.diePriceDiff)}
                        </Icon>
                    </div>
                </div>
                <div className="fuel-prices--display-inline ">
                    <div className="fuel-prices__text">
                    E95: {g.e95Price}
                    </div>
                    <div className="fuel-prices__text-diff">
                        <Icon className={"icon_large--"+this.changeColor(g.e95PriceDiff)} style={{ fontSize: 42 }}>
                            {this.changeToIcon(g.e95PriceDiff)}
                        </Icon>
                    </div>
                </div>
                <div className="fuel-prices--display-inline">
                    <div className="fuel-prices__text">
                     S98: {g.s98Price}
                    </div>
                    <div className="fuel-prices__text-diff">
                        <Icon className={"icon_large--"+this.changeColor(g.s98PriceDiff)} style={{ fontSize: 42 }}>
                            {this.changeToIcon(g.s98PriceDiff)}
                        </Icon>
                    </div>
                </div>
                <div className="fuel-prices--display-inline">
                    <div className="fuel-prices__text">
                    LPG: {g.lpgPrice}
                    </div>
                    <div className="fuel-prices__text-diff">
                        <Icon className={"icon_large--"+this.changeColor(g.lpgPriceDiff)} style={{ fontSize: 42 }}>
                            {this.changeToIcon(g.lpgPriceDiff)}
                        </Icon>
                    </div>
                </div>
            </div>)
        }
            </div>
            ) : ('nothing')
        }
        </div>
        );
    }
}

export default Gas;