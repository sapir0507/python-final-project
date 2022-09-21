import { Grid, Typography } from '@mui/material'
import React from 'react'
import DepartmentTableComp from './shared/departmentTable'

export const DepartmentComp = (props) => {
    return(
        <div>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>DEPARTMENTS</Typography>
            <Grid container spacing={2}>
                <Grid item xl={12} md={6} sx={4}>
                    <DepartmentTableComp></DepartmentTableComp>
                </Grid>
            </Grid>
        </div>
    )
}

export default DepartmentComp