import React,{ useEffect, useState } from 'react';
import { updateSpecificationsApi, getAllApi, deleteSpecificationsApi, createSpecificationsApi } from './api/SpecificationsApi';
import { Storage } from 'aws-amplify';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Table, Row, Col, Card, Button, Space, Form, Modal, Input, Upload ,Popconfirm, message} from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import awsmobile from "./../aws-exports";

const Specifications = () => {

    const [rows, setRows] = useState([]);

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
                    <Button type='warning' icon={<EditOutlined />} onClick={() => editSpecification(record)} />
                    <Popconfirm
                        title="Are you sure to delete this ?"
                        onConfirm={() => deleteSpecification(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='danger' icon={<DeleteOutlined />} /> 
                    </Popconfirm>
                   
                </Space>
            ),
        }

    ];

    const [id, setId] = useState('');
    const [model, setModel] = useState(false);
    const [form] = Form.useForm();
    const [fileToDelete, setFileToDelete] = useState('');
    const [fileToUpload, setFileToUpload] = useState('');
    const [s3Url, setS3Url] = useState('');

    useEffect(() => {
        var isMounted = true;
        if (isMounted) {
            getAllSpecifications();
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
            setFileToUpload(file);
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

   const getAllSpecifications = () => {
        getAllApi().then((success) => {
            setRows(success.data.listSpecifications.items);
        }, (err) => {

        });
    }

    const editSpecification = (values) => {
        form.setFieldsValue(values);
        setFileToDelete(values.img);
        setId(values.id);
        setModel(true);
    }

    const createSpecification = (values) => {
        if (!_.isEmpty(id)) {
            updateSpecification(values);
            return;
        }
        const uuid = uuidv4();
        let fileName = 'property_images/specifications/' + uuid + '_' + fileToUpload.name.replace(/[^a-zA-Z0-9.]/g, '_');
        let type = fileToUpload.name.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
        Storage.put(fileName,  fileToUpload, {contentType: type}).then((res) => {
            const input = {
                name: values.name,
                img: res.key
            }

            createSpecificationsApi(input).then((result) => {
                if (result.data.createSpecifications) {
                    message.success('Specifications created successfully');
                    getAllSpecifications();
                    closeModel();
                   
                }
            }, (err) => {
                message.error('Unable to create Specifications');
            });
        }, (err) => {
            message.error('Unable to upload image');
        });
    }

    const deleteSpecification = (values) => {
        
        deleteFromS3({ id: values.id });
        deleteSpecificationsApi({id: values.id}).then((result) => {
            if (result.data.deleteSpecifications) {
                message.success('Specifications deleted successfully');
                closeModel();
                getAllSpecifications();
             }
        }, (err) => {
            message.error('Unable to delete Specifications');
        })
    }

    const updateSpecification = (values) => {

        if (!_.isEmpty(values.img.fileList)) {
            deleteFromS3(fileToDelete);
        }

        if (_.isEmpty(values.img.fileList)) {
            const input = {
                id: id,
                name: values.name,
                img: values.img
            }
            updateSpecification1(input);
            return;
        }
        const file = fileToUpload;
        const uuid = uuidv4();
        let fileName = 'property_images/specifications/' + uuid + '_' + file.name.replace(/[^a-zA-Z0-9]/g, '_');
        let type = file.name.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
        Storage.put(fileName, file, { contentType: type }).then((res) => {
            const input = {
                id: id,
                name: values.name,
                img: res.key
            }
            updateSpecification1(input);
        }).catch(err => {
            message.error('Unable to upload the image');
        })
    }

    const  updateSpecification1 = (data) => {
        updateSpecificationsApi(data).then((success) => {
            if (success.data.updateSpecifications) {
                message.success('Specifications is updated successfully');
                closeModel();
                getAllSpecifications();
                setId('');
            }
        }, (err) => {
            message.error('Unable to update specifications');
        });
    }

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24} style={{width: '100%'}}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Specifications"
                        extra={
                            <>
                                <Button type='primary' onClick={() => openModel()}>Create</Button>
                            </>
                        }
                    >
                        <Table columns={columns} dataSource={rows}
                            pagination={true} size='small'
                            className="ant-border-space" />

                        <Modal title="Specifications" visible={model} okButtonProps={{ htmlType: 'submit', form: 'specificationsForm' }}
                            onCancel={closeModel}>
                            <Form
                                form={form}
                                destroyOnClose
                                id="specificationsForm"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={createSpecification}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please enter Specification name' }]}
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

export default Specifications;
