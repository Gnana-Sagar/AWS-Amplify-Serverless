import React, { useEffect, useState } from "react";
import { deletePropertyApi, getAllPropertyApi, getValuesLamda } from './../api/PropertyApi'
import { Button, Row, Col, Card, Table, Space, message, Popconfirm } from "antd";
import { NavLink } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Property = () => {

    const [rows, setRows] = useState([]);
    const columns = [
        { dataIndex: 'propertyName', title: 'Property Name' },
        { dataIndex: 'location', title: 'Location', responsive: ['md']},
        { dataIndex: 'builderName', title: 'Builder Name', responsive: ['md']},
        { dataIndex: 'updatedAt', title: 'UpdatedAt', responsive: ['md']},
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <NavLink to={`/createProperty/${record.id}`}><Button icon={<EditOutlined />} /></NavLink>
                    <Popconfirm
                        title="Are you sure to delete this task ?"
                        onConfirm={() => deleteProperty(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='danger' icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        }
    ]


    const deleteProperty = (id) => {
        deletePropertyApi({ "id": id }).then((res) => {
            if (res.data.deleteProperty) {
                getAllProperties();
                message.success('Property deleted successfully');
            }
        }, (err) => {
            message.error('Unable to delete property');
        })
    }

    useEffect(() => {
        getAllProperties();
        getValuesLamdaFuntion();
        console.log('_________')
        console.log(process.env);
        console.log('_________')
    }, []);

    const getAllProperties = () => {
        getAllPropertyApi().then((res) => {
            setRows(res.data.listProperties.items)
        }, (err) => {
            console.log(err);
        })
    };

    const getValuesLamdaFuntion = () => {
        getValuesLamda().then((res) => {
            console.log("_________");
            console.log(res);
            console.log("_________");
        }, (err) => {
            console.log("_________");
            console.log(err);
            console.log("_________");
        })
    }

    return (

        <React.Fragment>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24} style={{width: '100%'}}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Property"
                            extra={
                                <>
                                    <Button type='primary'><NavLink to="/createProperty">Create</NavLink></Button>
                                </>
                            }
                        >
                            <Table columns={columns} dataSource={rows}
                                pagination={true} size='small'
                                className="ant-border-space" />
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}
export default Property;