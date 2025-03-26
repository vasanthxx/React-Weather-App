import React, { useState, useEffect } from 'react';
import "./weather.css";
import searchImg from "./assets/search.png";
import snowImg from "./assets/snow.png";
import WeatherDetails from './WeatherDetails';
import clearImg from "./assets/clear.png"
import cloudImg from "./assets/clouds.png"
import drizzleImg from "./assets/drizzle.png"
import rainImg from "./assets/rain.png"


const Weather = () => {
    const api_key = `7003fa9a9699d27bf9de8eaa70ff1bd0`

    const [loading, setLoading] = useState(false)
    const [cityNotFound, setCityNotFound] = useState(false)
    const [text, setText] = useState("chennai")
    const [icon, setIcon] = useState(snowImg);
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("Chennai");
    const [country, setCountry] = useState("IN");
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [error, setError] = useState(null);


    const weatherIconMap = {
        "01d": clearImg,
        "01n": clearImg,
        "02d": cloudImg,
        "02n": cloudImg,
        "03d": drizzleImg,
        "03n": drizzleImg,
        "04d": drizzleImg,
        "04n": drizzleImg,
        "09d": rainImg,
        "09n": rainImg,
        "10d": rainImg,
        "10n": rainImg,
        "13d": snowImg,
        "13n": snowImg,
    };

    const search = async () => {
        if (text.trim() === "") {
            setError("Please enter a city name.");
            return;
        }
    
        setLoading(true);
        setError(null);
        setCityNotFound(false);
    
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            if (data.cod === "404") {
                setCityNotFound(true);
                setLoading(false);
                return;
            }
    
            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemp(Math.floor(data.main.temp));
            setCity(data.name);
            setCountry(data.sys.country);
            setLat(data.coord.lat);
            setLon(data.coord.lon);
    
            setIcon(weatherIconMap[data.weather[0].icon] || clearImg);
            setCityNotFound(false);
        } catch (error) {
            setError("An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(function () {
        search()
    }, []);

    function handleText(e) {
        setText(e.target.value)
    }
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            search();
        }
    }


    return (
        <>
            <div className="container">
                <div className="search-container">
                    <input type="text" placeholder='Enter City' className='search-box' value={text} onChange={handleText} onKeyDown={handleKeyDown} />
                    <div className="search-icon" onClick={() => search()}>
                        <img src={searchImg} alt="search" />
                    </div>
                </div>
                {loading && (
                    <div className="loading-msg">
                        <span className="spinner"></span> Loading...
                    </div>
                )}

                {error && <div className="error-msg">{error}</div>}
                {cityNotFound && <div className="citynotfound">city not found</div>}

                {!loading && !cityNotFound && <WeatherDetails
                    icon={icon}
                    temp={temp}
                    city={city}
                    country={country}
                    lat={lat}
                    lon={lon}
                    humidity={humidity}
                    wind={wind}
                />}

            </div>


        </>
    );
};

export default Weather;
