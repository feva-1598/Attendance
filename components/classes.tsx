import SelectClass from "./selectclass"
import BasicTable from "../components/table"

export default function Classes()
{
    return (
        <div>
            <div style={{marginTop: "15px"}}>
                <SelectClass name="Section" />
                <SelectClass name="Date" />
                <SelectClass name="Days absent" />
            </div>
            <div style={{display:"flex", justifyContent: "space-around", marginBottom: "5px"}}>
                <h3>Students present: {}</h3>
                <h3>Students absent: {}</h3>
            </div>
            <div >
                <BasicTable />
            </div>
        </div>
    )
}