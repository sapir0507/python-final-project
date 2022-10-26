import { Box, Button, Container, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Stack, Switch, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import employees_ws from '../services/employees_service'
import shifts_ws from '../services/shifts_service'
import TextFieldComp from './shared/textfield'
import AddIcon from '@mui/icons-material/Add';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import log_service from '../services/log_service'
import { useDispatch, useSelector } from 'react-redux'
import { setActions } from '../redux/slices/sessionSlice'


export const ShiftComp = (props) => {
    const session = useSelector(state => state.session)
    const dispatch = useDispatch()

    const [enabled, setEnabled] = useState(false)
    const [updateShifts, setUpdateShifts] = useState(false)


    // const navigate = useNavigate()
    const [values, setValues] = useState({
        StartingHour: "",
        EndingHour: "",
        Date: ""
    })
    const [allShifts, setAllShifts] = useState([])
    const [allEmployees, setAllEmployees] = useState([])
    const [shift, setShift] = useState("")
    const [employee, setEmployee] = useState("")

    const handle_log = (message) => {
        log_service.logEvent(session.session, message)
        dispatch(setActions({
            currentActions: session.session.actions.currentActions - 1,
            maxActions: session.session.actions.maxActions
        }))
    }

    const handleValue = (newValue) => {
        const temp = [...formTextFields].map(tf => {
            if (tf.label === newValue.label)
                tf.value = newValue.value
            return tf
        })
        setValues({
            StartingHour: temp[1].value,
            EndingHour: temp[2].value,
            Date: temp[0].value
        })
        setFormTextFields(temp)
    }

    const [formTextFields, setFormTextFields] = useState([{
        value: "",
        label: "Date",
        variant: "outlined",
        required: true,
        helperText: "please enter the date of the shift",
        disabled: false,
        type: "text",
        error: false,
    },
    {
        value: "",
        label: "Starting Hour",
        variant: "outlined",
        required: true,
        helperText: "please enter the shift starting hour",
        disabled: false,
        type: "text",
        error: false,
    },
    {
        value: "",
        label: "Ending Hour",
        variant: "outlined",
        required: true,
        helperText: "please enter the shift ending hour",
        disabled: false,
        type: "text",
        error: false,
    }])

    const [existingShiftsTextFields, SetExistingShiftsTextFields] = useState([])

    const handleError = (lable) => {
        const temp = [...formTextFields].map(tf => {
            tf = {
                ...tf,
                error: tf.label === lable ? true : false
            }
            return tf
        })
    }

    const handleLoadShift = async (shift) => {
        const s = await shifts_ws.get_shift(shift)
        setValues({
            StartingHour: s.StartingHour,
            EndingHour: s.EndingHour,
            Date: s.Date
        })
        const temp = [...formTextFields].map(tf => {
            if (tf.label === "Starting Hour")
                tf.value = s.StartingHour
            if (tf.label === "Ending Hour")
                tf.value = s.EndingHour
            if (tf.label === "Date")
                tf.value = s.Date
            return tf
        })
        setFormTextFields(temp)
    }

    const addShift = async () => {
        shifts_ws.add_shift(values.Date, values.StartingHour, values.EndingHour)
    }

    const updateShift = async () => {
        // console.log(shift, values)
        await shifts_ws.update_shift_params(shift, values.Date, values.StartingHour, values.EndingHour)
    }


    const handleChange_shifts = (event) => {
        setShift(event.target.value);
    };

    const handleChange_employees = (event) => {
        setEmployee(event.target.value);
    };

    const handleAddEmployeeToShift = async () => {
        await employees_ws.add_employee_to_shift(employee.$oid, shift)
    };

    useEffect(() => {
        //get all the shifts (redux)
        const get_all_shifts = async () => {
            let shifts = await shifts_ws.get_all_shifts()
            let employees = await employees_ws.get_all_employees()
            shifts = shifts.map(shift => {
                return {
                    _id: shift._id.$oid,
                    shift: `${shift.Date}, ${shift.StartingHour}-${shift.EndingHour}`
                }
            })
            setAllShifts(shifts)
            setShift("")
            employees = employees.map(employee => {
                return {
                    _id: employee._id,
                    employee: `${employee.FirstName} ${employee.LastName}`
                }
            })
            setAllEmployees(employees)
        }
        get_all_shifts()
    }, [])

    useEffect(() => {
        //get all the shifts (redux)
        const get_all_shifts = async () => {
            let shifts = await shifts_ws.get_all_shifts()
            shifts = shifts.map(shift => {
                return {
                    _id: shift._id.$oid,
                    shift: `${shift.Date}, ${shift.StartingHour}-${shift.EndingHour}`
                }
            })
            setAllShifts(shifts)  
        }
        get_all_shifts()

    }, [updateShifts])

    



    return (
        <Container>
            <Typography align='center' variant='h2' component={ 'h1' } color={ 'black' } sx={ {
                flexGrow: 1,
                m: 4,
                textShadow: 'unset',
                fontWeight: 700
            } }>SHIFTS</Typography>

            <Grid container spacing={ 2 }>

                <Grid item xs={ 5 } display={ "flex" } justifyContent={ 'center' } alignItems={ 'center' } sx={ {
                    border: "1px outset black",
                    borderRadius: '10px',
                    zIndex: 2,
                    margin: "0 auto",
                    boxShadow: "2px 2px gray",
                } }>
                    <Box component="form" sx={ {
                        '& .MuiTextField-root': {
                            m: 2,
                            maxWidth: '49ch',
                            flexGrow: 1,
                            display: 'flex'
                        },
                    } }
                        noValidate
                        autoComplete="off"
                    >
                        { formTextFields.map((tf, index) => {
                            return <Container key={ index } sx={ {
                                '& > :not(style)': {
                                    margin: "10px auto",
                                    maxWidth: '45ch'
                                }
                            } }>
                                <TextFieldComp
                                    tf={ tf }
                                    handleValue={handleValue}
                                ></TextFieldComp>
                            </Container>
                        }) }
                        <Box sx={ { p: 2 } }>
                            <Stack spacing={ 2 }
                                direction={ { xs: 'column', sm: 'column', md: 'row', lg: 'row' } }
                            >
                                <Button variant='contained' size='larger' color='success' onClick={ () => {
                                    handle_log('create new shift')
                                    addShift()
                                    setUpdateShifts(!updateShifts)
                                } } >
                                    Create New Shift
                                </Button>
                                <Button variant='contained' size='larger' color='secondary' onClick={ () => {
                                    handle_log('change existing shift')
                                    updateShift()
                                } }>
                                    change existing shift
                                </Button>
                            </Stack>
                        </Box>
                        <FormGroup>
                            <FormControlLabel control={ <Switch defaultChecked={ enabled } /> } label="Enable" onClick={ () => setEnabled(!enabled) } />
                            <Box>
                                <FormControl sx={{ display:"flex", my: 2, mx: 6, minWidth: 135 }}>
                                    <InputLabel id="employee-select-autowidth-label">Employees</InputLabel>
                                    <Select
                                        disabled={ !enabled }
                                        labelId="employee-select-autowidth-label"
                                        id="employee-select-autowidth"
                                        value={ employee }
                                        onChange={ handleChange_employees }
                                        
                                        label="Employee"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        { allEmployees && allEmployees.map(emp => {
                                            return <MenuItem key={ emp._id } value={ emp._id }>{ emp.employee }</MenuItem>
                                        }) }
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ display:"flex", my: 1, mx: 6, minWidth: 135 }}>
                                    <InputLabel id="select-shift">Shifts</InputLabel>
                                    <Select
                                        disabled={ !enabled }
                                        labelId="select-shift"
                                        id="select-shift-autowidth"
                                        value={ shift }
                                        onChange={ (e) => handleChange_shifts(e) }
                                        
                                        label="Shift"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        { allShifts && allShifts.map(shift => {
                                            return <MenuItem key={ shift._id } value={ shift._id }>{ shift.shift }</MenuItem>
                                        }) }
                                    </Select>
                                </FormControl>
                            </Box>

                            <FormControlLabel sx={{ my: 1, mx: 6 }} autoCapitalize
                                control={
                                    <Button variant='contained' sx={{ p: 1 }} disabled={ !enabled } startIcon={ <AddIcon /> } onClick={ () => {
                                        handle_log('add employee to shift')
                                        handleAddEmployeeToShift()
                                    } }>add to Shift</Button>
                                }
                            />


                            <FormControlLabel sx={{ my: 1, mx: 6, mb: 3 }} autoCapitalize
                                control={ <Button variant='contained' sx={{ p: 1, minWidth: 135 }} disabled={ !enabled } startIcon={ <AutoModeIcon /> } onClick={ () => {
                                    handleLoadShift(shift)
                                } }>Load Shift</Button> } />
                        </FormGroup>

                    </Box>
                </Grid>
            </Grid>







        </Container>
    )
}

export default ShiftComp

