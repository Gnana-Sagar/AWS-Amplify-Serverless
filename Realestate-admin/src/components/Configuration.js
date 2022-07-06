import React, { useEffect, useState } from 'react';
import { updateConfigurationApi, getAllConfigurationApi, deleteConfigurationsApi, createConfigurationsApi } from './api/ConfigurationsApi';
import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { Table, Row, Col, Card, Button, Space, Form, Modal, Input, Upload, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { publishImage } from './api/StorageApi';
import awsmobile from "./../aws-exports";
const Configurations = () => {

    const [rows, setRows] = React.useState([]);
    const columns = [
        { dataIndex: 'name', title: 'Name' },
        {
            dataIndex: 'img', title: 'Image', render: (text, record) => {
                return (<a  href={`https://${s3Url}.s3.amazonaws.com/public/${text}`} rel="noopener noreferrer" >{text.split('/')[2]}</a>)
            }
        },
        { dataIndex: 'updatedAt', title: 'UpdatedAt',responsive: ['md']  },
        { dataIndex: 'createdAt', title: 'CreatedAt',responsive: ['md']  },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='warning' icon={<EditOutlined />} onClick={() => editConfiguration(record)} />
                    <Popconfirm
                        title="Are you sure to delete this ?"
                        onConfirm={() => deleteConfiguration(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='danger' icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        }
    ];
    const [id, setId] = React.useState('');
    const [model, setModel] = React.useState(false);
    const [form] = Form.useForm();
    const [fileToDelete, setFileToDelete] = React.useState('');
    const [fileToUpload, setFileToUpload] = useState('');
    const [s3Url, setS3Url] = useState('');

    useEffect(() => {
        var isMounted = true;
        if (isMounted) {
            getAllConfigurations();
            s3BucketName();
        }
        return () => {
            isMounted = false;
        }
    }, []);

    const s3BucketName = () => {
        setS3Url(awsmobile.aws_user_files_s3_bucket);
    }


    const image = {
        customRequest({
            action,
            data,
            file,
            filename,
            headers,
            onError,
            onProgress,
            onSuccess,
            withCredentials
        }) {
            fileToUpload(file);
            onSuccess()
        },
        onRemove(e) {
            deleteFromS3(e.response);
        }
    }

    const deleteFromS3 = (value) => {
        Storage.remove(value)
            .then((result) => { }).catch((err) => { });
    }

    const openModel = () => {
        setModel(true);
    }

    const closeModel = () => {
        setModel(false);
        form.resetFields();
    }

    const getAllConfigurations = () => {
        getAllConfigurationApi().then((success) => {
            setRows(success.data.listConfigurations.items);
        }, (err) => {

        });
    }

    const editConfiguration = (values) => {
        form.setFieldsValue(values);
        setFileToDelete(values.img);
        setId(values.id);
        setModel(true);
    }

    const createConfiguration = (values) => {
        if (!_.isEmpty(id)) {
            updateConfiguration(values);
            return;
        }
        const uuid = uuidv4();
        let fileName = 'property_images/configurations/' + uuid + '_' + fileToUpload.name.replace(/[^a-zA-Z0-9.]/g, '_');
        let type = fileToUpload.name.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
        Storage.put(fileName, fileToUpload, { contentType: type }).then((res) => {
            const input = {
                name: values.name,
                img: res.key
            }
            createConfigurationsApi(input).then((result) => {
                if (result.data.createConfigurations) {
                    message.success('Configuration created successfully');
                    getAllConfigurations();
                    closeModel();
                }
            }, (err) => {
                message.error('Unable to create configuration');
            });
        }).catch(err => {
            message.error('Unable to upload image');
        })
    }

    const deleteConfiguration = (values) => {
        this.deleteFromS3({ id: values.img });
        deleteConfigurationsApi({ id: values.id }).then((result) => {
            if (result.data.deleteConfigurations) {
                message.success('Configuration deleted successfully');
                closeModel();
                getAllConfigurations();
            }
        }, (err) => {
            message.error('Unable to delete the configuration');
        })
    }

    const updateConfiguration = (values) => {

        if (!_.isEmpty(values.img.fileList)) {
            deleteFromS3(fileToDelete);
        }

        if (_.isEmpty(values.img.fileList)) {
            const input = {
                id: id,
                name: values.name,
                img: values.img
            }
            updateConfiguration1(input);
            return;
        }

        const file = fileToUpload;
        const uuid = uuidv4();
        let fileName = 'property_images/configurations/' + uuid + '_' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        let type = fileToUpload.name.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
        Storage.put(fileName, file, { contentType: type }).then((res) => {
            const input = {
                id: id,
                name: values.name,
                img: res.key
            }
            updateConfiguration1(input);
        }, (err) => {
            message.error('Unable to upload the image');
        });
    }
    const updateConfiguration1 = (data) => {
        updateConfigurationApi(data).then((success) => {
            if (success.data.updateConfigurations) {
                message.success('Configuration is updated successfully');
                closeModel();
                getAllConfigurations();
                setId('');
            }
        }, (err) => {
            message.error('Unable to update configuration');
        })
    }


    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24} style={{width: '100%'}}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Configurations"
                        extra={
                            <>
                                <Button type='primary' onClick={() => openModel()}>Create</Button>
                            </>
                        }
                    >
                        <Table columns={columns} dataSource={rows}
                            pagination={true} size='small'
                            className="ant-border-space" />

                        <Modal title="Configurations" visible={model} okButtonProps={{ htmlType: 'submit', form: 'configurationsForm' }}
                            onCancel={closeModel}>
                            <Form
                                form={form}
                                destroyOnClose
                                id="configurationsForm"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={createConfiguration}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please enter configuration name' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Image"
                                    name="img"
                                    rules={[{ required: true, message: 'Please select image' }]}
                                >
                                    <Upload {...image} maxCount={1} accept='image/*' >
                                        <Button block icon={<UploadOutlined />}>Click to Upload</Button>
                                    </Upload>
                                    {/* <p>{form.getFieldValue('img')}</p> */}
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Configurations;