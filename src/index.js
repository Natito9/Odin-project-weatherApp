import './styles/style.css';  
import './styles/reset.css';  
import './styles/images-icons.css';  

const apiKey = "58TEVGU65AYBDKTELB2WPDHTD";

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchWeather);
document.querySelector("#weather-info").style.display = "none";
// Convert Fahrenheit to Celsius
function fahrenheitToCelsius(temperature) {
  const celsius = ((temperature - 32) * 5) / 9;
  return celsius;
}

// Function to search for weather
function searchWeather() {
  const city = document.querySelector("#city-input").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  // Call the async function to get the weather info
  getWeatherInfo(city);
  document.querySelector("#weather-info").style.display = "grid";
}

// Async function to fetch and display weather information
async function getWeatherInfo(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today/?key=${apiKey}`,
      { mode: "cors" }
    );
    
    // Check if response is ok (status 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Wait for the response to be parsed as JSON
    const data = await response.json();

    // Handle case where there's an error in the response data
    if (data.error) {
      alert(data.error.message);
      return;
    }

    // Extract weather data
    const location = data.address;
    const temperatureFahrenheit = data.currentConditions.temp;
    const description = data.currentConditions.conditions;
    const windspeed = data.currentConditions.windspeed;
    const humidity = data.currentConditions.humidity;
    const temperatureCelsius = fahrenheitToCelsius(temperatureFahrenheit);

    // Update UI with the weather data
    document.querySelector(
      "#location"
    ).textContent = `${location}`;
    document.querySelector(
      "#temperature"
    ).textContent = `Temperature: ${temperatureCelsius.toFixed(2)}°C`;
    document.querySelector(
      "#description"
    ).textContent = `Condition: ${description}`;
    document.querySelector(
      "#windspeed"
    ).textContent = `Wind Speed: ${windspeed} km/h`;
    document.querySelector(
      "#humidity"
    ).textContent = `Humidity: ${humidity}%`;

    // Display the weather result section
  
  } catch (error) {
    // Handle errors (e.g., network issues, response errors)
    console.error("Error fetching weather data:", error);
    alert("Error fetching weather data. Please try again later.");
  }
}

