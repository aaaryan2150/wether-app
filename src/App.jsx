import React, { useState, useEffect } from "react";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update weather state by triggering useEffect
    console.log(weather);
  };

  useEffect(() => {
    if (location) {
      const key = "d0b23c87576c7a309d9f26e8dc6220f0";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const weatherDescription = data.weather[0].description;
          setWeather(weatherDescription);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [location]);

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Weather Search</h1>
        <div className="mb-4">
          <form onSubmit={handleSubmit}>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Enter City
            </label>
            <div className="flex mt-1">
              <input
                type="text"
                value={location}
                id="search"
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search for a city..."
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="mt-4 w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          {weather ? (
            <span className="text-gray-700">{weather}</span>
          ) : (
            <span className="text-gray-500">Weather Image</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
