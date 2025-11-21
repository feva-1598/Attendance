import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AttendanceTable from '../components/attendancetable'

export default function Student()
{
    return (
        <>
        <div style={{marginTop: "40px", padding: "20px", display: "grid", gridTemplateColumns: "1fr 5fr"}}>
            <Stack direction="row" style={{placeContent: "center"}} spacing={2}>
                <Avatar style={{width: "100px", height: "100px"}} src="/broken-image.jpg" />
            </Stack>
            <div>
                <h2 style={{marginTop: "0px"}}>Student Information</h2>
                <div className='StudentInfo' style={{display: "grid", gridTemplateColumns: "1fr"}}>
                    <span>Name: Kaleab Abebe Zeleke</span>
                    <span>ID: UGR/4485/17</span>
                    <span>Phone Number: 0912345678</span>
                    <span>Age: 18.9</span>
                    <span>Sex: Male</span>
                    <span>Section: 2</span>
                </div>
            </div>
        </div>
        <div>
            <h2 style={{marginTop: "15px", textAlign: "initial"}}>Attendance History</h2>
            <div>
                <AttendanceTable />
            </div>
        </div>
        </>
    )
}