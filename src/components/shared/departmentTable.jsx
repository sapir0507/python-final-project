import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box, Collapse, Container, createTheme, IconButton, styled, tableCellClasses } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { ThemeProvider } from '@emotion/react';
import { Link } from 'react-router-dom';
import departments_ws from '../../services/department_service';
import employees_ws from '../../services/employees_service';

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

function createData (departmentName, manger, employees, departmentId) {
  return {
    departmentName,
    manger,
    employees,
    departmentId
  };
}

function Row (props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <StyledTableRow sx={ { '& > *': { borderBottom: 'unset' } } }>
        <StyledTableCell component="th" scope="row" align='left' style={ { textTransform: "capitalize" } }>
          <Link to={ `/edit-department/${row.departmentId}` }>
            { row.departmentName }
          </Link>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" align='left' style={ { textTransform: "capitalize" } }>
            { row.manger }  
        </StyledTableCell>
        <StyledTableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            color='primary'
            onClick={ () => {
              setOpen(!open) 
            }
            }
          >
            { open ? <KeyboardArrowUp /> : <KeyboardArrowDown /> }
          </IconButton>
          Department's employees
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell></StyledTableCell>
        <StyledTableCell style={ { paddingBottom: 4, paddingTop: 4 } }>
          <Collapse in={ open } timeout="auto" unmountOnExit>
            <Box sx={ { alignContent: 'center' } }>
              <Table size="small" aria-label="employees">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row" >Employee Name</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  { row.employees.length > 0 && row.employees.map((emp, index) => {
                    return <StyledTableRow key={ index } sx = {{ '& > *': { borderBottom: 'unset' }}}>
                      <StyledTableCell component="th" scope="row" style={{ textTransform: "capitalize" }}>
                      <Link to={ `/edit-employee/${emp.id}` }>
                        { emp.name }
                      </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  }) }
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
    departmentId: PropTypes.string.isRequired,
    employees: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
};


export default function DepartmentTableComp (props) {
  const [rows, setRows] = useState()
  useEffect(() => {

    const setRowsFromService = async() => {
      const _rows = {}
      const temp_rows_array = []
      let all_departments = await departments_ws.get_all_departments()
      let all_employees = await employees_ws.get_all_employees()
    
      await all_departments.forEach(department => {
         _rows[department["Name"]] = {}
         _rows[department["Name"]]["department"] = {
          departmentName: department.Name,
          managerName: department.ManagerName,
          departmentId: department._id.$oid
         }
         _rows[department["Name"]]["employees"] = []
      });
      all_employees.map((emp)=>{
         const res = all_departments.filter(dep=>dep._id.$oid===emp.DepartmentID)
         if(res.length>0){
           let _employees = _rows[res[0].Name].employees
           _rows[res[0].Name] = {..._rows[res[0].Name],
            //update employess that belong to this department
            employees: [..._employees, {name: `${emp.FirstName} ${emp.LastName}`, id: emp._id.$oid}]
         }
        }
        return emp
      })
     
      Object.keys(_rows).forEach(key=>{
        temp_rows_array.push(createData(_rows[key].department.departmentName, _rows[key].department.managerName,_rows[key].employees, _rows[key].department.departmentId))
      })
      setRows(temp_rows_array)
    }
    setRowsFromService()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  
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
