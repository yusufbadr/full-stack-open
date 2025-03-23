import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY

    useEffect(() => {
        const capital = country.capital[0]
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
        axios.get(weatherApiUrl).then(response => {
            setWeather(response.data)
        })
    }, [country, apiKey])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>

            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.name}`} width="150" />

            {weather && (
                <div>
                    <h3>Weather in {country.capital[0]}</h3>
                    <p>Temperature: {weather.main.temp} Celsius</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                    />
                    <p>Wind: {weather.wind.speed} m/s</p>
                </div>

            )}
        </div>
    )
}

export default CountryDetails