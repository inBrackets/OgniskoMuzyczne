function Locations() {
return (
    <>
    <h1>Locations Page</h1>
    <ol>
        <li><strong>window.location.hostname</strong>{window.location.hostname}</li>
        <li><strong>window.location.href</strong>{window.location.href}</li>
        <li><strong>window.location.origin</strong>{window.location.origin}</li>
    </ol>
    </>
)
}

export default Locations;