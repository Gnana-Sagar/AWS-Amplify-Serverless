import * as React from 'react';
import { Auth } from 'aws-amplify';
import _ from 'lodash';
import UserModel from './users/UserModel';
import { Col, Form, Input, Row, Button, Typography, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function SignIn(props) {

  const [action, setAction] = React.useState('login');
  const [currentUser, setCurrentUser] = React.useState('');
  const [givenName, setGivenName] = React.useState('');



  const loginUser = (values) => {
    Auth.signIn(values.email, values.password).then((res) => {
      if (_.isEqual(res.challengeName, 'NEW_PASSWORD_REQUIRED')) {
        setGivenName(res.challengeParam.userAttributes.name);
        setCurrentUser(res);
        setAction('reset');
      } else {
        UserModel.roles = res.signInUserSession.accessToken.payload["cognito:groups"];
        UserModel.userName = res.attributes.name;
        UserModel.email = res.attributes.email;
        message.success('Welcome ' + UserModel.userName)
        props.switchComponent('welcome');
      }
    }, () => {
      message.error('Invalid Username & Password');
    });
  };

  const resetPassword = (values) => {
    Auth.completeNewPassword(currentUser, values.password, { 'name': givenName }).then(res => {
      UserModel.roles = res.signInUserSession.accessToken.payload["cognito:groups"];
      UserModel.email = res.challengeParam.userAttributes.email;
      UserModel.userName = res.challengeParam.userAttributes.name;
      props.switchComponent('welcome')
    }, err => {
      message.error('Unable to reset password');
    })
  }
  return (
    <div style={{ background: '#f0f2f5', height: '100vh', paddingTop: '10%' }}>
      <Row justify="center" >
        <Col style={{ background: 'white' }} md={7} sm={18} xs={24}>
          {
            action === 'login' &&

            <div style={{ margin: '5%' }}>
              <div style={{ backgroundColor: '#fff', textAlign: 'center' }}>
                
                <br />
              </div>
              <Form
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={loginUser}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your username!' }, { type: 'email', message: 'Please enter valid emailId' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                  <br /><br />
                  <Button type='link' block onClick={() => props.switchComponent('forgot')}>
                    Forgot Password ?
                  </Button>
                </Form.Item>
              </Form>
            </div>
          }
          {
            action === 'reset' &&
            < div style={{ margin: '5%' }}>
              <br />
              <div style={{ backgroundColor: '#fff', textAlign: 'center' }}>
                <Typography.Title level={3}>Reset Password</Typography.Title>
                <br />
              </div>
              <Form
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={resetPassword}
                autoComplete="off"
              >
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please enter password' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
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
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Reset Password
                  </Button>
                  <br /><br />
                  <Button type='link' block onClick={() => setAction('login')} icon={<ArrowLeftOutlined />}>
                    Back To Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          }
        </Col>
      </Row>
    </div >
  );
}