const PersonForm = (props) => {
    const { newName, newPhoneNumber, addNewName, handleNameChange, handlePhoneNumberChange } = props
    return (
        <form onSubmit={addNewName}>
            <div>
                name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}

export default PersonForm

