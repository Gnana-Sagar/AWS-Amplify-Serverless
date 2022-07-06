import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import { Row, Card, Col, Table, Form, Modal, Button, Input, Select, Space, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Users = () => {
    var params = {
        UserPoolId: "ap-south-1_VUqMBMZ6V"
    };

    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ region: 'ap-south-1', secretAccessKey: '', accessKeyId: '' });
    
    const columns = [
        { dataIndex: 'email', title: 'Email' },
        { dataIndex: 'given_name', title: 'Display Name' },
        { dataIndex: 'status', title: 'Status',responsive: ['md']  },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete this ?"
                        onConfirm={() => deleteUser(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='danger' icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ]
    const [rows, setRows] = useState([{
        email: '',
        status: '',
        enabled: '',
        id: ''
    }]);
    const [userModal, setUserModal] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const openModel = () => {
        setUserModal(true);
    }

    const closeModel = () => {
        setUserModal(false);
    }

    const getUsers = () => {
        // console.log("sample");
        cognitoIdentityServiceProvider.listUsers({ UserPoolId: params.UserPoolId }, (err, data) => {
            if (err) {

            } else {
                let temp = [];
                data.Users.forEach((item, index) => {
                    var temp1 = '';
                    let displayName = '';
                    item.Attributes.forEach((item1, index1) => {
                        if (item1.Name === 'email') {
                            temp1 = item1.Value;
                        }
                        if (item1.Name === 'name') {
                            displayName = item1.Value;
                        }
                    })
                    temp.push({ id: item.Username, 'status': item.UserStatus, 'enabled': item.Enabled, 'email': temp1, 'given_name': displayName })
                })
                setRows(temp);
            }
        })
    }

    const createUser = values => {
        const input = {
            'UserPoolId': params.UserPoolId,
            'Username': values.email,
            "DesiredDeliveryMediums": [
                "EMAIL"
            ],
            "ForceAliasCreation": false,
            "UserAttributes": [
                {
                    "Name": "email",
                    "Value": values.email
                }, {
                    "Name": "name",
                    "Value": values.userName
                }, {
                    Name: 'email_verified',
                    Value: 'true'
                }]
        };
        cognitoIdentityServiceProvider.adminCreateUser(input, (err, data) => {
            if (err) {
                message.error('Unable to add this user please try again')
            } else {
                cognitoIdentityServiceProvider.adminAddUserToGroup({
                    'GroupName': values.role,
                    'UserPoolId': params.UserPoolId,
                    'Username': values.email
                }, (err, data) => {
                    message.success('User Created Successfully');
                })
                getUsers();
                closeModel();
            }
        });
    }

    const deleteUser = (record) => {
            const input = {
                UserPoolId: params.UserPoolId,
                Username: record.id,
            }
            cognitoIdentityServiceProvider.adminDeleteUser(input, (err, data) => {
                if (err) {
                    message.error('Unable to delete the user');
                } else {
                    message.success('User deleted successfully');
                    getUsers();
                }
            })
    }


    return (

        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Users"
                        extra={
                            <>
                                <Button type='primary' onClick={() => openModel()}>Create</Button>
                            </>
                        }
                    >
                        <Table columns={columns} dataSource={rows}
                            pagination={true} size='small'
                            className="ant-border-space" />

                        <Modal title="Users" visible={userModal} okButtonProps={{ htmlType: 'submit', form: 'userForm', name: 'Save' }}
                            onCancel={closeModel}>
                            <Form
                                destroyOnClose
                                id="userForm"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={createUser}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please enter email' },
                                    { type: 'email', message: 'Please enter valid email id' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Display Name"
                                    name="userName"
                                    rules={[{ required: true, message: 'Please enter display name' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please enter display name' }]}
                                >
                                    <Select placeholder="Role">
                                        <Select.Option value="Admin">Admin</Select.Option>
                                        <Select.Option value="Editor">Editor</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Users;
