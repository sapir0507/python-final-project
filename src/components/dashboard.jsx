import { Typography } from '@mui/material'
import React from 'react'

const DashboardComp = (props) => {
    return(
        <div>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>DASHBOARD</Typography>
        </div>
    )
}

export default DashboardComp