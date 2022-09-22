import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Collapse, Container, createTheme, IconButton, styled, tableCellClasses, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
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

function createData (departmentName, manger, employees) {
  return {
    departmentName,
    manger,
    employees
  };
}

function Row (props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={ { '& > *': { borderBottom: 'unset' } } }>
        <StyledTableCell component="th" scope="row" align='left' style={ { textTransform: "capitalize" } }>
          <Link to={ `/edit-employee/${row.departmentName}` }>
            { row.departmentName }
          </Link>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align='left' style={ { textTransform: "capitalize" } }>
          <Link to={ `/edit-department/${row.manger}` }>
            { row.manger }
          </Link>
        </StyledTableCell>
        <StyledTableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            color='primary'
            onClick={ () => setOpen(!open) }
          >
            { open ? <KeyboardArrowUp /> : <KeyboardArrowDown /> }
          </IconButton>
          Department's employees
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell style={ { paddingBottom: 0, paddingTop: 0 } }>
          <Collapse in={ open } timeout="auto" unmountOnExit>
            <Box sx={ { alignContent: 'center' } }>

              <Table size="small" aria-label="employees">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row" >Employee Name</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  { row.employees.map((emp, index) => (
                    <StyledTableRow key={ index } colSpan={ 3 }>
                      <StyledTableCell component="th" scope="row" colSpan={ 1 } style={ { textTransform: "capitalize" } }>
                        { emp.fullName }
                      </StyledTableCell>
                    </StyledTableRow>
                  )) }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>


    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    departmentName: PropTypes.string.isRequired,
    manger: PropTypes.string.isRequired,
    employees: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
};

const rows = [
  createData('mangament', 'sapir shahar', ["sapir shahar"]),
];

export default function DepartmentTableComp (props) {
  // const {rows} = props 
  return (
    <Container>
      <ThemeProvider theme={ darkTheme }>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align='left'>Department Name</StyledTableCell>
                <StyledTableCell align='left'>Manager</StyledTableCell>
                <StyledTableCell align='right'>Employees</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              { rows.map(row => {
                return <Row key={ row.departmentName } row={ row }></Row>
              }) }
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </Container>
  );
}
