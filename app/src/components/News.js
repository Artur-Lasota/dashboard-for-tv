import React, { Component } from 'react';
import '../App.css';

class News extends Component {

    state= {
        loaded: false,
        news: []
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/news')
            .then(response => response.json())
            .then(data => this.setState({ news: data.news, loaded: true }));
        this.newsTimer();
        }

        newsTimer(){
            setInterval( async() => {
                fetch('http://localhost:5000/api/news')
                .then(response => response.json())
                .then(data => this.setState({ news: data.news, loaded: true }));
            }, 1000*60*30)
        }
  render() {
      return (
        <div className="box box__text">
        {
            this.state.loaded ? (
            <div>
        {
            <div className="ticker-wrap">
                <div className="ticker">
              {this.state.news.map((n, i) => 
              
                    <div key={i} className="ticker__item">
                        <div>
                            <div>
                                {n.title} 
                            </div>
                        </div>
                    </div>
              )}
              </div>
        </div>
        }
            </div>
            ) : ('nothing')
        }
        </div>
        );
    }
}

export default News;