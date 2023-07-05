import React, { useState } from 'react';

//component
import CustomModal from '../../components/CustomModal';
import Wrapper from '../../components/Wrapper';
import Input from '../../components/Input';

//hooks
import { Controller, useForm } from 'react-hook-form';

//query
import { addCampFormdata } from '../../Query/Camp/camp.muation';
import { useMutation } from '@tanstack/react-query';


//style
import { Form, Button, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import './CampForm.scss'
import { useNavigate } from 'react-router-dom';

const CampForm = () => {
    const navigate = useNavigate()

    const { control, handleSubmit, getValues, setValue, formState: { errors }, reset } = useForm();

    const [modal, setModal] = useState(false)
    // const [date, setDate] = useState()

    const checkboxSiteOptions = [
        { name: 'Camp Dilly', label: 'Camp Dilly', defaultValue: false },
        { name: 'Camp Unity', label: 'Camp Unity', defaultValue: false },
    ]
    const RadioOptions = [
        { value: 'Day Picnic', label: 'Day Picnic' },
        { value: 'Over Night', label: 'Over Night' },
    ];
    const dayPicnicPackage = [
        { value: '9 am to 9 pm', label: '9 am to 9 pm' },
        { value: '9 am to  5 pm', label: '9 am to  5 pm' },
        { value: '11 am to 9 pm', label: '11 am to 9 pm' },
        { value: '4 pm to 9 pm', label: '4 pm to 9 pm' }
    ]
    const OverNightRooms = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
        { value: 10, label: 10 },
    ]
    const overNightCrossCamp = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 }
    ]
    const overNightTent = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 }
    ]
    const overNightSkyRooms = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 }
    ]
    const overNightDay = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 }
    ]
    const typeOfCustomer = [
        { value: 'School', label: 'School' },
        { value: 'Tuition or College', label: 'Tution/College' },
        { value: 'Corporate', label: 'Corporate' },
        { value: 'Family or Social', label: 'Family/Social group' },
        { value: 'Other', label: 'Other' },
    ]
    const foodPreference = [
        { value: 'Regular', label: 'Regular' },
        { value: 'Swami Narayan', label: 'Swami Narayan' },
        { value: 'Jain', label: 'Jain' }
    ]

    const rules = {
        global: (value = 'This field is Required') => ({ required: value }),
        email: (value = 'Invalid email format') => ({
            ...rules.global(),
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: value,
            },
        }),
    }

    //post camp-form
    const addCampFormMutation = useMutation(addCampFormdata, {
        onSuccess: (data) => {
            reset()
            console.log('success');
            console.log('data :>> ', data);
        },
        // onError: (error) => {
        // handleErrors(error.response.data.errors, setError)
        // }
    })

    function Total(user) {
        // console.log('user1 :>> ', user);
        if (user.packageType === 'Day Picnic') {
            if (user.dayPicnicTime === '9 am to 9 pm') {
                return user.numberOfPeople * 1400.00
            }
            if (user.dayPicnicTime === '9 am to  5 pm') {
                return user.numberOfPeople * 1100.00
            } if (user.dayPicnicTime === '11 am to 9 pm') {
                return user.numberOfPeople * 1250.00
            } if (user.dayPicnicTime === '4 pm to 9 pm') {
                return user.numberOfPeople * 750.00
            }
        }
        if (user.packageType === 'Over Night') {
            let nightTotal = 0
            if (user.overNightRooms !== undefined) {
                nightTotal = nightTotal + user.overNightRooms * 6000.00
            }
            if (user.overNightCrossCamp) {
                nightTotal = nightTotal + (user.overNightCrossCamp * 2250)
            }
            if (user.overNightSkyRooms) {
                nightTotal = nightTotal + (user.overNightSkyRooms + 8000)
            }
            if (user.overNightTent) {
                nightTotal = nightTotal + (user.overNightTent * 10000)
            }
            return nightTotal
        }
    }

    function Advanced(total) {
        return (total * 20) / 100
    }

    function onSubmit(data) {

        const {
            customerName,
            contactNumber,
            emailId,
            packageType,
            dayPicnicTime,
            overNightRooms,
            overNightCrossCamp,
            overNightTent,
            overNightSkyRooms,
            overNightDay,
            numberOfPeople,
            typeOfCustomer,
            foodPreference,
            bookingDate,
            checkInDate,
            checkOutDate,
            // advancePayment,
            // totalPayment
        } = data

        const finance = {
            packageType,
            dayPicnicTime,
            overNightRooms: overNightRooms?.value,
            overNightCrossCamp: overNightCrossCamp?.value,
            overNightTent: overNightTent?.value,
            overNightSkyRooms: overNightSkyRooms?.value,
            overNightDay: overNightDay?.value,
            numberOfPeople,
        }
        const totalFinance = Total(finance)
        const advanceFinance = Advanced(totalFinance)

        const selectedOptions = checkboxSiteOptions
            .filter(({ name }) => getValues(name))
            .map(({ name }) => name);

        const user = {
            siteName: selectedOptions,
            customerName,
            contactNumber,
            emailId,
            packageType,
            dayPicnicTime,
            overNightRooms: overNightRooms?.value,
            overNightCrossCamp: overNightCrossCamp?.value,
            overNightTent: overNightTent?.value,
            overNightSkyRooms: overNightSkyRooms?.value,
            overNightDay: overNightDay?.value,
            numberOfPeople,
            typeOfCustomer,
            foodPreference,
            bookingDate,
            checkInDate,
            checkOutDate,
            advancePayment: advanceFinance,
            totalPayment: totalFinance
        }
        addCampFormMutation.mutate(user)
        console.log('user :>> ', user);

        navigate('/payment', {
            state: {
                data: { advanced: user?.advancePayment, total: user?.totalPayment }
            }
        });
    };

    // var z = onSubmit()
    // console.log('z :>> ', z);

    // function handleModalClose() {
    //     setModal({ open: false })
    // }

    // function handleCheckInChange(bookingDate) {
    //     if (bookingDate) {
    //         console.log(bookingDate);
    //         const [year, month, day] = bookingDate.split('-');
    //         const minDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day) + 1);            
    //         console.log(minDate.toISOString().split('T')[0]);
    //         setDate(minDate.toISOString().split('T')[0])
    //     }     
    // };

    return (
        <Wrapper>
            <div className='wrapper'>
                <h6 className='page-title'>Booking Form</h6>
                <form className='mt-4'>
                    <div className='d-flex flex-column w-100'>

                        <Row>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Form.Group controlId="options" >
                                    <label className='checkboxlabel'>
                                        Site Name<span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <div className='checkbox-row'>
                                        {checkboxSiteOptions.map(({ name, label, defaultValue }) => (
                                            <Controller
                                                key={name}
                                                name={name}
                                                control={control}
                                                // rules={rules.global()}
                                                defaultValue={defaultValue}
                                                render={({ field: { onChange, value } }) => (
                                                    <Form.Check
                                                        type="checkbox"
                                                        label={label}
                                                        checked={value}
                                                        onChange={(e) => onChange(e.target.checked)}
                                                        className='checkbox-col'
                                                    />
                                                )}
                                            />
                                        ))}
                                    </div>
                                    {/* {
                                        (errors.CampDilly && errors.CampUnity) && (
                                            <p className="errorMessage">
                                                'required'
                                            </p>
                                        )} */}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Controller
                                    name='customerName'
                                    control={control}
                                    rules={rules.global()}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input
                                            label={'Customer Name'}
                                            lableRequire
                                            type={'text'}
                                            value={value || ''}
                                            onChange={onChange}
                                            id={'customerName'}
                                            placeholder={'Enter Customer Name'}
                                            error={error?.message}
                                        />
                                    )}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Controller
                                    name='contactNumber'
                                    control={control}
                                    rules={rules.global()}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input
                                            label={'Customer Mobile'}
                                            lableRequire
                                            type={'text'}
                                            value={value || ''}
                                            onChange={onChange}
                                            id={'contactNumber'}
                                            placeholder={'Enter Customer Mobile'}
                                            error={error?.message}
                                            maxLength="10"
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Controller
                                    name='emailId'
                                    control={control}
                                    rules={rules.email()}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input
                                            label={'Customer Email'}
                                            lableRequire
                                            type={'emailId'}
                                            value={value || ''}
                                            onChange={onChange}
                                            id={'sCustomerEmail'}
                                            placeholder={'Enter Customer Mobile'}
                                            error={error?.message}
                                        />
                                    )}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Controller
                                    name='numberOfPeople'
                                    control={control}
                                    rules={rules.global()}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input
                                            label={'No. Of Guest'}
                                            lableRequire
                                            type={'number'}
                                            value={value || ''}
                                            onChange={onChange}
                                            id={'numberOfPeople'}
                                            placeholder={'Enter No. Of Guest*'}
                                            error={error?.message}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col xs={12} sm={12} md={12} lg={8}>
                                <Form.Label className='checkboxlabel'>
                                    Category Of Customer<span style={{ color: 'red' }}>*</span>
                                </Form.Label>
                                <div className='checkbox-row'>
                                    {typeOfCustomer.map((option) => (
                                        <div key={option.value}>
                                            <Controller
                                                name="typeOfCustomer"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: 'Please select an option' }}
                                                render={({ field: { onChange, value } }) => (
                                                    <>
                                                        <Form.Check
                                                            type="radio"
                                                            id={option.value}
                                                            label={option.label}
                                                            value={option.value}
                                                            onChange={(e) => onChange(e.target.value)}
                                                            checked={value === option.value}
                                                            className='checkbox-col'
                                                        />
                                                    </>
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {errors.typeOfCustomer && (
                                    <p className="errorMessage">
                                        {errors.typeOfCustomer.message}
                                    </p>
                                )}
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Form.Label className='checkboxlabel'>
                                    Food Preference<span style={{ color: 'red' }}>*</span>
                                </Form.Label>
                                <div className='checkbox-row'>
                                    {foodPreference.map((option) => (
                                        <div key={option.value}>
                                            <Controller
                                                name="foodPreference"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: 'Please select an option' }}
                                                render={({ field: { onChange, value } }) => (
                                                    <Form.Check
                                                        type="radio"
                                                        id={option.value}
                                                        label={option.label}
                                                        value={option.value}
                                                        onChange={(e) => onChange(e.target.value)}
                                                        checked={value === option.value}
                                                        className='checkbox-col'
                                                    />
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {errors.foodPreference && (
                                    <p className="errorMessage">
                                        {errors.foodPreference.message}
                                    </p>
                                )}
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col xs={12} sm={12} md={12} lg={6} style={{ marginTop: '5px' }}>
                                <Form.Label className='checkboxlabel'>
                                    Package Type<span style={{ color: 'red' }}>*</span>
                                </Form.Label>
                                <div className='checkbox-row'>
                                    {RadioOptions.map((option) => (
                                        <div key={option.value}>
                                            <Controller
                                                name="packageType"
                                                control={control}
                                                defaultValue=""
                                                rules={{ required: 'Please select an option' }}
                                                render={({ field: { onChange, value } }) => (
                                                    <Form.Check
                                                        type="radio"
                                                        id={option.value}
                                                        label={option.label}
                                                        value={option.value}
                                                        onChange={(e) => {
                                                            onChange(e.target.value)
                                                            setModal({ value: e.target.value })
                                                        }}
                                                        checked={value === option.value}
                                                        className='checkbox-col'
                                                    />
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {errors.packageType && (
                                    <p className="errorMessage">
                                        {errors.packageType.message}
                                    </p>
                                )}
                            </Col>
                        </Row>

                        {
                            (modal?.value === 'Day Picnic') &&
                            <Row className='mt-3'>
                                <Col xs={12} sm={12} md={12} lg={6}>
                                    <Form.Label className='checkboxlabel'>
                                        Day Picnic Package Opted
                                    </Form.Label>
                                    <div className='radio-row'>
                                        {dayPicnicPackage.map((option) => (
                                            <div key={option.value}>
                                                <Controller
                                                    name="dayPicnicTime"
                                                    control={control}
                                                    defaultValue=""
                                                    rules={{ required: 'Please select an option' }}
                                                    render={({ field: { onChange, value } }) => (
                                                        <Form.Check
                                                            type="radio"
                                                            id={option.value}
                                                            label={option.label}
                                                            value={option.value}
                                                            onChange={(e) => {
                                                                onChange(e.target.value)
                                                                setValue('overNightRooms', undefined)
                                                                setValue('overNightCrossCamp', undefined)
                                                                setValue('overNightTent', undefined)
                                                                setValue('overNightSkyRooms', undefined)
                                                                setValue('overNightDay', undefined)
                                                                // handleModalClose()
                                                            }}
                                                            checked={value === option.value}
                                                            className='radio-col'
                                                        />
                                                    )}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {errors.dayPicnicTime && (
                                        <p className="errorMessage">
                                            {errors.dayPicnicTime.message}
                                        </p>
                                    )}
                                </Col>
                            </Row>
                        }

                        {
                            (modal?.value === 'Over Night') &&
                            <div >
                                <Row className='mt-2'>
                                    <Col xs={12} sm={12} md={12} lg={6}>
                                        <Form.Label className='checkboxlabel'>
                                            Overnight Package (Room)
                                        </Form.Label>
                                        <Controller
                                            control={control}
                                            name="overNightRooms"
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    value={value}
                                                    onChange={(selectedOption) => {
                                                        setValue('dayPicnicTime', undefined);
                                                        onChange(selectedOption);
                                                    }}
                                                    options={OverNightRooms}
                                                    placeholder="Select an option"
                                                />
                                            )}
                                        />
                                    </Col>

                                    <Col xs={12} sm={12} md={12} lg={6}>
                                        <Form.Label className='checkboxlabel'>
                                            Overnight Package (Cross Camp)
                                        </Form.Label>
                                        <Controller
                                            control={control}
                                            name="overNightCrossCamp"
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    value={value}
                                                    onChange={(selectedOption) => {
                                                        setValue('dayPicnicTime', undefined);
                                                        onChange(selectedOption);
                                                    }}
                                                    options={overNightCrossCamp}
                                                    placeholder="Select an option"
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col xs={12} sm={12} md={12} lg={6}>
                                        <Form.Label className='checkboxlabel'>
                                            Overnight Package (Tent)
                                        </Form.Label>
                                        <Controller
                                            control={control}
                                            name="overNightTent"
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    value={value}
                                                    onChange={(selectedOption) => {
                                                        setValue('dayPicnicTime', undefined);
                                                        onChange(selectedOption);
                                                    }}
                                                    options={overNightTent}
                                                    placeholder="Select an option"
                                                />
                                            )}
                                        />
                                    </Col>

                                    <Col xs={12} sm={12} md={12} lg={6}>
                                        <Form.Label className='checkboxlabel'>
                                            Overnight Package (Sky Room)
                                        </Form.Label>
                                        <Controller
                                            control={control}
                                            name="overNightSkyRooms"
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    value={value}
                                                    onChange={(selectedOption) => {
                                                        setValue('dayPicnicTime', undefined);
                                                        onChange(selectedOption);
                                                    }}
                                                    options={overNightSkyRooms}
                                                    placeholder="Select an option"
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row>

                                {/* <Row className='mt-3'>
                                    <Col xs={12} sm={12} md={12} lg={6}>
                                        <Form.Label className='checkboxlabel'>
                                            Overnight Package (Day)
                                        </Form.Label>
                                        <Controller
                                            control={control}
                                            name="overNightDay"
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    value={value}
                                                    onChange={(selectedOption) => {
                                                        setValue('dayPicnicTime', undefined);
                                                        onChange(selectedOption);
                                                    }}
                                                    options={overNightDay}
                                                    placeholder="Select an option"
                                                />
                                            )}
                                        />
                                    </Col>
                                </Row> */}
                            </div>
                        }


                        <Row className='mt-3'>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Controller
                                    name='bookingDate'
                                    control={control}
                                    rules={rules.global()}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input
                                            label={'Booking Date'}
                                            lableRequire
                                            type={'date'}
                                            value={value || ''}
                                            onChange={(e) => {
                                                onChange(e.target.value)
                                                // handleCheckInChange(e.target.value)
                                                // setDate({ bookingDate: e.target.value })
                                            }}
                                            id={'bookingDate'}
                                            error={error?.message}
                                        />
                                    )}
                                />
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Controller
                                    name='checkInDate'
                                    control={control}
                                    rules={rules.global()}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input
                                            label={'Check In Date'}
                                            lableRequire
                                            type={'date'}
                                            value={value || ''}
                                            onChange={onChange}
                                            id={'checkInDate'}
                                            error={error?.message}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Controller
                                    name='checkOutDate'
                                    control={control}
                                    rules={rules.global()}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input
                                            label={'Check Out Date'}
                                            lableRequire
                                            type={'date'}
                                            value={value || ''}
                                            onChange={onChange}
                                            id={'checkOutDate'}
                                            error={error?.message}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>

                        {/* <Row className='mt-3'>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Controller
                                    name='advancePayment'
                                    control={control}
                                    rules={rules.global()}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input
                                            label={'Advance Payment'}
                                            lableRequire
                                            type={'number'}
                                            value={value || ''}
                                            onChange={onChange}
                                            id={'advancePayment'}
                                            error={error?.message}
                                        />
                                    )}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={6}>
                                <Controller
                                    name='totalPayment'
                                    control={control}
                                    rules={rules.global()}
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Input
                                            label={'Total Payment'}
                                            lableRequire
                                            type={'number'}
                                            value={value || ''}
                                            onChange={onChange}
                                            id={'totalPayment'}
                                            error={error?.message}
                                        />
                                    )}
                                />
                            </Col>
                        </Row> */}

                        {/* <CustomModal
                            open={modal?.open}
                            handleClose={handleModalClose}
                            title={(modal.value === 'dayPicnic') ? 'Day Picnic' : 'Over Night'}
                            size={(modal?.value === 'overNight') ? 'xl' : 'md'}
                        >
                            {
                                (modal?.value === 'dayPicnic') &&
                                <Row className='mt-3'>
                                    <Col xs={12} sm={12} md={12} lg={6}>
                                        <Form.Label className='checkboxlabel'>
                                            Day Picnic Package Opted
                                        </Form.Label>
                                        <div className='radio-row'>
                                            {dayPicnicPackage.map((option) => (
                                                <div key={option.value}>
                                                    <Controller
                                                        name="dayPicnicTime"
                                                        control={control}
                                                        defaultValue=""
                                                        rules={{ required: 'Please select an option' }}
                                                        render={({ field: { onChange, value } }) => (
                                                            <Form.Check
                                                                type="radio"
                                                                id={option.value}
                                                                label={option.label}
                                                                value={option.value}
                                                                onChange={(e) => {
                                                                    onChange(e.target.value)
                                                                    setValue('overNightRooms', undefined)
                                                                    setValue('overNightCrossCamp', undefined)
                                                                    setValue('overNightTent', undefined)
                                                                    setValue('overNightSkyRooms', undefined)
                                                                    setValue('overNightDay', undefined)
                                                                    // handleModalClose()
                                                                }}
                                                                checked={value === option.value}
                                                                className='radio-col'
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            }

                            {
                                (modal?.value === 'overNight') &&
                                <div >
                                    <Row className='mt-2'>
                                        <Col xs={12} sm={12} md={12} lg={6}>
                                            <Form.Label className='checkboxlabel'>
                                                Overnight Package (Room)
                                            </Form.Label>
                                            <Controller
                                                control={control}
                                                name="overNightRooms"
                                                render={({ field: { onChange, value } }) => (
                                                    <Select
                                                        value={value}
                                                        onChange={(selectedOption) => {
                                                            setValue('dayPicnicTime', undefined);
                                                            onChange(selectedOption);
                                                        }}
                                                        options={OverNightRooms}
                                                        placeholder="Select an option"
                                                    />
                                                )}
                                            />
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={6}>
                                            <Form.Label className='checkboxlabel'>
                                                Overnight Package (Cross Camp)
                                            </Form.Label>
                                            <Controller
                                                control={control}
                                                name="overNightCrossCamp"
                                                render={({ field: { onChange, value } }) => (
                                                    <Select
                                                        value={value}
                                                        onChange={(selectedOption) => {
                                                            setValue('dayPicnicTime', undefined);
                                                            onChange(selectedOption);
                                                        }}
                                                        options={overNightCrossCamp}
                                                        placeholder="Select an option"
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='mt-3'>
                                        <Col xs={12} sm={12} md={12} lg={6}>
                                            <Form.Label className='checkboxlabel'>
                                                Overnight Package (Tent)
                                            </Form.Label>
                                            <Controller
                                                control={control}
                                                name="overNightTent"
                                                render={({ field: { onChange, value } }) => (
                                                    <Select
                                                        value={value}
                                                        onChange={(selectedOption) => {
                                                            setValue('dayPicnicTime', undefined);
                                                            onChange(selectedOption);
                                                        }}
                                                        options={overNightTent}
                                                        placeholder="Select an option"
                                                    />
                                                )}
                                            />
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={6}>
                                            <Form.Label className='checkboxlabel'>
                                                Overnight Package (Sky Room)
                                            </Form.Label>
                                            <Controller
                                                control={control}
                                                name="overNightSkyRooms"
                                                render={({ field: { onChange, value } }) => (
                                                    <Select
                                                        value={value}
                                                        onChange={(selectedOption) => {
                                                            setValue('dayPicnicTime', undefined);
                                                            onChange(selectedOption);
                                                        }}
                                                        options={overNightSkyRooms}
                                                        placeholder="Select an option"
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className='mt-3'>
                                        <Col xs={12} sm={12} md={12} lg={6}>
                                            <Form.Label className='checkboxlabel'>
                                                Overnight Package (Day)
                                            </Form.Label>
                                            <Controller
                                                control={control}
                                                name="overNightDay"
                                                render={({ field: { onChange, value } }) => (
                                                    <Select
                                                        value={value}
                                                        onChange={(selectedOption) => {
                                                            setValue('dayPicnicTime', undefined);
                                                            onChange(selectedOption);
                                                        }}
                                                        options={overNightDay}
                                                        placeholder="Select an option"
                                                    />
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            }

                        </CustomModal> */}

                    </div>
                </form>
                <Form onSubmit={handleSubmit(onSubmit)}>




                    <div className="mt-3 d-flex justify-content-end">
                        <Button type="submit" className='submit'>Submit</Button>
                    </div>
                </Form>


            </div>

        </Wrapper>


    );
};

export default CampForm;





// import React, { useState } from 'react';
// import { Dropdown } from 'react-bootstrap';

// const CampForm = () => {
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleSelect = (eventKey) => {
//     setSelectedOption(eventKey);
//   };

//   return (
//     <Dropdown onSelect={handleSelect}>
//       <Dropdown.Toggle variant="primary" id="dropdown-basic">
//         Select an option
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item eventKey="option1">Option 1</Dropdown.Item>
//         <Dropdown.Item eventKey="option2">Option 2</Dropdown.Item>
//         <Dropdown.Item eventKey="option3">Option 3</Dropdown.Item>
//       </Dropdown.Menu>

//       {selectedOption && <p>Selected option: {selectedOption}</p>}
//     </Dropdown>
//   );
// };

// export default CampForm;



//  <Form.Group as={Row} controlId="hobbies">
        // <Form.Label column sm={2}>
        //   Hobbies:
        // </Form.Label>
//         <Col sm={10}>
//           <Form.Check
//             inline
//             type="checkbox"
//             id="hobby1"
//             value="hobby1"
//             label="Hobby 1"
//             {...register('hobbies')}
//           />
//           <Form.Check
//             inline
//             type="checkbox"
//             id="hobby2"
//             value="hobby2"
//             label="Hobby 2"
//             {...register('hobbies')}
//           />
//         </Col>
//       </Form.Group>





//  <Row>
//                             <Col xs={12} sm={12} md={12} lg={6}>
//                                 <Form.Label className='checkboxlabel'>
//                                     Site Name*
//                                 </Form.Label>
//                                 <Controller
//                                     name='cSiteName'
//                                     control={control}
//                                     rules={rules.global()}
//                                     defaultValue={[]}
//                                     render={({ field: { onChange, value }, fieldState: { error } }) => (
//                                         <div className="checkbox-row">
//                                             {SiteOption.map((option) => (
//                                                 <div className="checkbox-col" key={option.value}>
//                                                     <Form.Check
//                                                         type="checkbox"
//                                                         id={option.value}
//                                                         label={option.label}
//                                                         value={option.value}
//                                                         isInvalid={!!error}
//                                                         onChange={(e) => {
//                                                             const { value, checked } = e.target;
//                                                             const selectedOptions = new Set(value);

//                                                             if (checked) {
//                                                                 selectedOptions.add(value);
//                                                             } else {
//                                                                 selectedOptions.delete(value);
//                                                             }

//                                                             onChange([...selectedOptions]);
//                                                         }}
//                                                         checked={value.includes(option.value)}
//                                                     />
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     )}
//                                 />

//                             </Col>
//                         </Row>
//                          <Row>
//                             {SiteOption.map((option) => (
//                                 <div className="col" key={option.value}>
//                                     <Controller
//                                         name="cSiteName"
//                                         control={control}
//                                         defaultValue={[]}
//                                         render={({ field: { onChange, value }, fieldState: { error } }) => (
//                                             <Form.Check
//                                                 type="checkbox"
//                                                 id={option.value}
//                                                 label={option.label}
//                                                 value={option.value}
//                                                 isInvalid={!!error}
//                                                 onChange={(e) => {
//                                                     const { value, checked } = e.target;
//                                                     const selectedOptions = new Set(value);
//                                                     console.log('selectedOptions :>> ', selectedOptions)
//                                                     if (checked) {
//                                                         selectedOptions.add(value);
//                                                     } else {
//                                                         selectedOptions.delete(value);
//                                                     }

//                                                     onChange([...selectedOptions]);
//                                                 }}
//                                                 checked={value.includes(option.value)}
//                                             />
//                                         )}
//                                     />
//                                 </div>
//                             ))}
//                         </Row>

//                          <Row>
//                             <Form.Group controlId="options">
//                                 <Controller
//                                     name="option1"
//                                     control={control}
//                                     render={({ field: { onChange, value }, fieldState: { error } }) => (
//                                         <Form.Check
//                                             type="checkbox"
//                                             id="option1"
//                                             label="Option 1"
//                                             onChange={(e) => onChange(e.target.checked)}
//                                             checked={value || ''}
//                                             isInvalid={!error}
//                                         />
//                                     )}
//                                 />
//                                 <Controller
//                                     name="option2"
//                                     control={control}
//                                     defaultValue={false}
//                                     render={({ field }) => (
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Option 2"
//                                             checked={field.value}
//                                             onChange={(e) => field.onChange(e.target.checked)}
//                                         />
//                                     )}
//                                 />
//                                 <Controller
//                                     name="option3"
//                                     control={control}
//                                     defaultValue={false}
//                                     render={({ field }) => (
//                                         <Form.Check
//                                             type="checkbox"
//                                             label="Option 3"
//                                             checked={field.value}
//                                             onChange={(e) => field.onChange(e.target.checked)}
//                                         />
//                                     )}
//                                 />
//                             </Form.Group>

//                         </Row> 