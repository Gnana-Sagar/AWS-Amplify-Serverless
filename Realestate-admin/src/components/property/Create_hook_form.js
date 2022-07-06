import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Select,
    Row,
    Col,
    Button, InputNumber,
    Upload, Card,
    Divider,
    message
} from 'antd';
import awsmobile from "../../aws-exports";
import { MinusCircleOutlined, PlusOutlined, InboxOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { getAllConfigurationApi } from './../api/ConfigurationsApi';
import { getAllApi } from './../api/SpecificationsApi';
import { getAllAmenitiesApi } from './../api/AmenitiesApi';
import _ from 'lodash';
import { useParams, NavLink } from 'react-router-dom';
import { createPropertyApi, getPropertyApi, updatePropertyApi } from './../api/PropertyApi';
import { v4 as uuidv4 } from 'uuid';
import { Editor } from '@jeremyling/react-material-ui-rich-text-editor';
import { publishImage, deleteImage } from './../api/StorageApi'

const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 24
    }
};


const CreateHookForm = () => {

    const[s3Id,setS3Id] = useState('');
    const [allConfigs, setAllConfigs] = useState([]);
    const [allSpec, setAllSpec] = useState([]);
    const [allAmenities, setAllAmenities] = useState([]);
    const [form] = Form.useForm();
    const [aboutProperty, setAboutProperty] = useState('');
    const [propertyImages, setPropertyImages] = useState([]);
    const [masterImg, setMasterImg] = useState([]);
    const [broucherPdf, setBroucherPdf] = useState([]);
    const [floorPlan, setFloorPlan] = useState([]);
    const [offersImg, setOffersImg] = useState([]);
    const params = useParams();
    const [s3Url, setS3Url] = useState('');

    const onFinish = (values) => {
        values['about'] = aboutProperty;
        values['propertyImg'] = _.map(propertyImages, (data) => {
            return data.name;
        })
        values['masterPlanImg'] = _.map(masterImg, (data) => {
            return data.name;
        })

        values['floorPlan'] = _.map(floorPlan, (data) => {
            return data.name;
        })

        if(offersImg.length !== 0){
            values['broucher'] = broucherPdf[0].name;
        }
        // _.map(broucherPdf, (data) => {
        //     return data.name;
        // })
        if(offersImg.length !== 0){
            values['offersImg'] = offersImg[0].name;
        }
        delete values.promotionalImg;
        const { id } = params;
        values['s3Uuid']= s3Id;
        if(values.propertyImg.length === 0) {
            message.error('Please select atleast one property image');
            return true;
        }
        if(!_.isEmpty(id)) {
            values['id'] = id;
            updateProperty(values)
        }else{
            createProperty(values);
        }
    }

    const createProperty = (values) => {
        createPropertyApi(values).then((res) => {
            message.success('Property created successfully');
        }, (err) => {
            message.error('Property creation failed reason' + err.errors[0].message);
        });
    }

    const updateProperty = (values) => {
        updatePropertyApi(values).then(() => {
            message.success('Property updated successfully');
        }, (err) => {
            message.error('Property updated successfully'+err.errors[0].message);

        })
    }


    const propertyImageProps = {
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
            let fileName = 'property_images/' + s3Id + '/property_images/' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            let type = fileName.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
            publishImage(fileName, file, { contentType: type }).then((res) => {
                if (res.key) {
                    setPropertyImages(_.union(propertyImages, [{
                        id: propertyImages.length + 1,
                        status: 'done',
                        name: res.key,
                        url: `https://${awsmobile.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${res.key}`
                    }]))
                    onSuccess(res.key, file)
                }
            }, (err) => {
                onError(err);
            })
        },
        onRemove(e) {
            deletePropertyImage(e.name);
            let temp = _.filter(propertyImages, (data) => { return !(_.isEqual(data.name,e.name))});
            setPropertyImages(temp);
        }
    }

    const masterImageProps = {
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
            let fileName = 'property_images/' + s3Id + '/master_images/' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            let type = fileName.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
            publishImage(fileName, file, { contentType: type }).then((res) => {
                setMasterImg(_.union(masterImg, [{
                    id: masterImg.length + 1,
                    status: 'done',
                    name: res.key,
                    url: `https://${awsmobile.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${res.key}`
                }]))
                onSuccess(res.key)
            }, (err) => {
                onError(err);
            })
        },
        onRemove(e) {
            deletePropertyImage(e.name);
            let temp = _.filter(masterImg, (data) => { return !(_.isEqual(data.name,e.name))});
            setMasterImg(temp);
        }
    }
    const floorPlanProps = {
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
            let fileName = 'property_images/' + s3Id + '/floor_plan/' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            let type = fileName.endsWith('svg') ? 'image/svg+xml' : 'application/octet-stream'
            publishImage(fileName, file, { contentType: type }).then((res) => {
                setFloorPlan(_.union(floorPlan, [{
                    id: floorPlan.length + 1,
                    status: 'done',
                    name: res.key,
                    url: `https://${awsmobile.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${res.key}`
                }]))
                onSuccess(res.key)
            }, (err) => {
                onError(err);
            })
        },
        onRemove(e) {
            deletePropertyImage(e.name);
            let temp = _.filter(floorPlan, (data) => { return !(_.isEqual(data.name,e.name))});
            setFloorPlan(temp);
        }
    }
    const broucher = {
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
            let fileName = 'property_images/' + s3Id + '/broucher/' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            publishImage(fileName, file, { contentType: 'application/pdf' }).then((res) => {
                setBroucherPdf([{
                    id: 1,
                    status: 'done',
                    name: res.key,
                    url: `https://${awsmobile.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${res.key}`
                }])
                onSuccess(res.key);
            }, (err) => {
                onError(err);
            })
        },
        onRemove(e) {
            deletePropertyImage(e.name);
            setBroucherPdf([]);
        }
    }
    const promotionalImage = {
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
            let fileName = 'property_images/' + s3Id + '/promotional_img/' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            publishImage(fileName, file, { contentType: file.type }).then((res) => {
                setOffersImg([{
                    id: 1,
                    status: 'done',
                    name: res.key,
                    url: `https://${awsmobile.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${res.key}`
                }])
                onSuccess(res.key)
            }, (err) => {
                onError(err);
            })
        },
        onRemove(e) {
            deletePropertyImage(e.name);
            setOffersImg([]);
        }
    }

    const normalFile = (e) => {
        console.log(e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    }

    const deletePropertyImage = (index) => {
        deleteImage(index).then(() => {
        }, () => {
        });
    }

    const getConfigurations = () => {
        getAllConfigurationApi().then((res) => {
            let temp = res.data.listConfigurations.items;
            let resArray = [];
            temp.forEach(e => {
                resArray.push({ label: e.name, value: e.img });
            })
            setAllConfigs(temp);
        }, (err) => {
            console.log(err);
        })
    }

    const getSpecifications = () => {
        getAllApi().then((res) => {
            let temp = res.data.listSpecifications.items;
            let resArray = [];
            temp.forEach(e => {
                resArray.push({ label: e.name, value: e.img });
            })
            setAllSpec(temp);
        }, (err) => {
            console.log(err);
        })
    }

    
    const getPropertyDetails = () => {
        const { id } = params;
        if (id) {
            getPropertyApi({ 'id': id }).then((res) => {
                form.setFieldsValue(res.data.getProperty);
                setAboutProperty(res.data.getProperty.about);
                setS3Id(res.data.getProperty.s3Uuid);
                let temp = [];
                _.map(res.data.getProperty.propertyImg, (data, index) => {
                    temp.push(
                        {
                            id: index,
                            status: 'done',
                            name: data,
                            url: `https://${awsmobile.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${data}`
                        });
                });
                setPropertyImages(temp);
                let mTemp = [];
                _.map(res.data.getProperty.masterPlanImg, (data, index) => {
                    mTemp.push({
                        id: index,
                        status: 'done',
                        name: data,
                        url: `https://${awsmobile.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${data}`
                    })
                })
                setMasterImg(mTemp);
                let fTemp = [];
                _.map(res.data.getProperty.floorPlan, (data, index) => {
                    fTemp.push({
                        id: index,
                        status: 'done',
                        name: data,
                        url: `https://${awsmobile.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${data}`
                    })
                })
                setFloorPlan(fTemp);
                if (!_.isEmpty(res.data.getProperty.broucher)) {
                    setBroucherPdf([{
                        id: 1,
                        status: 'done',
                        name: res.data.getProperty.broucher,
                        url: `https://${awsmobile.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${res.data.getProperty.broucher}`
                    }]);
                }
                if (!_.isEmpty(res.data.getProperty.offersImg)) {
                    setOffersImg([{
                        id: 1,
                        status: 'done',
                        name: res.data.getProperty.offersImg,
                        url: `https://${awsmobile.aws_user_files_s3_bucket}.s3.amazonaws.com/public/${res.data.getProperty.offersImg}`
                    }]);
                }
            }, () => {
            })
        } else {
            let temp = uuidv4();
            setS3Id(temp);
        }
    }

    const getAmenities = () => {
        getAllAmenitiesApi().then((res) => {
            let temp = res.data.listAmenities.items;
            let all = [];
            for (let e of temp) {
                all.push({ id: e.id, name: e.name });
            }
            setAllAmenities(all);
        }, () => {

        })
    }

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getConfigurations();
            getSpecifications();
            getAmenities();
            getPropertyDetails();
        }
        return () => {
            isMounted = false;
        }
    }, []);
    const s3BucketName = () => {
        setS3Url(awsmobile.aws_user_files_s3_bucket);
    }

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Property"
                        extra={
                            <>
                                <Button type='dashed'><NavLink to="/property">Back</NavLink></Button>
                            </>
                        }
                    >
                        <Form form={form} name="Create-device-form" {...formItemLayout} onFinish={onFinish}>
                            <Row>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item
                                        name={"propertyName"}
                                        label="Property Name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Property name is mandatory'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item name={"propertyType"} label="Property Type" rules={[
                                        {
                                            required: true,
                                            message: 'Property type is mandatory'
                                        }
                                    ]}>
                                        <Select >
                                            {_.map(['Open Plot', 'Villa - Sale', 'Villa - Rent', 'Apartment - Sale', 'Apartment - Rent'], (value, index) => (
                                                <Select.Option key={index} value={value}>{value}</Select.Option>
                                            ))
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item name={"city"} label="City" rules={[
                                        {
                                            required: true,
                                            message: 'City is mandatory'
                                        }
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item
                                        name={"location"}
                                        label="Location"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Location is mandatory'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item
                                        name={"videoLink"}
                                        label="Youtube Video Link"
                                        rules={[
                                            {
                                                type: 'url',
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item name={"price"} label="Price" rules={[
                                        {
                                            required: true,
                                            type: 'number',
                                            message: 'Price is mandatory'
                                        }
                                    ]}>
                                        <InputNumber />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item
                                        name={"lat"}
                                        label="Latitude"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Latitude is mandatory'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item name={"lon"} label="Longitude" rules={[
                                        {
                                            required: true,
                                            message: 'Longitude is mandatory'
                                        }
                                    ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item
                                        name={"tags"}
                                        label="Tags"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Tags is mandatory'
                                            }
                                        ]}
                                    >
                                        <Select mode='tags' ></Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item name={"amenities"} label="Amenities" rules={[
                                        {
                                            required: true,
                                            message: 'Amenitis is mandatory'
                                        }
                                    ]}>
                                        <Select name={'amenities'} optionLabelProp="label" mode='multiple' filterOption={(input, option) =>
                                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }>
                                            {_.map(allAmenities, (value, index) => (
                                                <Select.Option aria-label={value.name} label={value.name} key={index} value={value.id}>{value.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider>Configurations</Divider>
                            <Row>
                                <Col span={'24'} >
                                    <Form.List name="configurations">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <Row key={key} style={{ display: 'flex', width: '100%', marginBottom: 8 }} align="baseline">
                                                        <Col span={11} >
                                                            <Form.Item {...restField} style={{ padding: '0px 8px' }} name={[name, 'id']}
                                                                rules={[{ required: true, message: 'Confgiuration is mandatory' }]}>
                                                                <Select placeholder="Configuration">
                                                                    {_.map(allConfigs, (value, index) => (
                                                                        <Select.Option key={index} value={value.id}>{value.name}</Select.Option>
                                                                    ))}
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>

                                                            <Form.Item
                                                                style={{ padding: '0px 8px' }}
                                                                {...restField}
                                                                name={[name, 'value']}
                                                                rules={[{ required: true, message: 'Configuration value is mandatory' }]}
                                                            >
                                                                <Input placeholder="Value" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col style={{ alignItems: 'center' }} span={1}>
                                                            <MinusCircleOutlined style={{ padding: '8px 0' }} onClick={() => remove(name)} />
                                                        </Col>
                                                    </Row>
                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Add Configurations
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Col>
                            </Row>
                            <Divider>Specifications</Divider>
                            <Row>
                                <Col span={'24'}>
                                    <Form.List name="specifications">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <Row key={key} style={{ display: 'flex', width: '100%', marginBottom: 8 }} align="baseline">
                                                        <Col span={11} >
                                                            <Form.Item {...restField} style={{ padding: '0px 8px' }} name={[name, 'id']}
                                                                rules={[{ required: true, message: 'Specification is mandatory' }]}>
                                                                <Select placeholder="Specification">
                                                                    {_.map(allSpec, (value, index) => (
                                                                        <Select.Option key={index} value={value.id}>{value.name}</Select.Option>
                                                                    ))}
                                                                </Select>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>

                                                            <Form.Item
                                                                style={{ padding: '0px 8px' }}
                                                                {...restField}
                                                                name={[name, 'value']}
                                                                rules={[{ required: true, message: 'Specification value is mandatory' }]}
                                                            >
                                                                <Input placeholder="Value" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col style={{ alignItems: 'center' }} span={1}>
                                                            <MinusCircleOutlined style={{ padding: '8px 0' }} onClick={() => remove(name)} />
                                                        </Col>
                                                    </Row>
                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Add Specifications
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Col>
                            </Row>
                            <Divider>Unit Variants</Divider>
                            <Row>
                                <Col span={'24'}>
                                    <Form.List name="typeAreaDetails">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <Row key={key} style={{ display: 'flex', width: '100%', marginBottom: 8 }} align="baseline">
                                                        <Col span={8} >
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'unitType']}
                                                                style={{ padding: '0px 8px' }}
                                                                rules={[{ required: true, message: 'Unit Type is mandatory' }]}
                                                            >
                                                                <Input placeholder="Unit Type" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={8} >
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'size']}
                                                                style={{ padding: '0px 8px' }}
                                                                rules={[{ required: true, message: 'Size is mandatory' }]}
                                                            >
                                                                <Input placeholder="Size" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={7}>
                                                            <Form.Item
                                                                {...restField}
                                                                style={{ padding: '0px 8px', width: '100% !important' }}
                                                                name={[name, 'price']}
                                                            >
                                                                <Input placeholder='Price' style={{ width: '100px !important' }} />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col style={{ alignItems: 'center' }} span={1}>
                                                            <MinusCircleOutlined style={{ padding: '8px 0' }} onClick={() => remove(name)} />
                                                        </Col>
                                                    </Row>
                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Add Unit Variants
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Col>
                            </Row>
                            <Divider>FAQ</Divider>
                            <Row>
                                <Col span={'24'}>
                                    <Form.List name="faq">
                                        {(fields, { add, remove }) => (
                                            <>
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <Row key={key} style={{ display: 'flex', width: '100%', marginBottom: 8 }} align="baseline">
                                                        <Col span={11} >
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'question']}
                                                                style={{ padding: '0px 8px' }}
                                                                rules={[{ required: true, message: 'Question is mandatory' }]}
                                                            >
                                                                <Input placeholder="Question" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12} >
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'answer']}
                                                                style={{ padding: '0px 8px' }}
                                                                rules={[{ required: true, message: 'Answer is mandatory' }]}
                                                            >
                                                                <Input placeholder="Answer" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col style={{ alignItems: 'center' }} span={1}>
                                                            <MinusCircleOutlined style={{ padding: '8px 0' }} onClick={() => remove(name)} />
                                                        </Col>
                                                    </Row>
                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                        Add FAQ
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Col>
                            </Row>
                            <Divider>About Builder</Divider>
                            <Row>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item
                                        name={"builderName"}
                                        label="Builder Name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Builder name is mandatory'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12} md={12} xs={24} sm={24}>
                                    <Form.Item name={"aboutBuilder"} label="About Builder" rules={[
                                        {
                                            required: true,
                                            message: 'About Builder is mandatory'
                                        }
                                    ]}>
                                        <Input.TextArea rows={4} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Divider>Property Images</Divider>
                            <Form.Item name="propertyImg" >
                                <Upload.Dragger {...propertyImageProps} accept='image/*' fileList={propertyImages}>
                                    <div className="ant-upload-text font-semibold text-dark">
                                        {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
                                        <div>Click or Drag & Drop to Upload</div>
                                    </div>
                                </Upload.Dragger>
                            </Form.Item>

                            <Divider>Master Layout</Divider>
                            <Form.Item name="masterPlanImg">
                                <Upload.Dragger {...masterImageProps} accept='image/*' fileList={masterImg}>
                                    <div className="ant-upload-text font-semibold text-dark">
                                        {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
                                        <div>Click or Drag & Drop to Upload</div>
                                    </div>
                                </Upload.Dragger>
                            </Form.Item>

                            <Divider>Floor Plans</Divider>

                            <Form.Item name="floorPlan">
                                <Upload.Dragger {...floorPlanProps} accept='image/*' fileList={floorPlan}>
                                    <div className="ant-upload-text font-semibold text-dark">
                                        {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
                                        <div>Click or Drag & Drop to Upload</div>
                                    </div>
                                </Upload.Dragger>
                            </Form.Item>


                            <Divider>Broucher</Divider>
                            <Form.Item name="broucher">
                                <Upload.Dragger {...broucher} maxCount={1} accept='application/pdf' fileList={broucherPdf}>
                                    <div className="ant-upload-text font-semibold text-dark">
                                        {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
                                        <div>Click or Drag & Drop to Upload</div>
                                    </div>
                                </Upload.Dragger>
                            </Form.Item>
                            <Divider>Promotional Image</Divider>
                            <Form.Item name="promotionalImg">
                                <Upload.Dragger className='avatar-uploader projects-uploader' {...promotionalImage} maxCount={1} accept='image/*' fileList={offersImg}>
                                    <div className="ant-upload-text font-semibold text-dark">
                                        {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
                                        <div>Click or Drag & Drop to Upload</div>
                                    </div>
                                </Upload.Dragger>
                            </Form.Item>
                            <Divider>About Property</Divider>
                            {
                                _.isEmpty(aboutProperty) &&
                                <Editor html={aboutProperty} updateHtml={(html) => setAboutProperty(html)} />
                            }
                            {
                                !_.isEmpty(aboutProperty) && <Editor html={aboutProperty} updateHtml={(html) => setAboutProperty(html)} />
                            }
                            <br />
                            <Row>
                                <Col span={12}></Col>
                                <Col span={12}>
                                    <Row>
                                        <Col span={12} style={{ paddingRight: '8px' }}>
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" block>
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Button type="secondary" block>
                                                Back
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row >
        </div >
    );
};

export default CreateHookForm;