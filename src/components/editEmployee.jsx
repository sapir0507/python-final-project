import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import shifts_ws from '../services/shifts_service'
import employees_ws from '../services/employees_service'


export const EditEmployee = (props) => {
    const params = useParams()
    const navigate = useNavigate()

    const tempShift = {
        Date: "",
        StartingHour: "",
        EndingHour: ""
    }

    const [userData, setUserData] = useState({
        FirstName: "",
        LastName: "",
        StartWorkYear: "",
        DepartmentID: ""
    })

    const [userShifts, setUserShifts] = useState([])
    const [allShifts, setAllShifts] = useState([])


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

    useEffect(() => {
        const getAllShifts = async () => {
            const shifts = await shifts_ws.get_all_shifts()   
            console.log(shifts)
        }
        const getEmployee = async () => {
            const employees = await employees_ws.get_all_employees()
            const employee = employees.filter(emp=>(emp.FirstName+" "+emp.LastName)===params['FullName'])
            console.log(employee)
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
            <Grid container spacing={2}>
                <Grid item>

                </Grid>
                <Grid item>

                </Grid>
            </Grid>
        </div>
    )
}

export default EditEmployee