import React, { Component } from 'react';
import './App.css';
import Titles from "./components/Titles";
import Searchbox from "./components/Searchbox";
import Weather from "./components/Weather";
import DisplayFiveDay from "./components/DisplayFiveDay";

const API_KEY = "fba364d5bf84a6c80515ab56af96ea4a";

class App extends Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    desc: undefined,
    fiveday: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city && country){        
        this.setState({
            temperature: data.main.temp,
            city: data.name,
            country: data.sys.country,
            humidity: data.main.humidity,
            desc: data.weather[0].description,
            error: "",
            fiveday: undefined,
        })
    } else {
        this.setState({
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            desc: undefined,
            error: "Invalid Location"
        })
    }
  }

  getFiveDayForecast = async (e) => {
    const city = this.state.city;
    const country = this.state.country;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data)
    let fiveday = data.list.filter(val => val.dt_txt.includes("12:00:00"))
    this.setState({ fiveday })
  }

  render() {
    return (
      <div className="App">
       <Titles />
       <Searchbox getWeather={this.getWeather} />
       <Weather 
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            desc={this.state.desc}
            error={this.state.error}      
       />
       <DisplayFiveDay 
            city={this.state.city}
            country={this.state.country}
            getFiveDayForecast={this.getFiveDayForecast}
            fiveDay={this.state.fiveday}
       />
      </div>
    );
  }
}

export default App;
