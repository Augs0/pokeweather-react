import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { allCities } from "../data/cities.json";
import * as L from "leaflet";
import axios from "axios";

const Map = () => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getWeather();
  });

  const possiblePokemon = {
    rainy: "lotad",
    sunny: "growlithe",
    wind: "pidgeotto",
    snow: "cubchoo",
    cloudy: "swablu",
    fog: "litwick",
    clear: "clefairy",
    mist: "mimikyu-disguised",
  };

  const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeather = async () => {
    try {
      for (let index = 0; index < allCities.length; index++) {
        let city = allCities[index];
        const url = `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${city.name}&aqi=no`;
        const weatherData = await axios.get(url);
        let weatherForLocation = weatherData.data.current.condition.text;
        if (
          weatherForLocation.includes("cloudy") ||
          weatherForLocation.includes("Overcast")
        ) {
          weatherForLocation = "cloudy";
        } else if (
          weatherForLocation.includes("rain") ||
          weatherForLocation.includes("drizzle")
        ) {
          weatherForLocation = "rainy";
        }
        city.weather = weatherForLocation.toLowerCase();
        city.ally = city.name + city.weather;

        await getPokemonWithWeather(city);
      }
      setIsError(false);
      setLoading(false);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  };

  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [70, 60],
    },
  });

  const getPokemonWithWeather = async (city) => {
    try {
      let pokemonToGrab = possiblePokemon[city.weather];
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonToGrab}`;
      if (url !== "https://pokeapi.co/api/v2/pokemon/undefined") {
        const pokemonToSend = await axios.get(url);
        const spriteUrl = pokemonToSend.data.sprites.front_default;
        city.sprite = spriteUrl;

        city.icon = new LeafIcon({
          iconUrl: city.sprite,
        });
      } else {
        console.log("undefined!");
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
    setIsError(false);
  };

  const reloadWeather = () => {
    setLoading(true);
    getWeather();
  };

  if (loading === false) {
    return (
      <>
        <section className="map-key">
          <table width="80%" border="1">
            <caption>Map key</caption>
            <thead>
              <tr>
                <th>Pokemon</th>
                <th>Weather</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    src="
                https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/333.png"
                    alt="swablu"
                  />
                </td>
                <td>Cloudy or overcast</td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png"
                    alt="clefairy"
                  />
                </td>
                <td>Clear</td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/270.png"
                    alt="lotad"
                  />
                </td>
                <td>Rainy</td>
              </tr>
              <tr>
                <td>
                  <img
                    src=" https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png"
                    alt="growlithe"
                  />
                </td>
                <td>Sunny</td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png"
                    alt="pidgeotto"
                  />
                </td>
                <td>Windy</td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/613.png"
                    alt="cubchoo"
                  />
                </td>
                <td>Snow</td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/607.png"
                    alt="litwick"
                  />
                </td>
                <td>Fog</td>
              </tr>
              <tr>
                <td>
                  <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/778.png"
                    alt="mimikyu"
                  />
                </td>
                <td>Mist</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="map">
          <h2>Map of the UK and Ireland</h2>
          {isError ? <p>There was an error. Please try again</p> : null}
          <MapContainer
            center={[53.48, -2.23]}
            zoom={5.5}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {allCities.map((city) => {
              return (
                <Marker
                  key={city.name}
                  position={[city.latitude, city.longitude]}
                  icon={city.icon}
                  alt={city.ally}
                  keyboard="true"
                >
                  <Popup class="popup" closeOnEscapeKey="true">
                    {city.name}
                    <br />
                    {city.weather}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
          <button onClick={reloadWeather}>Get latest weather</button>
        </section>
      </>
    );
  } else {
    return (
      <>
        <p className="status-message">Loading...</p>
        {isError ? <p>There was an error. Please try again</p> : null}
      </>
    );
  }
};

export default Map;
