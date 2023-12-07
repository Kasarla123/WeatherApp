
import React, { useState } from 'react';
import './CityWeather.css';
import bgimage from './images/weather.jpg';
export default function CityWeather() {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const getDaySuffix = (day) => {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return 'st';
      case 2:
      case 22:
        return 'nd';
      case 3:
      case 23:
        return 'rd';
      default:
        return 'th';
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const daySuffix = getDaySuffix(day);

    return `${day}${daySuffix} ${month} ${year}`;
  };

  const determineWeatherCondition = (cloudiness) => {
    return cloudiness < 30 ? 'Sunny' : 'Cloudy';
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e849ec378296aae22dc243a8b9d84def`)
      .then((result) => result.json())
      .then((data) => {
        const kelvin = data.main.temp;
        const celsius = kelvin - 273.15;
        setTemperature(Math.round(celsius));
        setLocation(data.name);
        const currentDate = formatDate(new Date());
        setCurrentDate(currentDate);
        const condition = determineWeatherCondition(data.clouds.all);
        setWeatherCondition(condition);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <>
          <div className='image'>
        <img src={bgimage} alt="Background" />

      <form className="weather-form" onSubmit={submitHandler}>
        <input
          type="text"
          value={city}
          onChange={changeHandler}
          placeholder="Enter city"
          className="city-input"
        />
         </form>
        {temperature !== null && (
          <div className="weather-info">
              <span className="location">{location}</span>
              <br />
              <span className="date">{currentDate}</span>
              <br />
              <span className="temperature">{temperature}°C</span>
              <br />
              <span className="condition">{weatherCondition}</span>
          </div>
        )}
      </div>
    </>
  );
}