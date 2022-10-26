import { Box, Button, Container, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Stack, styled, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import employees_ws from '../services/employees_service';
import shifts_ws from '../services/shifts_service';
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add';
import {UpdateRounded, Delete} from '@mui/icons-material';

import departments_ws from '../services/department_service';
import log_service from '../services/log_service';
import { useDispatch, useSelector } from 'react-redux';
import { setActions, setCurrentActions } from '../redux/slices/sessionSlice';


const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(1),
    },
  }));

export const EditDepartmentComp = () => {
    const params = useParams()
    // const navigate = useNavigate()
    const session = useSelector(state => state.session)
    const dispatch = useDispatch()
    const [departmentData, setDepartmentData] = useState({
        Manager: "", //id
        ManagerName: "", //str
        Name: "", //department name
        DepartmentId: ""
    })

    const [enabled, setEnabled] = useState(false)

    const [allEmployees, setAllEmployees] = useState([])
    const [employee, setEmployee] = React.useState({
        id: "", //employee id
        value: "" //employee name
    });
    const [manager, setManager] = React.useState({
        id: "", //employee id
        value: "" //employee name
    });
    const [menuChoices1, setMenuChoices1] = React.useState([]);
    const [menuChoices2, setMenuChoices2] = React.useState([]);


  
    departmentData.PropTypes={
        ManagerName: PropTypes.string.isRequired,
        Manager: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
        DepartmentId: PropTypes.string.isRequired
    }

    const handle_log = (message) => {
        log_service.logEvent(session.session, message)
        const curr = session.session.actions["currentActions"] - 1
        console.log(curr)
        dispatch(setActions({
            currentActions: curr,
            maxActions: session.session.actions.maxActions
        }))
    }
    
    const handle_update_department = async() => { // works
        await departments_ws.update_department(params["department"], {
            Name: departmentData["Name"], // department name
            manager: departmentData["ManagerName"], //manager name,
            managerID: departmentData["Manager"]
        })
    }

    const handle_delete_department = async() => { // works
        await departments_ws.delete_department(params["department"])
    }

    const handle_add_employee_to_department = async() => { //works
        await employees_ws.add_employee_to_department(employee.id, params["department"])
    }

    useEffect(() => {
        const getAllEmployees = async () => {
            const id = params["department"]
            const _departments = await departments_ws.get_all_departments()
            const department = _departments.filter(d=>d._id.$oid===id)

            let employees = await employees_ws.get_all_employees()
            employees = employees.map(emp=>{
                return {
                    ...emp,
                    label: `${emp.FirstName} ${emp.LastName}` 
                }
            })
            
            setDepartmentData(department[0])            
            //get all the employees that are part of this department
            const department_employees = employees.filter(emp => id===emp.DepartmentID)
            //get all the employees that aren't part of the department
            const not_department_employees = employees.filter(emp => id!==emp.DepartmentID)
            
            setAllEmployees(department_employees)
            setMenuChoices2(department_employees) // for manager
            setMenuChoices1(not_department_employees) // for adding employees to the department

        }

        getAllEmployees()

    }, [params])

  
    return(
        <div>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>EDIT DEPARTMENT</Typography>
              <Container sx={{width: '100%'}}>
            <Grid container spacing={2} sx={{m:1}} justifyContent={'space-around'} alignItems={'center'}>
                <Grid item md={6}  justifyContent={'center'} alignItems={'center'} >
                    <Container sx={{
                       
                    }}>
                        {/* employee details */}
                        <Box
                            component="form"
                            sx={{
                                minWidth: '30ch',
                                '& > :not(style)': { m: 1, minWidth: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <Root>
                                <Typography align='center' variant='h4' component={'h4'} autoCapitalize={true} color={'black'} sx={{
                                    flexGrow: 1,
                                    textShadow: 'unset',
                                }}>Department Details</Typography>
                                  <Divider variant="fullWidth" component={'div'} role={'presentation'} sx={{margin: "35px auto"}}>
                                   
                                </Divider>
                                </Root>
                                <Grid container spacing={{ xs: 1, sm: 2, md: 2 }} justifyContent={'center'}>
                                    <Grid item xs= {5} sm= {5} md= {5}>
                                    <TextField 
                                        id="Department-Name" 
                                        label="Department Name" 
                                        color='primary' 
                                        variant="outlined" 
                                        value={departmentData.Name} 
                                        onChange={(e)=>{
                                            setDepartmentData({...departmentData, Name: e.target.value})
                                        }
                                    }/>
                                    </Grid>
                                    <Grid item xs= {5} sm= {5} md= {5}></Grid>

                                    <Grid item xs= {5} sm= {5} md= {5}>
                                    <TextField 
                                        id="Manager-Name" 
                                        disabled={'true'} 
                                        sx={{mt:2}} 
                                        label="Current Manager Name" 
                                        color='primary' 
                                        variant="outlined" 
                                        value={departmentData.ManagerName} 
                                        onChange={(e)=>{
                                            const temp = {...departmentData, ManagerName: e.target.value}
                                            setDepartmentData(temp)
                                        }
                                    }/>     
                                    </Grid>
                                <Grid item xs= {5} sm= {5} md= {5}>
                                <Box sx={{minWidth: '25ch'}}> 
                                <FormGroup>  
                                    {/* manager name, from all the employees that belong to the department */}
                                    <FormControl sx={{my:2}} fullWidth>
                                        <InputLabel id="demo-simple-select-label">New Manager Name</InputLabel>
                                        <Select
                                        // autoWidth
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={manager.id}
                                        name={manager.value}
                                        label="New Manager Name"
                                        onChange={(e)=>{
                                            const m = menuChoices2.filter(choice=>choice._id.$oid===e.target.value)
                                            setManager({...manager, id: e.target.value, value: m[0].label})
                                            setDepartmentData({...departmentData, Manager: e.target.value, ManagerName: m[0].label})
                                        }}
                                        >
                                        {menuChoices2.map((choice)=>{
                                            return <MenuItem value={choice._id.$oid}>{choice.label}</MenuItem>
                                        })}
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                                </Box>
                                </Grid>
                                <Grid item xs = {10} sm = {10} md = {10} 
                                    spacing={{ xs: 1, sm: 2, md: 4 }}
                                    direction={{ xs: 'column', sm: 'row' }}
                                    display={'flex'}
                                    justifyContent={'space-around'}
                                    alignItems={'center'}
                                    sx={{mb:5}}
                                >
                                   
                                <FormControlLabel  autoCapitalize
                                        control={
                                            <Button 
                                                variant='contained' 
                                                startIcon={<Delete/>} 
                                                color="error" 
                                                onClick={()=>{
                                                    handle_log(`delete department`)
                                                    handle_delete_department()
                                                }} >Delete Department</Button>}  
                                            />

                                    <FormControlLabel autoCapitalize
                                        control={
                                            <Button 
                                                startIcon={<UpdateRounded/>}
                                                variant='contained' 
                                                onClick={()=>{
                                                    handle_log('update department')
                                                    handle_update_department()
                                                }} 
                                                >Update Department</Button>}  
                                            />
                                    </Grid>
                                </Grid>                                
                               {/* department employees */}
                                <Root>
                                <Typography align='center' variant='h4' component={'h4'} autoCapitalize={true} color={'black'} sx={{
                                    flexGrow: 1,
                                    textShadow: 'unset',
                                }}>Department's Employees</Typography>
                                <Divider variant="fullWidth" component={'div'} role={'presentation'} sx={{margin: "0 auto"}}>
                                   
                                </Divider>
                                </Root>

                                {menuChoices1.length!==0 && <Grid container spacing={{ xs: 1, sm: 2, md: 2 }} justifyContent={'center'}>
                                    <Grid item xs = {10} sm = {10} md = {10}>
                                    <FormGroup>
                                    <FormControlLabel onClick={()=>setEnabled(!enabled)} control={<Switch defaultChecked={enabled} />} label="Enable"/>
                                    <Box sx={{ minWidth: '50ch' }}>
                                    <FormControl disabled={!enabled} sx={{my:1, mx:6, minWidth: '25ch'}}>
                                        <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={employee.id}
                                        label="Employee"
                                        onChange={(e)=>setEmployee({...employee, id: e.target.value})}
                                        >
                                        {menuChoices1.map((choice)=>{
                                            return <MenuItem value={choice._id.$oid}>{choice.label}</MenuItem>
                                        })}
                                        </Select>
                                    </FormControl>
                                    </Box>

                                    <FormGroup>                                   
                                </FormGroup>
                                </FormGroup>
     
                                    </Grid>
                                    <Grid item xs = {10} sm = {10} md = {10} >
                                    <FormControlLabel sx={{m:1, mx: 6}} autoCapitalize
                                        control={<Button variant='contained' sx={{p:1}} disabled={!enabled} startIcon={<AddIcon/>} onClick={()=>{
                                            handle_log('add user to department')
                                            handle_add_employee_to_department()
                                        }} >add to department</Button>}  />
                                    </Grid>
                                </Grid>}
                                {menuChoices1.length === 0 &&  <Root>
                                <Typography align='center' variant='h5' component={'h5'} autoCapitalize={false} color={'black'} sx={{
                                    flexGrow: 1,
                                    textShadow: 'unset',
                                }}>It seems that all the employees belong to this department. No employees to add</Typography>
                                <Divider variant="fullWidth" component={'div'} role={'presentation'} sx={{margin: "0 auto"}}>
                                   
                                </Divider>
                                </Root>}
                                

                               
                               
                            </Box>
                    </Container>

                </Grid>
            </Grid>
            </Container>
        </div>
    )
}

export default EditDepartmentComp