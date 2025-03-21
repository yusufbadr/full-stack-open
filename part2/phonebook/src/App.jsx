import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newQueryName, setNewQueryName] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})


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

            setNotification({
              message: `New number updated successfully`,
              type: `success`,
            })

            setTimeout(() => setNotification({ message: null, type: null}), 5000)
          }) 
          .catch(error => {
            setNotification({
              message: `Information of ${newName} has already been removed from the server`,
              type: `error`,
            })
            setTimeout(() => setNotification({ message: null, type:null}), 5000)
            setPersons(persons.filter(p => p.id !== exisitingPerson.id))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setNotification({
            message: `Added ${newName}`,
            type: `success`,
          })
  
          setTimeout(() => setNotification({message: null, type: null}), 5000)
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
        setNotification({
          message: `Deleted ${deletedPerson.name}`,
          type: 'success'
        })
        setTimeout(() => setNotification({ message: null, type: null }), 5000)
      })
      .catch(error => {
        const person = persons.find(p => p.id === id)
        setNotification({
          message: `Information of ${person.name} has already been removed from server`,
          type: 'error'
        })
        setTimeout(() => setNotification({ message: null, type: null}), 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newQueryName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification.message} type={notification.type} />

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