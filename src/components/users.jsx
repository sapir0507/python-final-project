import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import UsersTableComp from './shared/usersTable'

export const UsersComp = (props) => {
    return(
        
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                    flexGrow: 1,
                    m:4,
                    textShadow: 'unset',
                    fontWeight: 700
                }}>USERS</Typography>
            </Grid>
            <Grid item xs={12}>
                <Container>
                    <UsersTableComp></UsersTableComp>
                </Container>
            </Grid>
        </Grid>
      
    )
}

export default UsersComp