import { Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export const NewEmployee = (props) => {
    const session = useSelector(state=> state.session)
    return(
        <div>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>NEW EMPLOYEE</Typography>
        </div>
    )
}

export default NewEmployee