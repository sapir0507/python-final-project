import { Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DepartmentTableComp from './shared/departmentTable'

export const DepartmentComp = (props) => {
    const navigate = useNavigate()
    return(
        <div>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>DEPARTMENTS</Typography>
            <Container>
            <Grid container spacing={2}>
                <Grid item xl={2} md={12} xs={12}>
                    <Container>
                        <Button variant='contained' color='secondary' onClick={()=>{navigate('/new-department')}}>
                            New Department
                        </Button>
                    </Container>
                </Grid>
                <Grid item xl={10} md={12} xs={12}>
                    <DepartmentTableComp></DepartmentTableComp>
                </Grid>
            </Grid>
            </Container>
        </div>
    )
}

export default DepartmentComp