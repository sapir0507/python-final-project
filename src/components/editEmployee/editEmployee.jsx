import { Box, Button, Container, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, styled, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import shifts_ws from '../../services/shifts_service'
import employees_ws from '../../services/employees_service'
import AddIcon from '@mui/icons-material/Add';
import log_service from '../../services/log_service'
import { useDispatch, useSelector } from 'react-redux'
import EditEmployeeShiftsTableComp from './employeeShifts'
import { setActions, setCurrentActions } from '../../redux/slices/sessionSlice'



const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(1),
    },
  }));

export const EditEmployee = (props) => {
    const params = useParams()
    const session = useSelector(state=>state.session)
    const dispatch = useDispatch()
    const [updateShifts, setUpdateShifts] = useState(false)

    const [userData, setUserData] = useState({
        FirstName: "",
        LastName: "",
        StartWorkYear: "",
        DepartmentID: "",
        ShiftId: ""
    })

    const [enabled, setEnabled] = useState(false)

    const [userShifts, setUserShifts] = useState([])
    const [allShifts, setAllShifts] = useState([])
    const [shift, setShift] = React.useState({
        id: "",
        value: ""
    });
    const [menuChoices, setMenuChoices] = React.useState([]);
  
    userData.PropTypes={
        FirstName: PropTypes.string.isRequired,
        LastName: PropTypes.string.isRequired,
        DepartmentID: PropTypes.string.isRequired
    }

    userShifts.PropTypes = PropTypes.arrayOf({
        shifts: PropTypes.shape({
            Date: PropTypes.string.isRequired,
            StartingHour: PropTypes.string.isRequired,
            EndingHour: PropTypes.string.isRequired
        })
    })
    allShifts.PropTypes = PropTypes.arrayOf({
        shifts: PropTypes.shape({
            Date: PropTypes.string.isRequired,
            StartingHour: PropTypes.string.isRequired,
            EndingHour: PropTypes.string.isRequired
        })
    })

    const handle_log = (message) => {
        log_service.logEvent(session.session, message)
        dispatch(setActions({
            currentActions: session.session.actions.currentActions - 1,
            maxActions: session.session.actions.maxActions
        }))
    }

    useEffect(() => {
        const getAllShifts = async () => {
            const shifts = await shifts_ws.get_all_shifts()  
            const shifts_tostring = shifts.map(s=>{
                return {label: `${s.Date}, ${s.StartingHour}-${s.EndingHour}`, value: s._id.$oid}
            })
            setAllShifts(shifts)
            setMenuChoices(shifts_tostring)

            const employee = await employees_ws.get_employee(params["fullName"])
            
            console.log("employee", employee)
            setUserData({...userData,
                FirstName: employee.FirstName,
                LastName: employee.LastName,
                StartWorkYear: employee.StartWorkYear,
                DepartmentID: employee.DepartmentID
            })
        }
        getAllShifts()
    }, [])

    
    return(
        <div>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>EDIT EMPLOYEE</Typography>
            <Container sx={{width: '100%'}}>
            <Grid container spacing={2} sx={{m:1}} justifyContent={'space-around'} alignItems={'center'}>
                <Grid item md={5}  justifyContent={'center'} alignItems={'center'} >
                    <Container sx={{
                     
                        width:500,
                        height: 700,
                       
                    }}>
                        {/* employee details */}
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, minWidth: '25ch', maxWidth: '38ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                <Root>
                                <Typography align='center' variant='h4' component={'h4'} autoCapitalize={true} color={'black'} sx={{
                                    flexGrow: 1,
                                    textShadow: 'unset',
                                }}>employee details</Typography>
                                  <Divider variant="fullWidth" component={'div'} role={'presentation'} sx={{margin: "0 auto"}}>
                                   
                                </Divider>
                                </Root>
                                <TextField id="First-Name" label="First Name" color='primary' variant="outlined" value={userData.FirstName} onChange={(e)=>setUserData({...userData, FirstName: e.target.value})}/>

                                <TextField id="Last-Name" label="Last Name" color='primary' variant="outlined" value={userData.LastName} onChange={(e)=>{
                                    const temp = {...userData, LastName: e.target.value}
                                    setUserData(temp)
                                }}/>

                                <TextField id="start-work-year" color='primary' label="Start Work Year" variant="outlined" value={userData.StartWorkYear} onChange={(e)=>setUserData({...userData, StartWorkYear: e.target.value})}/>
                                <FormGroup>
                                    <FormControlLabel sx={{m:1}}
                                        control={<Button variant='contained' onClick={()=>{
                                            handle_log('update employee')
                                        }} >Update</Button>}  />
                                    <FormControlLabel sx={{m:1}}
                                        control={<Button variant='contained' color="error"
                                        onClick={()=>{
                                            handle_log('delete employee')
                                        }} >Delete</Button>}  />
                                </FormGroup>
                                <Root>
                                <Typography align='center' variant='h4' component={'h4'} autoCapitalize={true} color={'black'} sx={{
                                    flexGrow: 1,
                                    textShadow: 'unset',
                                }}>shifts</Typography>
                                <Divider variant="fullWidth" component={'div'} role={'presentation'} sx={{margin: "0 auto"}}>
                                   
                                </Divider>
                                </Root>

                                <FormGroup>
                                    <FormControlLabel control={<Switch defaultChecked={enabled} />} label="Enable" onClick={()=>setEnabled(!enabled)}/>
                                    <Box sx={{ minWidth: '40ch' }}>
                                    <FormControl disabled={!enabled} sx={{my:1, mx:6, minWidth: '25ch'}}>
                                        <InputLabel id="demo-simple-select-label">Shift</InputLabel>
                                        <Select
                                        autoWidth
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={userData.ShiftId}
                                        label="Shift"
                                        onChange={(e)=>setUserData({...userData, ShiftId: e.target.value})}
                                        >
                                        {menuChoices.map((choice)=>{
                                            return <MenuItem value={choice.value}>{choice.label}</MenuItem>
                                            
                                        })}
                                        </Select>
                                    </FormControl>
                                    </Box>
                                   
                                    <FormControlLabel sx={{my:1, mx:6}} autoCapitalize
                                        control={<Button variant='contained' sx={{p:1}} disabled={!enabled} startIcon={<AddIcon/>} onClick={async()=>{
                                            if(userData.ShiftId!==""){
                                                await employees_ws.add_employee_to_shift(params["fullName"], userData.ShiftId)
                                                handle_log('add employee to shift')
                                                setUpdateShifts(!updateShifts)
                                            }
                                        }} >add employee to shift</Button>}  />
                                </FormGroup>

                            </Box>
                    </Container>

                </Grid>
                <Grid item md={7} xs={12} justifyContent={'center'} alignItems={'center'} >
                    <Container sx={{
                        height: 700
                    }}>
                        <EditEmployeeShiftsTableComp employee_id={params["fullName"]} update_shifts={updateShifts}></EditEmployeeShiftsTableComp>
                    </Container>
                </Grid>
            </Grid>
            </Container>
        </div>
    )
}

export default EditEmployee