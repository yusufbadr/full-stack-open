import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonList from './components/PersonList'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newQueryName, setNewQueryName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNewName = (event) => {
    event.preventDefault()
    const personObjecct = {
      id: persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1,
      name: newName.trim(),
      phoneNumber: newPhoneNumber.trim()
    }

    const nameExists = persons.some(person => person.name.toLowerCase() === personObjecct.name.toLowerCase())
    if (nameExists) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(personObjecct))
    }
    setNewName('')
    setNewPhoneNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleSearchByName = (event) => {
    setNewQueryName(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newQueryName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        newQueryName={newQueryName}
        handleSearchByName={handleSearchByName}
      />


      <h3>add a new</h3>

      <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        addNewName={addNewName}
        handleNameChange={handleNameChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />

      <h3>Numbers</h3>
      
      <PersonList persons={filteredPersons} />
    </div>
  )
}

export default App