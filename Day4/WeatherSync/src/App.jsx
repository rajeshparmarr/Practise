import React, { useEffect, useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const API_KEY = "c17feacb20ad53fa39c0266f622e03c4";// Replace with your OpenWeatherMap API key

  // Debounce: only fetch after user stops typing for 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setCity(inputValue);
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    if (!city || !city.trim()) {
      setWeatherData(null);
      setStatus("idle");
      return;
    }

    let mounted = true;

    async function fetchData() {
      try {
        setStatus("loading");
        setError(null);

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          const errText = await response.text().catch(() => "");
          throw new Error(
            `City not found or API error (status ${response.status})`
          );
        }

        const data = await response.json();
        if (!mounted) return;
        setWeatherData(data);
        setStatus("success");
      } catch (err) {
        console.error("Error while fetching data:", err);
        if (!mounted) return;
        setStatus("error");
        setError(err.message || "Unknown error");
        setWeatherData(null);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [city, API_KEY]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-2">Weather Sync</h1>
      <p className="text-gray-600 mb-6">Real-time weather information</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter city name
        </label>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          type="text"
          value={inputValue}
          placeholder="e.g., London, Tokyo, New York"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      {status === "idle" && (
        <div className="text-gray-500 text-center py-8">
          Type a city name to see weather information
        </div>
      )}

      {status === "loading" && (
        <div className="text-blue-600 text-center py-8">
          Loading weather data...
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      {status === "success" && weatherData && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {weatherData.name}, {weatherData.sys?.country}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-3xl font-bold text-blue-600">
                {weatherData.main?.temp ?? "—"}°C
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-3xl font-bold text-blue-600">
                {weatherData.main?.humidity ?? "—"}%
              </p>
            </div>
          </div>
          <div className="mt-4 bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600">Conditions</p>
            <p className="text-xl font-semibold text-gray-800 capitalize">
              {weatherData.weather?.[0]?.description ?? "—"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;



