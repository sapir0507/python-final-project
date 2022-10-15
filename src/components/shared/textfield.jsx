import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const TextFieldComp = (props) => {
    let {value, handleValue } = props.tf
    const [newValue, setNewValue] = useState(value? value: "")

    useEffect(() => {
        const temp = {...props.tf,
            value: newValue
        }
        handleValue(temp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [newValue])

    useEffect(()=>{
        setNewValue(props.tf.value)
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

TextFieldComp.propTypes = {
    tf: PropTypes.shape({
        value: PropTypes.string.isRequired, 
        label:  PropTypes.string.isRequired, 
        handleValue: PropTypes.func.isRequired,
        helperText: PropTypes.string, 
        variant:  PropTypes.string, 
        required: PropTypes.bool, 
        disabled: PropTypes.bool, 
        type: PropTypes.string,
        error: PropTypes.bool
    }).isRequired
}


export default TextFieldComp