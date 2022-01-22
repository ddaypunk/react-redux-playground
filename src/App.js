import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import axios from 'axios';

const apiKey = "241404dc15eebd61df00197156fdadb6"
let lat = "41.874851" // Lombard, IL
let lon = "-88.019341"
let city = "Lombard"
let state = "il"
let country = "us"
let units = "imperial"
let baseUrl = "https://api.openweathermap.org/data/2.5"
let currentWeather = "/weather"
let oneCallUrl = "/onecall";


let getOneCallUrl = () => {
  // https://openweathermap.org/api/one-call-api
    return baseUrl + oneCallUrl + `?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
}

let getCurrentWeatherUrl = () => {
  // https://openweathermap.org/current
  return baseUrl + currentWeather + `?q=${city},${state},${country}&units=${units}&appid=${apiKey}`;
}

function App() {
  const [weather, setWeather] = useState(null);
  // weather will contain icon id to be used: http://openweathermap.org/img/wn/10d@2x.png
  const [error, setError] = useState(null);

  // this renders a lot I think, so not a great place for it
  useEffect(() => {
    axios.get(getCurrentWeatherUrl()).then((response) => {
      console.log(response.data)
      setWeather(response.data);
    }).catch(getError => {
      setError(getError)
    });
  }, []); // reason for empty array: https://stackoverflow.com/a/58122475

  if (error) return ` ${error.message}`
  if (!weather) return "No weather!!!";

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
