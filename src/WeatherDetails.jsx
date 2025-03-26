import React from 'react';
import humidityImg from "./assets/humidity.png";
import snowImg from "./assets/snow.png";

const WeatherDetails = ({ icon, temp, city, country, lat, lon,humidity , wind }) => {
    return (
        <div className="weather-details">
            <div className="image">
                <img src={icon} alt="weather-icon" />
            </div>
            <div className="temp">{temp}°C</div>
            <div className="city">{city}</div>
            <div className="country">{country}</div>
            <div className="cord">
                <div>
                    <span className='latitude'>Latitude:</span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className='longitude'>Longitude:</span>
                    <span>{lon}</span>
                </div>
            </div>
            <div className="humidity">
                <img src={humidityImg} alt="humidity" className='icon' />
                <div className="data">
                    <div className="humidity-percent">{humidity}%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="humidity">
                <img src={snowImg} alt="snow" className='icon' />
                <div className="data">
                    <div className="snow-percent">{wind} km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
            
        </div>
    );
};

export default WeatherDetails;
