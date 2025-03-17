import Person from "./Person"

const PersonList = (props) => {
    const { persons, handleDeletePerson } = props

    return (
        <div>
            {persons.map((person) =>
                <Person key={person.id} name={person.name} phoneNumber={person.number} handleDeletePerson={() => handleDeletePerson(person.id)} />
            )}
        </div>
    )
}

export default PersonList