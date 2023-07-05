import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Input from '../../components/Input'
import Wrapper from '../../components/Wrapper'
import { useLocation, useNavigate } from 'react-router-dom'

function Payment() {
    const navigate = useNavigate()
    const location = useLocation();
    const { data } = location?.state;

    function handleRedirect() {
        navigate('/')
    }
    return (
        <Wrapper>
            <Row className='mt-3'>

                <Col xs={12} sm={12} md={12} lg={6}>
                    <Input
                        label={'Total Payment'}
                        type={'text'}
                        value={data?.total}
                        id={'totalPayment'}
                        disabled
                    />
                </Col>

                <Col xs={12} sm={12} md={12} lg={6}>
                    <Input
                        label={'Advance Payment'}
                        type={'text'}
                        value={data?.advanced}
                        disabled
                    />
                </Col>

            </Row>
            <div className="mt-3 d-flex justify-content-end">
                <Button className='submit' onClick={handleRedirect}>OK</Button>
            </div>
        </Wrapper>
    )
}

export default Payment