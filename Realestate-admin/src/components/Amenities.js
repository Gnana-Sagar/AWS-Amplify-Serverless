import React,{useEffect,useState} from 'react';
import { updateAmenitiesApi, getAllAmenitiesApi, deleteAmenitiesApi, createAmenitiesApi } from './api/AmenitiesApi';
import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { Table, Row, Col, Card, Button, Space, Form, Modal, Input, Upload, Popconfirm,message } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import _ from 'lodash';
import awsmobile from "./../aws-exports";
const Amenities = () => {

    const [rows, setRows] = useState([]);

    const columns = [
        { dataIndex: 'name', title: 'Name' },
        {
            dataIndex: 'img', title: 'Image', render: (text, record) => {
                return (<a  href={`https://${s3Url}.s3.amazonaws.com/public/${text}`} rel="noopener noreferrer" >{text.split('/')[2]}</a>)
            }
        },
        { dataIndex: 'updatedAt', title: 'UpdatedAt',responsive: ['md'] },
        { dataIndex: 'createdAt', title: 'CreatedAt',responsive: ['md'] },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='warning' icon={<EditOutlined />} onClick={() => editAmenities(record)} />
                    <Popconfirm
                        title="Are you sure to delete this ?"
                        onConfirm={() => deleteAmenities(record)}
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
            getAllAmenities();
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
            .then(result => { }).catch(err => { });
    }

    const openModel = () => {
        setModel(true);
    }

    const closeModel =() => {
        setModel(false);
        form.resetFields();
    }

    const getAllAmenities = () => {
        getAllAmenitiesApi().then((success) => {
            setRows(success.data.listAmenities.items);
        }, (err) => {

        });
    }

    const editAmenities = (values) => {
        form.setFieldsValue(values);
        setFileToDelete(values.img);
        setId(values.id);
        setModel(true);
    }

    const createAmenities = (values) => {
        if (!_.isEmpty(id)) {
            updateAmenities(values);
            return;
        }
        const uuid = uuidv4();
        let fileName = 'property_images/amenities/'+uuid + '_' + fileToUpload.name.replace(/[^a-zA-Z0-9.]/g, '_');
        let type = fileToUpload.name.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
        Storage.put(fileName, fileToUpload, {contentType: type}).then((res) => {
            const input = {
                name: values.name,
                img: res.key
            }
            createAmenitiesApi(input).then((result) => {
                if (result.data.createAmenities) {
                    message.success('Amenities created successfully');
                    getAllAmenities();
                    closeModel();
                }
            }, (err) => {
                message.error('Unable to create Amenities');
            })
        }).catch(err => {
            message.error('Unable to upload image');
        })
    }

    const deleteAmenities = (values) => {
        deleteFromS3({ id: values.id });
        deleteAmenitiesApi({ id: values.id }).then((result) => {
            if (result.data.deleteAmenities) {
                message.success('Amenities deleted successfully');
                closeModel();
                getAllAmenities();
            }
        }, (err) => {
            message.error('Unable to delete Amenities');
        })
    }

    const updateAmenities = (values) => {

        if (!_.isEmpty(values.img.fileList)) {
            deleteFromS3(fileToDelete);
        }

        if (_.isEmpty(values.img.fileList)) {
            const input = {
                id: id,
                name: values.name,
                img: values.img
            }
            updateAmenities1(input);
            return;
        }

        const file = fileToUpload;
        const uuid = uuidv4();

        let fileName = 'property_images/amenities/'+uuid + '_' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
        let type = file.name.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
        Storage.put(fileName, file, {contentType: type}).then((res) => {
            const input = {
                id: id,
                name: values.name,
                img: res.key
            }
            updateAmenities1(input);
            
        }).catch(err => {
            message.error('Unable to upload the image');
        });
    }

    const updateAmenities1 = (data) => {
        updateAmenitiesApi(data).then((success) => {
            if (success.data.updateAmenities) {
                message.success('Amenities is updated successfully');
                closeModel();
                getAllAmenities();
                setId('');
            }

        }, (err) => {
            message.error('Unable to update amenities');
        })
    }

   
    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24} style={{width: '100%'}}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Amenities"
                        extra={
                            <>
                                <Button type='primary' onClick={() => openModel()}>Create</Button>
                            </>
                        }
                    >
                        <Table columns={columns} dataSource={rows}
                            pagination={true} size='small'
                            className="ant-border-space" />

                        <Modal title="Amenities" visible={model} okButtonProps={{ htmlType: 'submit', form: 'amenitiesForm' }}
                            onCancel={closeModel}>
                            <Form
                                form={form}
                                destroyOnClose
                                id="amenitiesForm"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={createAmenities}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please enter Amenities name' }]}
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
export default Amenities;