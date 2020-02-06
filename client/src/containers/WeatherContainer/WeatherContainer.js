import React from 'react';
import AQI from '../../components/AQI/Aqi';
import Weather from '../../components/Weather/Weather';
import '../../App.css';

const weatherContainer = () => {
return(
    <div className="box">
        <Weather />
        <AQI/>
    </div>
)};

export default weatherContainer;