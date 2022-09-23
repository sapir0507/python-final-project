import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createTheme, styled, tableCellClasses } from '@mui/material';
import { ThemeProvider } from '@emotion/react';



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

function createData(fullName, maxActions, currentNumOfActions) {
  return {
    fullName,
    maxActions,
    currentNumOfActions
  };
}

function Row(props) {
    const { row } = props;  
    return (
      <React.Fragment>
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <StyledTableCell component="th" scope="row" style={{textTransform:"capitalize"}}>
              {row.fullName}    
          </StyledTableCell>
          <StyledTableCell component="th" scope="row"  align='center'>
            {row.maxActions}
          </StyledTableCell>
          <StyledTableCell component="th" scope="row"  align='center'>
            {row.currentNumOfActions}
          </StyledTableCell>
        </StyledTableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      maxActions: PropTypes.number.isRequired,
      currentNumOfActions: PropTypes.number.isRequired,
    }).isRequired,
  };

const rows = [
  createData('sapir shahar', 7, 7),
  
];

export default function UsersTableComp(props) {
    // const {rows} = props 
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Full Name</StyledTableCell>
            <StyledTableCell align='center'>Maximum actions</StyledTableCell>
            <StyledTableCell align='center'>Current actions</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index)=>{
            return <Row key={index} row={row}></Row>
          })}
        </TableBody>
      </Table>
    </TableContainer> 
    </ThemeProvider>
  );
}
