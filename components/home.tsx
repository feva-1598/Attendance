import Box from '@mui/material/Box'
import BoxSx from "../components/box"

function Home() {
    const date = new Date()
    return (
        <>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <h3 style={{fontSize: "30px", marginTop: "40px", marginBottom: "2px"}}>Welcome Mr Wondosen </h3>
            </div>
            <div>
                <p style={{fontSize: "15px"}}>Today is: {date.toDateString()}</p>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px", gap: "10px"}}>
                <BoxSx/>
                <BoxSx/>
                <BoxSx/>
                <BoxSx/>
            </div>
        </>
    )
}

export default Home;