import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import shifts_ws from '../services/shifts_service'
import TextFieldComp from './shared/textfield'

export const ShiftComp = (props) => {

    const navigate = useNavigate()
    const [values, setValues] = useState({
        StartingHour: "",
        EndingHour: "",
        Date: ""
    })
    const [allShifts, setAllShifts] = useState([])
    const handleValue = (newValue) => { 
        const temp = [...formTextFields].map(tf=>{
            if(tf.label===newValue.label)
                tf.value = newValue.value
            return tf
        })
        setValues({
            StartingHour: temp[1].value,
            EndingHour: temp[2].value,
            Date: temp[0].value
        })
        setFormTextFields(temp)
    }

    const [formTextFields, setFormTextFields] = useState([{
        value: "",
        label: "Date", 
        variant: "outlined", 
        required: true, 
        helperText: "please enter the date of the shift", 
        disabled: false, 
        type: "text", 
        error: false, 
        handleValue 
    },
    {
        value: "",
        label: "Starting Hour", 
        variant: "outlined", 
        required: true, 
        helperText: "please enter the shift starting hour", 
        disabled: false, 
        type: "text", 
        error: false, 
        handleValue 
    },
    {
        value: "",
        label: "Ending Hour", 
        variant: "outlined", 
        required: true, 
        helperText: "please enter the shift ending hour", 
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
        if(values["Date"]!==""&&values["EndingHour"]!==""&&values["StartingHour"]!==""){
            console.log(values)
            shifts_ws.add_shift(values["Date"], values["EndingHour"], values["StartingHour"])
        }
    }

    useEffect(() => {
      //get all the shifts (redux)

    }, [])
    


    return(
        <div style={{border:"1px outset"}}>
            <Typography align='center' variant='h2' component={'h1'} color={'black'} sx={{
                flexGrow: 1,
                m:4,
                textShadow: 'unset',
                fontWeight: 700
            }}>SHIFTS</Typography>
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
                            color='success'>
                                Create New Shift
                        </Button>
                        <Button 
                        sx={{
                            margin: "5px auto",
                           
                        }}
                        onClick={()=>{
                            
                        }}
                        size='large' 
                        variant='contained' 
                        color='warning'>
                            change existing shift
                    </Button>
                    </Box>
                    
                    
            </Box>
        </div>
    )
}

export default ShiftComp