import { Box, Button, Container, FormControl, FormGroup, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setActions, setCurrentActions } from '../redux/slices/sessionSlice'
import departments_ws from '../services/department_service'
import employees_ws from '../services/employees_service'
import log_service from '../services/log_service'
import TextFieldComp from './shared/textfield'

export const NewDepartmentComp = (props) => {
    const navigate = useNavigate()
    const session = useSelector(state=> state.session)
    const dispatch = useDispatch()
    const temp_values = {name: "", manager: ""}
    const [values, setValues] = useState(temp_values)
    const [menuChoices2, setMenuChoices2] = useState([])
    const [manager, setManager] = React.useState({
        id: "", //employee id
        value: "" //employee name
    });
    const handleValue = (newValue) => { 
        const _values = {...temp_values}
        const temp = [...formTextFields].map(tf=>{
            if(tf.label===newValue.label)
                tf.value = newValue.value
            return tf
        })
        if(temp.length>0){
            _values.name = temp[0].value
            setValues(_values)
            setFormTextFields(temp)
        }
    }

    const handle_log = (message) => {
        log_service.logEvent(session.session, message)
        dispatch(setActions({
            currentActions: session.session.actions.currentActions - 1,
            maxActions: session.session.actions.maxActions
        }))
    }

    const [formTextFields, setFormTextFields] = useState([{
        value: "",
        label: "Department Name", 
        variant: "outlined", 
        required: true, 
        helperText: "please enter the name of the department", 
        disabled: false, 
        type: "text", 
        error: false 
    }])
  
    const handleOnClick = () => {
        if(values["name"]!=="" && manager && manager.id!==""){
            //get id of manager
            handle_log('add new department')
            departments_ws.add_department(values["name"], manager.value, manager.id)
        }
    }
    
    useEffect(() => {
      const getEmployees = async() => {
        let employees = await employees_ws.get_all_employees()
        employees = employees.map(employee=>{
            return {
                id: employee._id.$oid, //employee id
                value: `${employee.FirstName} ${employee.LastName}` //employee name
            }
        })
        setMenuChoices2(employees)
    }
      getEmployees()
    }, [])
    

    return(
        <div>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>NEW DEPARTMENT</Typography>
            <Box component="form" sx={{
                    '& .MuiTextField-root': { 
                        m: 2,
                        flexGrow: 1,
                        display: 'flex'
                    },
                 }}
                noValidate
                autoComplete="off"
            >
                    {formTextFields.map((tf, index) => {
                        return <Container key={index} sx={{ '& > :not(style)': {
                             margin: "10px auto" ,
                             maxWidth: '45ch' }}}>
                            <TextFieldComp 
                                tf={tf}
                                handleValue={handleValue}
                            ></TextFieldComp>
                        </Container>
                    })}
                     <Box sx={{ maxWidth: '42ch'}} display={'block'} m={'0 auto'}> 
                                <FormGroup>  
                                    <FormControl required sx={{my:2}} fullWidth>
                                        <InputLabel id="demo-simple-select-label">Manager Name</InputLabel>
                                        <Select
                                        // autoWidth
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={manager.id}
                                        label="Manager Name"
                                        onChange={(e)=>setManager({...manager, id: e.target.value})}
                                        >
                                        {menuChoices2 && menuChoices2.map((choice)=>{
                                            return <MenuItem key={choice.id} value={choice.id}>{choice.value}</MenuItem>
                                        })}
                                        </Select>
                                    </FormControl>
                                </FormGroup>
                                </Box>
                    <Box sx={{
                            margin: "0 auto",
                            display: "grid"
                    }}>
                        <Button 
                            sx={{
                                margin: "5px auto",
                            }}
                            onClick={handleOnClick}
                            size='large' 
                            variant='contained' 
                            color='primary'>
                                Create New Department
                        </Button>
                        <Button 
                        sx={{
                            margin: "5px auto",
                           
                        }}
                        onClick={()=>{
                            handle_log('navigate back to departments, aka cancle')
                            navigate('/departments')
                        }}
                        size='large' 
                        variant='contained' 
                        color='error'>
                            cancle
                    </Button>
                    </Box>
                    
                    
            </Box>
        </div>
    )
}

export default NewDepartmentComp