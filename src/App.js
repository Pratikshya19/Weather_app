import React from "react";      //import react object from react package that live in package json
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';
import { async } from "q";


const API_KEY = "84717655ce7fa2fced83edfe8aab43b4";


class App extends React.Component { 
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,

  }


getWeather = async(e) => {
  e.preventDefault()
  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;
  
  const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
  const data = await api_call.json();
  
  if (city && country){
    console.log(data)
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humoidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
    })
  }
  else {
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humoidity: undefined,
      description: undefined,
      error: "Please enter the values"})


  }
}


render(){
  return(<div>
    <div className="wrapper">
      <div className="main">
        <div className="container">
          <div className="row">
            <div className=".col-xs-5 title-container">
            <Title/>
<div className=".col-xs-7 form-container">
<Form getWeather={this.getWeather}/>
   <Weather temperature={this.state.temperature} city={this.state.city} country={this.state.country} humidity={this.state.humidity} description={this.state.description} error={this.state.error} />
</div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>)                   

}
}

{/* 
    */}


export default App;  