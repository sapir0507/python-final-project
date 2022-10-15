import React, { useEffect, useState } from 'react';
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
import employees_ws from '../../services/employees_service';
import shifts_ws from '../../services/shifts_service';
import departments_ws from '../../services/department_service';


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
    const [tableShifts, setTableShifts] = React.useState([]);
  
    useEffect(() => {

      const _getShifts = async () => {
          const k = {date: "", start: "", end: "", id: ""}
          console.log(row.shifts);
          const all_shifts = await shifts_ws.get_all_shifts()
          const all_shift_with_id = row.shifts.map((shiftID)=>{
            console.log("shift id", shiftID)
            const shift = all_shifts.filter(s=>{
              console.log(s._id.$oid.toString(), shiftID.toString(), s._id.$oid.toString()===shiftID.toString());
              return s._id.$oid.toString()===shiftID.toString()
            })
            console.log("shift", shift)
            if(shift.length > 0){
              k.date= shift[0].Date
              k.start = shift[0].StartingHour
              k.end = shift[0].EndingHour
              k.id = shiftID
            }
            return k
          })
          return all_shift_with_id
      }

      const getShifts = async () => {
        const shifts = await _getShifts()
        setTableShifts(shifts)
      }
      
      getShifts()
    }, [row.shifts])
    
    return (
      <React.Fragment>
        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <StyledTableCell component="th" scope="row"  align='left' style={{textTransform:"capitalize"}}>
            <Link to={`/edit-employee/${row.employeeID}`}>
              {row.fullName}
            </Link>
          </StyledTableCell>
          <StyledTableCell component="th" scope="row"  align='left' style={{textTransform:"capitalize"}}>
          <Link to={`/edit-department/${row.departmentID}`}>
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
                      <StyledTableCell component="th" scope="row" colSpan={1} align="center">Starting Hour</StyledTableCell>
                      <StyledTableCell component="th" scope="row" colSpan={1} align="center">Ending Hour</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {tableShifts.map((shift, index) => {
                      return <StyledTableRow key={index} colSpan={3}>
                        
                        <StyledTableCell component="th" scope="row" colSpan={1}>{shift.date}</StyledTableCell>
                        <StyledTableCell component="th" scope="row" colSpan={1} align="center">{shift.start}</StyledTableCell>
                        <StyledTableCell component="th" scope="row" colSpan={1} align="center">{shift.end}</StyledTableCell>
                      </StyledTableRow>
                    })}
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
      departmentID: PropTypes.string.isRequired,
      employeeID: PropTypes.string.isRequired,
      shifts: PropTypes.array.isRequired,
    }).isRequired,
  };


export default function CollapsibleTable(props) {
  const { department_name } = props 
  const [ rows, setRows ] = useState([])
  const [ filteredRows, setFilteredRows ] = useState([])


  useEffect(() => {
     const getRows = async() => { 
        const _rows = []
        const emp = await employees_ws.get_all_employees()
        const depart = await departments_ws.get_all_departments()

        const employees = emp.map(employee => {          
          // get departments
          depart.forEach((dp)=> {
            if(String(dp["_id"]["$oid"])===String(employee.DepartmentID))
              employee["departmentName"] = dp.Name
          })

          employee["FullName"] = `${employee.FirstName}  ${employee.LastName}`
          const row_of_row1 = {
            fullName: employee.FullName,
            department: employee.departmentName,
            departmentID: employee.DepartmentID,
            employeeID: employee._id.$oid,
            shifts: employee.shifts //ids
          }
          _rows.push(row_of_row1)
          return employee
        });
        setRows(_rows)
        setFilteredRows(_rows)
      }
      getRows()
  }, [])

  useEffect(() => {
    const final_rows = rows.filter(row=>row.department===department_name)
    if(department_name==="Department Name"||department_name===null)
    { 
      setFilteredRows(rows)
    }
    else
      setFilteredRows(final_rows)
    
  }, [rows, department_name])
  
  
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
          {filteredRows.map((row, index)=>{
            return <Row row={row} key={index} ></Row>
           
          })}
        </TableBody>
      </Table>
    </TableContainer> 
    </ThemeProvider>
  );
}
