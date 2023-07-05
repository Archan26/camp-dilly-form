import React from 'react'
import './input.scss'

function Input(
    {
        label,
        lableRequire = false,
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
            <label>{label}{lableRequire && <span style={{ color: 'red' }}>*</span>}</label>
            <div className="input-field">
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    id={id}
                    {...props}
                />
            </div>
            {error && <p className="errorMessage">{error}</p>}
        </div>
    )
}

export default Input