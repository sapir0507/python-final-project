import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material'
// import React from 'react'
import * as React from 'react';
import logo from '../images/Khmer-Beverages-cover.webp'
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';

const DashboardComp = () => {
    return (
        <Box>
            <Box component={'div'} sx={{
                display: 'block',
                Maxwidth: '100%',
                MinHeight: "50vh",
                margin: "0 auto",
                p: 2,
                backgroundImage: 'url(https://t4.ftcdn.net/jpg/02/52/80/57/360_F_252805718_27cmHaKJCh5aEe0fbK25XnEf7FPefbTY.jpg)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
                <Box component={'div'} sx={{  MaxWidth: "90vh", MinHeight:"42vh", margin: 'auto auto', pt: 10, pb: 10 }} Maxwidth={'inherit'}>
                <Typography align='center' variant='h2' component={ 'h1' } color={ 'black' } sx={{
                    opacity: 1,
                    flexGrow: 1,
                    color: 'black',
                    textShadow: "2px 2px 0 white, 2px -2px 0 white, -2px 2px 0 white, -2px -2px 0 white, 2px 0px 0 white, 0px 2px 0 white, -2px 0px 0 white, 0px -2px 0 white",
                    fontWeight: 700
                }}>Factory Name</Typography>
                <Divider color={'orange'} sx={{display:'block', height: "5px", margin: "0 auto", mt: -1.5, maxWidth: "45vh"}} variant='middle'></Divider>
                <Typography align='center' variant='h4' component={ 'h3' } color={ 'black' } sx={{
                    mt: 3,
                    flexGrow: 1,
                    color: 'black',
                    textShadow: "2px 2px 0 white, 2px -2px 0 white, -2px 2px 0 white, -2px -2px 0 white, 2px 0px 0 white, 0px 2px 0 white, -2px 0px 0 white, 0px -2px 0 white",
                    fontWeight: 700
                }}>Some catchy line about the factory</Typography>
                 <Typography align='center' variant='h6' component={ 'h6' } color={ 'black' } sx={{
                    mt: 3,
                    flexGrow: 1,
                    color: 'black',
                    textShadow: "2px 2px 0 white, 2px -2px 0 white, -2px 2px 0 white, -2px -2px 0 white, 2px 0px 0 white, 0px 2px 0 white, -2px 0px 0 white, 0px -2px 0 white",
                }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi sequi modi possimus fugiat odio itaque provident corrupti inventore cumque! Impedit dolor, iste repudiandae modi amet id recusandae repellat quos quaerat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, expedita a fuga iusto rem quis commodi sed assumenda amet porro consequatur, nam nostrum fugit aut? Dolores necessitatibus dolore repellendus sit.</Typography>
                <Container>
                    <Button variant='contained' size='large' color='success' sx={{display:'block', m:"0 auto", mt:4,  justifyContent:'center', alignItems: 'center'}}>Learn More</Button>
                </Container>
                </Box>
                
            </Box>
            <Container sx={{
                        backgroundColor: "white",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%2312B9FF' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%238F8F21'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E")`
                    }}>
                <Grid container display={'flex'} justifyContent={"center"} alignItems={'center'}>
                    <Grid item md={6} display={'flex'} justifyContent={"center"} alignItems={'center'}>
                        <Container sx={{
                        
                    }}>
                        <h2>Why choose us?</h2>
                        <Divider variant='fullWidth'></Divider>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor earum nemo, corrupti tenetur similique repellat aspernatur recusandae sunt exercitationem in, facere sapiente quis est quae laudantium ullam, aperiam voluptas nulla.</p>
                        </Container>
                    </Grid>
                    <Grid item md={6} display={'flex'} justifyContent={"center"} alignItems={'center'}>
                        <Container>
                        <h2>Our Mission</h2>
                        <Divider variant='middle'></Divider>
                        
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus aut eveniet est, molestias a esse quas veniam saepe repellendus nam praesentium voluptates sequi inventore velit suscipit nisi fuga atque blanditiis?</p>
                    
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default DashboardComp


