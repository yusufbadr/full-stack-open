import { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Results'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data)
      })
      
  }, [])

  useEffect(() => {
    const results = countries.filter((country) => 
      country.name.common.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredCountries(results)
  }, [query, countries])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
    
  }
  return (
    <div>
      <div>
        find countries <input type="text" value={query} onChange={handleQueryChange} />
      </div>
      {query && <Results countries={filteredCountries} />}

    </div>
  )
}

export default App