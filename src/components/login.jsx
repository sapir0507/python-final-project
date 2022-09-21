import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import React, { useState } from 'react'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import auth from '../services/auth';
// import users_ws from '../services/users_service';
import { useDispatch } from 'react-redux';
import { 
    setToken, 
    // getToken 
} from '../redux/slices/sessionSlice'



const FormControlComp = ({values, handleChange, type, handleClickShowPassword, handleMouseDownPassword}) => {
    return (
        
        <FormControl               
            variant="outlined"
            sx={{m:1, width: '25ch'}}
        >
        <InputLabel sx={{textTransform: 'capitalize'}}>{type}</InputLabel>
        <OutlinedInput
            
            type={type==='username'? 'text': values.showPassword? 'text': 'password'}
            value={type === 'username'? values.username : values.password}
            onChange={handleChange(type)}
            label={type}
            endAdornment={ type === "username"? false :
                <InputAdornment position='end'>
                    <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {values.showPassword? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                </InputAdornment>
            }
        ></OutlinedInput>
    </FormControl>
    ) 
}

export const LoginComp = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: 'Bret',
        password: 'Sincere@april.biz',
        showPassword: false,
        IsTextFieldError: false
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleError = (prop) => (event) => {
        setValues({ ...values, IsTextFieldError: [prop] });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const authLogin = async(username, password)=>{
        const resp = await auth.login_with_username_and_email(username, password)
        return resp
    }

    // const getusers = async(username, password)=>{
    //     let arr = await users_ws.get_all_users()
    //     console.log(arr);
    // }



    const hanleLoginAttempt = async (event) => {
        //attempt login
        const auth_success = await authLogin(values.username,  values.password)
       
        auth_success? handleError(true) : handleError(false)
        if(auth_success){
           dispatch(setToken(sessionStorage["token"]))
           
           navigate('/')
        }
        
       
    }

    return (
        <Container maxWidth='xl'>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>LOGIN</Typography>
            <Box component={"div"} sx={{ m: 3, flexGrow: 1, justifyContent: 'center'}}>
            <Grid container sx={{ justifyContent: 'center' }}>
                <Grid item>
                  <FormControlComp values={values} type="username" handleChange={handleChange}></FormControlComp> 
                </Grid>
                <Grid item >
                <FormControlComp values={values} type="password" handleClickShowPassword={handleClickShowPassword} handleMouseDownPassword={handleMouseDownPassword} handleChange={handleChange}></FormControlComp>
                </Grid>
                <Grid item>
                    <FormControl
                        sx={{m:1, flexGrow: 1, width: '20ch', justifyContent:'center'}}
                    >
                        <Button variant='outlined' color='success' onClick={hanleLoginAttempt} sx={{height: '7ch', justifyContent: 'center'}}>Login</Button>                        
                    </FormControl>
                </Grid>

            </Grid>
        </Box>
        </Container>

    )
}

export default LoginComp

