import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import departments_ws from '../services/department_service'
import TextFieldComp from './shared/textfield'

export const NewDepartmentComp = (props) => {
    const navigate = useNavigate()
    const temp_values = {name: "", manager: ""}
    const [values, setValues] = useState(temp_values)

    const handleValue = (newValue) => { 
        console.log("handleValue");
        const _values = {...temp_values}
        const temp = [...formTextFields].map(tf=>{
            if(tf.label===newValue.label)
                tf.value = newValue.value
            return tf
        })
        
        _values["manager"] = temp[1].value
        _values["name"] = temp[0].value
        console.log(_values);
        setValues(_values)
        setFormTextFields(temp)
    }

    const [formTextFields, setFormTextFields] = useState([{
        value: "",
        label: "Department Name", 
        variant: "outlined", 
        required: true, 
        helperText: "please enter the name of the department", 
        disabled: false, 
        type: "text", 
        error: false, 
        handleValue 
    },
    {
        value: "",
        label: "Manager", 
        variant: "outlined", 
        required: true, 
        helperText: "please enter the full name of the department manager", 
        disabled: false, 
        type: "text", 
        error: false, 
        handleValue 
    }])

    const handleError = (lable) => {
        const temp = [...formTextFields].map(tf=>{
            tf = {...tf,
                error: tf.label === lable? true: false
            }
            return temp
        })
    }
  
    const handleOnClick = () => {
        if(values["name"]!==""&&values["manager"]!==""){
            console.log("clicked");
            departments_ws.add_department(values["name"], values["manager"])
        }
    }

    // useEffect(() => {
    //   if(values["name"]!==""&&values["manager"]!==""){
    //     console.log("use effect");
    //     departments_ws.add_department(values["name"], values["manager"])
    //   }
    // }, [values])
    


    return(
        <div>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>NEW DEPARTMENT</Typography>
            <Box component="form" sx={{
                    '& .MuiTextField-root': { 
                        m: 2,
                        flexGrow: 1,
                        display: 'flex'
                    },
                 }}
                noValidate
                autoComplete="off"
            >
                    {formTextFields.map((tf, index) => {
                        return <Container key={index} sx={{ '& > :not(style)': {
                             margin: "10px auto" ,
                             maxWidth: '45ch' }}}>
                            <TextFieldComp 
                                tf={tf}
                            ></TextFieldComp>
                        </Container>
                    })}
                    <Box sx={{
                            margin: "0 auto",
                            display: "grid"
                    }}>
                        <Button 
                            sx={{
                                margin: "5px auto",
                            }}
                            onClick={handleOnClick}
                            size='large' 
                            variant='contained' 
                            color='primary'>
                                Create New Department
                        </Button>
                        <Button 
                        sx={{
                            margin: "5px auto",
                           
                        }}
                        onClick={()=>{
                            navigate('/departments')
                        }}
                        size='large' 
                        variant='contained' 
                        color='error'>
                            cancle
                    </Button>
                    </Box>
                    
                    
            </Box>
        </div>
    )
}

export default NewDepartmentComp