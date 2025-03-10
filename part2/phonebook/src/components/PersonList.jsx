import Person from "./Person"

const PersonList = (props) => {
    const { persons } = props

    return (
        <div>
            {persons.map((person) =>
                <Person key={person.id} name={person.name} phoneNumber={person.phoneNumber} />
            )}
        </div>
    )
}

export default PersonList