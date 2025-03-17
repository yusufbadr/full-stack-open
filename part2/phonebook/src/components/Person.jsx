const Person = ({ name, phoneNumber, handleDeletePerson }) => (

    <div>
        {name} {phoneNumber}
        <button
            onClick={() => {
                if (window.confirm(`Delete ${name}?`)) {
                    handleDeletePerson()
                }
            }}
            style={{ marginLeft: '10px' }}
        >
            Delete
        </button>
    </div>
)

export default Person