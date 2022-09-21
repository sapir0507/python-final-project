import { Typography } from '@mui/material'
import React from 'react'

export const ShiftComp = (props) => {
    return(
        <div>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>SHIFTS</Typography>
        </div>
    )
}

export default ShiftComp