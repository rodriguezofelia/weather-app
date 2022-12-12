import "./App.css";
import UserWeather from "./components/UserWeather";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main>
        <UserWeather />
      </main>
    </div>
  );
}

export default App;
