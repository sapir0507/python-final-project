import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Container, createTheme, styled, tableCellClasses } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import shifts_ws from '../../services/shifts_service';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'center',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

  textAlign: 'center',
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 1,
  },
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function createData (Date, StartingHour, EndingHour) {
  return {
    Date,
    StartingHour,
    EndingHour
  };
}

function Row (props) {
  const { row } = props;

  return (
    <React.Fragment>
      <StyledTableRow sx={ { '& > *': { borderBottom: 'unset' } } }>
        <StyledTableCell component="th" scope="row" align='left' style={{ textTransform: "capitalize" }}>
            { row.Date } 
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align='right' style={{ textTransform: "capitalize" }}>
            { row.StartingHour }  
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align='right' style={{ textTransform: "capitalize" }}>
            { row.EndingHour }  
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    ShiftDate: PropTypes.string.isRequired,
    StartingHour: PropTypes.string.isRequired,
    EndingHour: PropTypes.string.isRequired,
  }).isRequired,
};


export default function EditEmployeeShiftsTableComp ({employee_id, update_shifts}) {
  const [rows, setRows] = useState()
  useEffect(() => {

    const setRowsFromService = async() => {

      const temp_rows_array = []
      const all_shifts = await shifts_ws.get_all_shifts()
      let employee_shifts = await shifts_ws.get_employee_shifts(employee_id) // array of ids
 
      await all_shifts.forEach(shift => {
        const isShiftInEmployeeShifts = employee_shifts.filter(employee_shift=>employee_shift
            ===shift._id.$oid)
        if(isShiftInEmployeeShifts.length > 0){
          let _rows = createData(shift.Date, shift.StartingHour, shift.EndingHour)
          temp_rows_array.push(_rows)
        }

      });
      console.log(temp_rows_array)
      setRows(temp_rows_array)
    }
    setRowsFromService()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update_shifts])


  
  return (
    <Container>
      <ThemeProvider theme={ darkTheme }>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align='left'>Shift Date</StyledTableCell>
                <StyledTableCell align='left'>Start Hour</StyledTableCell>
                <StyledTableCell align='right'>End Hour</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              { rows && rows.map((row, index) => {
                return <Row key={ index } row={ row }></Row>
              }) }
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </Container>
  );
}
