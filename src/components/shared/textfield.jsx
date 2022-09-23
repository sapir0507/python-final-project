import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const TextFieldComp = (props) => {
    const {value, label, variant, required, helperText, disabled, type, error, handleValue } = props.tf
    const [newValue, setNewValue] = useState(value? value: "")

    useEffect(() => {
        const temp = {...props.tf,
            value: newValue
        }
        handleValue(temp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [newValue])

    return(
        <div>
            <TextField
                id="outlined-required"
                label={label? label: ""}
                value={newValue}
                variant={variant? variant: "outlined"}
                onChange={(e)=>{
                    setNewValue(e.target.value)
                }}
                required={required? true: false}
                helperText={helperText? helperText: ""}
                disabled={disabled? true: false}
                type={type? type: "text"}
                error={error? true: false}
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