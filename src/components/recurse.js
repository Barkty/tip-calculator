const styles = {
    border: '1px solid gray',
    width: '150px',
    padding: '10px'
}

const Recurse = ({label}) => {
    return (
        <div data-testid="button" style={styles}>{label}</div>
    )
}
export default Recurse;