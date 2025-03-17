import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newQueryName, setNewQueryName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons =>
        setPersons(initialPersons)
      )
  }, [])

  const addNewName = (event) => {
    
    event.preventDefault()
    const personObject = {
      name: newName.trim(),
      number: newPhoneNumber.trim()
    }

    const exisitingPerson = persons.find(person => 
      person.name.toLowerCase() === personObject.name.toLowerCase()
    )

    if (exisitingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(exisitingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== exisitingPerson.id ? person : returnedPerson
            ))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

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

  const handleDeletePerson = (id) => {
    personService
      .deletePerson(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id != deletedPerson.id))
      })
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

      <PersonList persons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App