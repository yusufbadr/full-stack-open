const Filter = (props) => {
    const { newQueryName, handleSearchByName } = props;
    return (
        <form>
            <div>filter shown with: <input value={newQueryName} onChange={handleSearchByName} /></div>
        </form>
    )
}

export default Filter