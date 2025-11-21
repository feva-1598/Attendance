import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';


function createData(
  name: string,
  idno: string,
  pa: string,
  button: React.ReactNode,
) {
  return { name, idno, pa, button };
}

function ViewMore()
{
    return (
        <Button>
            View More
        </Button>
    )
}

const rows = [
  createData('Kaleab Belayhun Tsegaye', 'UGR/7539/17', '10/10', <ViewMore />),
  createData('Kaleab Abebe', 'UGR/4485/17', '1/10', <ViewMore />),
  createData('Merian Wonde Wodaje', 'UGR/4276/17', '7/10', <ViewMore />),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="right">Id No</TableCell>
            <TableCell align="right">Present/Total_Classes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.idno}</TableCell>
              <TableCell align="right">{row.pa}</TableCell>
              <TableCell align="right">{row.button}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}