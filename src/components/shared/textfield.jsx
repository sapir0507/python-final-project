import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const TextFieldComp = (props) => {
    
    const [newValue, setNewValue] = useState(props.tf.value? props.tf.value: "")

    useEffect(() => {
        const temp = {...props.tf,
            value: newValue
        }
        props.handleValue(temp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [newValue])

    useEffect(()=>{
        setNewValue(props.tf.value? props.tf.value: "")
    }, [props])


    return(
        <div>
            <TextField
                id="outlined-required"
                label={props.tf.label? props.tf.label: ""}
                value={newValue}
                variant={props.tf.variant? props.tf.variant: "outlined"}
                onChange={(e)=>{
                    setNewValue(e.target.value)
                }}
                required={props.tf.required? true: false}
                helperText={props.tf.helperText? props.tf.helperText: ""}
                disabled={props.tf.disabled? true: false}
                type={props.tf.type? props.tf.type: "text"}
                error={props.tf.error? true: false}
            />
        </div>
    )
}



export default TextFieldComp