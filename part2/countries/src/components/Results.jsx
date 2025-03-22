import { useState } from 'react'
import CountryDetails from './CountryDetails'

const Results = ({ countries }) => {
    const [selectedCountry, setSelectedCountry] = useState('')

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1) {
        if (selectedCountry) {
            return (
                <div>
                    <CountryDetails country={selectedCountry} />
                    <button onClick={() => setSelectedCountry(null)}>Back</button>
                </div>
            )
        }
        return (
            <ul>
                {countries.map((country) => (
                    <li key={country.cca3}>
                        {country.name.common}{' '}
                        <button onClick={() => setSelectedCountry(country)}>Show</button>
                    </li>
                ))}
            </ul>
        )
    }

    if (countries.length === 1) {
        return <CountryDetails country={countries[0]} />
    }

    return null

}

export default Results