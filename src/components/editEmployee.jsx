import { Typography } from '@mui/material'
import React from 'react'

export const EditEmployee = (props) => {
    return(
        <div>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>EDIT EMPLOYEE</Typography>
        </div>
    )
}

export default EditEmployee