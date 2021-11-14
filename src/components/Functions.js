import React from "react";

const Functions = () => {
  // const axios = require("axios");

  const possiblePokemon = {
    rain: "lotad",
    sun: "growlithe",
    wind: "pidgeotto",
    snow: "cubchoo",
    cloudy: "gastly",
    fog: "litwick",
  };

  async function getWeather() {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f576c5036b32b45ca45beda85b8fc8b9`;
      const weatherData = await axios.get(url);
      weatherForLocation = weatherData.data.weather[0];
      // const spriteUrl = pokemonToSend.data.sprites.front_default;
      // populateTable(spriteUrl, weather);
    } catch (err) {
      console.log(`Error: ${err?.response?.data}`);
    }
    // let todaysWeather = "rain";
    // const weatherPokemon = possiblePokemon[todaysWeather];
    // console.log(todaysWeather, weatherPokemon);
    // getPokemonWithWeather(weatherPokemon, todaysWeather);
  }

  const getPokemonWithWeather = async (pokemon, weather) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const pokemonToSend = await axios.get(url);
      const spriteUrl = pokemonToSend.data.sprites.front_default;
      populateTable(spriteUrl, weather);
    } catch (error) {
      console.log(error);
    }
  };

  function populateTable(url, weather) {
    //  create a view for the user with the data combined
    console.log(url, weather);
  }

  return <div></div>;
};

export default Functions;
