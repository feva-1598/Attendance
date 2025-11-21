import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { Error } from '@mui/icons-material';
import { Check } from '@mui/icons-material';

interface Column {
  id: 'Date' | 'Presence';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'Date', label: 'Date', minWidth: 170 },
  {
    id: 'Presence',
    label: 'Absent / Present',
    minWidth: 170,
    align: 'right'
  },
];

function Absent() {
    return (
        <Chip color="error" label="Absent" icon={<Error />} />
    )
}

function Present() {
    return (
        <Chip color="success" label="Present" icon={<Check />} />
    )
}

interface Data {
  date: string;
  presence: React.ReactNode;
}

function createData(
  date: string,
  presence: React.ReactNode,
): Data {
  return { date, presence};
}

const rows = [
  createData('Friday, June 15 2025', <Absent />),
  createData('Friday, June 15 2025', <Present />),
  createData('Friday, June 15 2025', <Present />),
  createData('Friday, June 15 2025', <Absent />)
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, textAlign: "center" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                    <>
                    {rows.map((row, i) => {
                      return (
                     <TableRow hover role="checkbox" tabIndex={-1} key={row.date}>
                            <TableCell style={{textAlign: "center"}} key={row.date} >
                                {row.date}
                            </TableCell>
                            <TableCell style={{textAlign: "center"}}>
                                {rows[i].presence}
                            </TableCell>
                        </TableRow>
                      );
                    })}
                    </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}