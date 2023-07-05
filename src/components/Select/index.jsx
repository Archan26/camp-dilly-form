import React, { useRef } from 'react';
import ReactSelect, { components } from 'react-select';
import './select.scss'

function CustomSelect({
    options,
    value,
    label,
    onChange,
    placeholder,
    isMulti,
    error,
    width,
    height,
    isColored,
    css,
    isClearable = false,
    ...props
},
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ref = useRef()
) {
    console.log('props :>> ', props)
    // console.log('onChange :>> ', onChange())
    console.log('value :>> ', value);
    const customStyles = {
        control: (base) => ({
            ...base,
            background: props?.isDisabled ? 'rgba(239, 239, 239, 0.3)' : '#fff',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: error ? 'red' : '#dfe4ec',
            width: width || base.width,
            height: height || base.height,
            minHeight: 40,
            ':hover': {
                cursor: 'pointer',
                borderWidth: 1,
                border: '1px solid #818384',
                // borderColor: errorMessage ? 'red' : '#dfe4ec',
                outline: '0px !important',
            },
        }),
        option: (base, opt) => ({
            ...base,
            cursor: 'pointer',
            margin: '5px 0px',
            width: '100%',
            borderRadius: '8px',
            ...(isColored
                ? {
                    color: opt.isSelected ? '#fff' : opt.data.sTextColor,
                    backgroundColor: opt.isSelected ? '#2684ff' : opt.data.sBackGroundColor,
                    fontWeight: '600',
                    boxShadow: `inset 0 0 0 1px 30px ${opt.data.sTextColor}`,
                }
                : {}),
        }),
        menu: (base) => {
            return {
                ...base,
                zIndex: 999999,
                '*': {
                    zIndex: 999999,
                    scrollBehavior: 'smooth',
                },
                borderRadius: '12px',
                padding: '0 8px',
                width: '100%',
                minWidth: 'max-content'
            }
        },
        placeholder: (base) => ({
            ...base,
            color: '#b2bfd2',
        }),
        singleValue: (base) => ({
            ...base,
            color: '#020202',
            ':hover': {
                cursor: 'pointer',
            },
        }),
        dropdownIndicator: (base) => ({
            ...base,
        }),
        indicatorSeparator: (base) => ({
            ...base,
            opacity: 0,
        }),
        clearIndicator: (base) => ({
            ...base,
        }),
        container: (base) => ({
            ...base,
            ...css,
        }),
        valueContainer: (base) => {
            const padding = isMulti ? '2px 5px' : base.padding
            return { ...base, padding }
        },
        multiValue: (styles, a) => {
            // if (a.index >= limit) {
            //   return { display: 'none' }
            // }
            const colored = isColored
                ? {
                    color: a.data?.sTextColor,
                    fontWeight: 500,
                    '*': { borderRadius: '6px', color: a.data?.sTextColor, backgroundColor: a.data?.sBackGroundColor, fontWeight: 500 },
                    backgroundColor: a.data?.sBackGroundColor,
                }
                : {
                    color: '#445774',
                    border: '2px solid transparent',
                    backgroundColor: '#F2F4F7',
                    ':hover': {
                        border: '2px solid #12121240',
                        color: '#445774',
                    },
                }

            return {
                ...styles,
                margin: '4px 4px',
                borderRadius: '6px',
                transition: '0.2s all ease-out',
                ...colored,
            }
        },
        multiValueRemove: (styles, { data }) => {
            const colored = isColored
                ? {
                    color: data.sTextColor,
                    backgroundColor: data.sBackGroundColor,
                    ':hover': {
                        '*': {
                            color: data.sBackGroundColor,
                            backgroundColor: data.sTextColor,
                        },
                        backgroundColor: data.sTextColor,
                    },
                }
                : {
                    color: '#B2BFD2',
                    border: '2px solid transparent',
                    ':hover': {
                        backgroundColor: '#dc3545cc',
                        border: '2px solid #ff0000',
                        color: '#f2f2f2',
                        borderRadius: '4px',
                    },
                }
            return {
                ...styles,
                marginLeft: '5px',
                borderRadius: '4px',
                ...colored,
            }
        },
    }

    return (
        <>
            <div className='select-container '>
                {label && <label htmlFor={label}>{label}</label>}
                <ReactSelect
                    id={label}
                    styles={customStyles}
                    isClearable={isClearable}
                    options={options}
                    isMulti={isMulti}
                    ref={ref}
                    menuPlacement="auto"
                    allowCreateWhileLoading
                    {...props}
                />
                {error && <p className="errorMessage">{error}</p>}
            </div>
        </>
    );
};




export default CustomSelect;
