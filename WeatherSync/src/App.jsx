import { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "d21a29f32c979ef1bfd5a704038024bd";

function App() {
  const [city, setCity] = useState(() => localStorage.getItem("city"));
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [data,setData] = useState(true)
    

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setStatus("loading");
        setError("null");
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        if (!response.ok) {
          throw new Error("City not found or API error");
        }
        const data = await response.json();
        setWeatherData(data);
        setStatus("success");
      } catch (err) {
        console.log(`Error while fetching data:`, err);
        setStatus("error");
        setError(err.message);
        setWeatherData(null);
      }
    }

    const id = setInterval(() => {
      fetchWeatherData();
    }, 10000);

      return () => clearInterval(id);
      
    
      
  }, [city]);
    

 
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => !prev)
        }, 500)
        return () => clearInterval(interval)     
    },[])
    
  return (
    <>
      <h1>Weather data in : {city}</h1>
      {weatherData ? (
        <div>
          <p>Temperature:{weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      ) : (
        <p>Weather data is Loading....</p>
      )}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          localStorage.setItem("city", city);
        }}
          />
          <footer>
              <div>{data && <h1 style={{color:"red"}}>FLASHING TEXT</h1>}</div>
          </footer>
    </>
  );
}

export default App;

