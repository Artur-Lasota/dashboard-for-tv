import React from 'react';
import '../../App.css';
import Bus6Chart from '../../components/BusCharts/Bus6Chart/Bus6Chart';
import Bus13Chart from '../../components/BusCharts/Bus13Chart/Bus13Chart';
import Bus18Chart from '../../components/BusCharts/Bus18Chart/Bus18Chart';

const BusContainer = () => {
    return (
      <section className="box">
        <div className="ApexCharts--margin-30"></div>
        <div className="ApexCharts__mixed--chart"><Bus6Chart/></div>
        <div className="ApexCharts__mixed--chart"><Bus13Chart/></div>
        <div className="ApexCharts__mixed--chart"><Bus18Chart/></div>
      </section>
      );
}




export default BusContainer;