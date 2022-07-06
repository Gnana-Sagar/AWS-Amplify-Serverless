import React, { useState } from 'react';
import { Form, Button, Row, Col, Input, InputNumber, message } from 'antd';
import { Auth } from 'aws-amplify';
import _ from 'lodash';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ForgotPassword = (props) => {

    const [form] = Form.useForm();
    const [action, setAction] = useState('email_pin');

    const updatePassword = (values) => {
        Auth.forgotPasswordSubmit(values.email, values.pinCode + '', values.password).then((data) => {
            props.switchComponent('login');
        }, (err) => {

        })
    }

    const sendEmail = () => {
        console.log(form.getFieldValue('email').toString());
        Auth.forgotPassword(form.getFieldValue('email'))
            .then(data => { setAction('email_pin'); message.success('Verification code sent') })
            .catch(err => { message.error('Unable to send verification code') });
    }

    return (
        <div style={{ background: '#f0f2f5', height: '100vh', paddingTop: '10%' }}>
            <Row justify="center" >
                <Col style={{ background: 'white', minWidth: '350px' }} md={8} sm={18} xs={22}>
                    <div style={{ margin: '5%' }}>
                        <div style={{ backgroundColor: '#fff', textAlign: 'center' }}>
                            <h5>Logo</h5>
                            <br />
                        </div>
                        <Form
                            form={form}
                            name="basic"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={updatePassword}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your username!' }, { type: 'email', message: 'Please enter valid emailId' }]}
                            >
                                <Input size='large' placeholder='Email' />
                            </Form.Item>
                            {
                                action === 'email_pin' && <>
                                    <Form.Item
                                        label="Verification Code"
                                        name="pinCode"
                                        rules={[{ required: true, message: 'Enter verification code sent to your email' }]}
                                    >
                                        <InputNumber size='large' placeholder='Verification Code' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password size='large' placeholder='Password' />
                                    </Form.Item>

                                    <Form.Item
                                        label="Re-Type Password"
                                        name="confirmPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password size='large' placeholder='Confirm Password' />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" block size='large'>
                                            Submit
                                        </Button>
                                        <br /><br />
                                        <Button type='link' block onClick={() => props.switchComponent('forgot')}>
                                            Forgot Password ?
                                        </Button>
                                    </Form.Item>
                                </>
                            }
                            {
                                action != 'email_pin' && <>
                                    <Form.Item>
                                        <Button block type='primary' htmlType='button' onClick={() => sendEmail()}>Send Verification Code</Button>
                                    </Form.Item>
                                </>
                            }
                        </Form>
                        <Button block type='link' icon={<ArrowLeftOutlined />} onClick={() => props.switchComponent('login')}>Back To Login</Button>
                    </div>
                </Col>
            </Row>
        </div >
    );
}
export default ForgotPassword;