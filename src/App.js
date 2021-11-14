import "./App.css";
import Footer from "./components/Footer";
import Map from "./components/Map";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokéweather</h1>
        <p>Track daily UK and Ireland weather, through Pokémon!</p>
      </header>
      <main id="main">
        <Map />
      </main>
      <Footer />
    </div>
  );
}

export default App;
