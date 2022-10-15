
import { Box, Button, FormControl, Grid, InputBase, InputLabel, MenuItem, Select, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import CollapsibleTable from './shared/table';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import departments_ws from '../services/department_service';

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
    const [department_name, setDepartment_name] = useState(null);

    useEffect(() => {
     const getAllDepartments = async() => {
        const items = []
        const item = {
            lable: "Department Name",
            value: 0
        }
        items.push(item)
        const departments = await departments_ws.get_all_departments() 
        departments.forEach((department) => {
            console.log(department);
            const item = {
                lable: department["Name"],
                value: department["Name"]
            }
            items.push(item)
        });
        console.log(items)
        setMenuItems(items)
        setDepartment_value(items[0].value)
     }
     getAllDepartments()
    }, [])

    useEffect(() => {
        console.log(department_value)    
    }, [department_value])
    

    const handleChange = (event) => {
        setDepartment_value(event.target.value);
        if(Number(event.target.value)===0){
            setDepartment_name(null)
        }
        else
            setDepartment_name(event.target.value)
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
                <Grid item md={3} xs={7}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl  variant="standard" fullWidth>
                            <InputLabel id="department-select-label">Department</InputLabel>
                            <Select
                                labelId="department-select-label"
                                id="demo-simple-select"
                                value={department_value}
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
                        <CollapsibleTable department_name = {department_name}>
                        </CollapsibleTable>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        </div>
      
    )
}

export default EmployeesComp