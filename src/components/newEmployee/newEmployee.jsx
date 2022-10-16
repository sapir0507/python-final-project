import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import departments_ws from '../../services/department_service'
import employees_ws from '../../services/employees_service'

export const NewEmployeeForm = (props) => {
    const session = useSelector(state=> state.session)
    const [departments, setDepartments] = useState([])
    const [values, setValues] = useState([])
    const [temp_values, setTemp_values] = useState({fname: "", lname: "", StartWorkYear: "", department: ""})
    // const temp_departments = {department_id: "", department_name: ""}

    useEffect(() => {
      const getDepartments = async() => {
        const dep = await departments_ws.get_all_departments()
        const department = dep.map(d=>{
            return {
                department_id: d._id.$oid,
                department_name: d.Name
            }
        })
        setDepartments(department)
      }
      getDepartments()
    }, [])
    
   
 
    return(
        <Container>
            <Box component="form" noValidate autoComplete="off"
                sx={{
                    display:'block',
                    margin: '0 auto',
                    minWidth: 120,
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
            >
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={temp_values.department}
                    label="Department"
                    onChange={(e)=>{
                        console.log(e.target.value)
                        setTemp_values({...temp_values, 
                            department: e.target.value
                        })
                    }}
                >
                    {departments.map(dep=>{
                        return <MenuItem value={dep.department_id}>{dep.department_name}</MenuItem>
                    })}
                </Select>
                </FormControl>
                <TextField id="outlined-basic" label="First Name" variant="outlined"  onChange={(e)=>{
                        setTemp_values({...temp_values, 
                            fname: e.target.value
                        })
                    }}/>
                <TextField id="outlined-basic" label="Last Name" variant="outlined"  onChange={(e)=>{
                        setTemp_values({...temp_values, 
                            lname: e.target.value
                        })
                    }}/>
                <TextField id="outlined-basic" label="Work Start Year" variant="outlined"  onChange={(e)=>{
                        setTemp_values({...temp_values, 
                            StartWorkYear: e.target.value
                        })
                    }}/>
                <Button variant='contained' color='secondary' size='large' onClick={async()=>{
                    await employees_ws.add_employee(temp_values.fname, temp_values.lname,temp_values.StartWorkYear, temp_values.department)
                }}>Create Employee</Button>


            </Box>
        </Container>
    )
}

export default NewEmployeeForm