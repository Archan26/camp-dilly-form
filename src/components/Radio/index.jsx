import React from 'react'
import './radio.scss'

function Radio(
    {
        
        label,
        optionlabel,
        type,
        value,
        onChange,
        id,
        error,
        ...props
    }, ref
) {
    return (
        <div className='d-flex input'>
            <div className="radio-field">
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    id={id}
                    />
                    <label>{optionlabel}</label>
            </div>
            {error && <p className="errorMessage">{error}</p>}
        </div>
    )
}

export default Radio