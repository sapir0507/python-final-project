import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Collapse, createTheme, IconButton, styled, tableCellClasses, Typography } from '@mui/material';
import {KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material'
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom';


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

function createData(fullName, department, shifts) {
  return {
    fullName,
    department,
    shifts
  };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <StyledTableCell component="th" scope="row"  align='left' style={{textTransform:"capitalize"}}>
            <Link to={`/edit-employee/${row.fullName}`}>
              {row.fullName}
            </Link>
          </StyledTableCell>
          <StyledTableCell component="th" scope="row"  align='left' style={{textTransform:"capitalize"}}>
          <Link to={`/edit-department/${row.department}`}>
              {row.department}
            </Link>
          </StyledTableCell>
          <TableCell  align="right">
            <IconButton
              aria-label="expand row"
              size="small"
              color='primary'
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        </StyledTableRow>
      
        <TableRow scope="row" rowSpan={3}>
          {/* colSpan here is super important!! */}
          <StyledTableCell  style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0 }}>
                <Typography variant="h5" gutterBottom component="div" align='left' sx={{
                  marginTop: 1,
                  marginLeft: 1
                }}>
                  Shifts
                </Typography>
                <Table size="small" aria-label="shifts">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row" colSpan={1}>Date</StyledTableCell>
                      <StyledTableCell component="th" scope="row" colSpan={1} align="center">Hour</StyledTableCell>
                      
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {row.shifts.map((shift) => (
                      <StyledTableRow key={shift.date} colSpan={3}>
                        <StyledTableCell component="th" scope="row" colSpan={1}>
                          {shift.date}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row" colSpan={1} align="center">{shift.hour}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </StyledTableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      shifts: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            hour: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
  };

const rows = [
  createData('sapir shahar', 'mangament', [{date: '20/9/22', hour: '14:30'}]),
  
];

export default function CollapsibleTable(props) {
    // const {rows} = props 
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align='left'>Full Name</StyledTableCell>
            <StyledTableCell align='left'>Department</StyledTableCell>
            <StyledTableCell align='right'>Shifts</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map(row=>{
            return <Row key={row.FullName} row={row}></Row>
          })}
        </TableBody>
      </Table>
    </TableContainer> 
    </ThemeProvider>
  );
}
