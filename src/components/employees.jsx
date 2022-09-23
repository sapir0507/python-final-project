
import { Box, Button, FormControl, Grid, InputBase, InputLabel, MenuItem, Select, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import CollapsibleTable from './shared/table';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
       marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));

export const EmployeesComp = (props) => {
    
    const navigate = useNavigate();
    const [menueItems, setMenuItems] = useState([
        // {lable: 'None', value: <em>None</em>},
        {lable: 'Ten', value: 10},
        {lable: 'Twenty', value: 20},
        {lable: 'Thirty', value: 30}
    ]);
    const [department_value, setDepartment_value] = useState(menueItems[0].value);

    const handleChange = (event) => {
        setDepartment_value(event.target.value);
    };

    return(
        <div>  
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
                }}>EMPLOYEES</Typography>
            <Container sx={{marginTop: 4}}>
            <Grid container spacing={2}>
                <Grid item md={2} xs={7}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl  variant="standard" fullWidth>
                            <InputLabel id="department-select-label">Department</InputLabel>
                            <Select
                                labelId="department-select-label"
                                id="demo-simple-select"
                                value={department_value}
                                // placeholder={'department'}
                                label="department"
                                onChange={handleChange}
                                input={<BootstrapInput/>}>
                                    {menueItems.map(item=>{
                                        return <MenuItem value={item.value} key={item.value}>{item.lable}</MenuItem>
                                    })}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={3}>  
                    <Box sx={{m:3}}>
                    <Button variant="contained" color='info' size='large' onClick={()=>{navigate("/new-employee")}}>
                        New Employee
                    </Button>    
                    </Box>   
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{marginTop: 3}}>
                        <CollapsibleTable>
                        </CollapsibleTable>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        </div>
      
    )
}

export default EmployeesComp