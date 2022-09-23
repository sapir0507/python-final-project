import { Box, Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import React, { useState } from 'react'
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import auth from '../services/auth';
// import users_ws from '../services/users_service';
import { useDispatch } from 'react-redux';
import { 
    setToken, setUser, 
} from '../redux/slices/sessionSlice'
import users_ws from '../services/users_service';
import TextFieldComp from './shared/textfield';
import { grid } from '@mui/system';



const FormControlComp = ({values, handleChange, type, handleClickShowPassword, handleMouseDownPassword}) => {
    return (
        <FormControl 
            variant="outlined"
            color='primary'
            sx={{
                margin: 2, 
                width: '25ch',
                placeContent: 'center'
            }}
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
           dispatch(setUser({
            username: values.username,
            email: values.password,
            FirstName: "",
            LastName: "",
            id: ""
           }))
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
            <Box component={"div"} sx={{ 
               margin: "0 auto",
               padding: 2,
               border: "2px solid black",
               borderRadius: "10px",
               maxWidth: "70vh",
               zIndex: 2,
               boxShadow: '2px 2px 2px darkblue'
            }}>
            <Grid container>  
                <Grid item xs={12}>
                    <Box sx={{display: 'grid', placeContent:'center'}}>
                        <FormControlComp 
                            values={values} 
                            type="username" 
                            handleChange={handleChange}>
                        </FormControlComp> 
                    </Box>
                </Grid>
                <Grid item xs={12}>
                   <Box sx={{display: 'grid', placeContent:'center'}}>
                        <FormControlComp 
                            values={values} 
                            type="password" 
                            handleClickShowPassword={handleClickShowPassword} 
                            handleMouseDownPassword={handleMouseDownPassword} 
                            handleChange={handleChange}>
                        </FormControlComp>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{display: 'grid', placeContent:'center'}}>
                        <Button 
                            variant='contained' 
                            color='success' 
                            onClick={hanleLoginAttempt} 
                            sx={{
                                height: '7ch', 
                                justifyContent: 'center'
                            }}>
                                Login
                        </Button>                        

                    </Box>
                </Grid>
            </Grid>
        </Box>
        </Container>

    )
}

export default LoginComp

