import { Typography } from '@mui/material'
import React from 'react'
import NewEmployeeForm from './newEmployee/newEmployee'

export const NewEmployee = () => {
    return(
        <div>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>NEW EMPLOYEE</Typography>
            <NewEmployeeForm></NewEmployeeForm>
        </div>
    )
}

export default NewEmployee