import React, { useEffect, useState } from 'react';
import { updateMenuApi, getAllApi, deleteMenuApi, createMenuApi } from './api/DropdownApi';
import { Card, Row, Col, Button, Table, Space, Modal, Form, Input, message, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { SearchOutlined } from '@ant-design/icons';

const Dropdowns = (props) => {

    const [form] = Form.useForm();
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchInput, setSearchInput] = useState();

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    // ref={node => {
                    //     setSearchInput(node);
                    // }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => {
                        handleReset(clearFilters);
                        confirm({ closeDropdown: false });
                        setSearchText(selectedKeys[0]);
                        setSearchedColumn(dataIndex);
                    }} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        render: text =>
            searchedColumn === dataIndex ? (
                text
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            dataIndex: 'name', title: 'Name',
            ...getColumnSearchProps('name'),
            ellipsis: {
                showTitle: false,
            },
            render: address => (
                <Tooltip placement="topLeft" title={address}>
                    {address}
                </Tooltip>
            ),
        },
        {
            dataIndex: 'description', title: 'Description',
            ...getColumnSearchProps('description')
        },
        { dataIndex: 'updatedAt', title: 'Updated At', responsive: ['md'], ...getColumnSearchProps('updatedAt') },
        { dataIndex: 'createdAt', title: 'Created At', responsive: ['md'], ...getColumnSearchProps('createdAt') },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type='warning' icon={<EditOutlined />} onClick={() => editMenu(record)} />
                    <Popconfirm
                        title="Are you sure to delete this ?"
                        onConfirm={() => deleteMenu(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='danger' icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];


    const [rows, setRows] = useState([]);
    const [modal, setModal] = useState(false);
    const [id, setId] = useState('');



    useEffect(() => {
        getAllMenus();
    }, []);

    const openModel = () => {
        setId('');
        setModal(true);
    }

    const closeModel = () => {
        setModal(false);
    }

    const getAllMenus = () => {
        getAllApi().then((success) => {
            setRows(success.data.listMenuBars.items);
        }, (err) => {

        });
    }

    const editMenu = (value) => {
        form.setFieldsValue(value);
        setId(value.id);
        setModal(true);
    }

    const createMenu = values => {
        if (!_.isEmpty(id)) {
            updateMenu(values);
            return;
        }
        const input = {
            'name': values.name,
            'description': values.description
        }
        form.resetFields();
        createMenuApi(input).then((result) => {
            if (result.data.createMenuBar) {
                message.success('Menubar added successfully')
                getAllMenus();
                closeModel();
            }
        }, (err) => {
            message.error('Unable to add menubar reason:' + err);
        })
    }

    const deleteMenu = (record) => {
        deleteMenuApi({ id: record.id }).then((result) => {
            if (result.data.deleteMenuBar) {
                message.success('Menubar deleted successfully')
                getAllMenus();
            }
        }, (err) => {
            message.error('Unable to delete menubar')
        })
    }

    const updateMenu = (values) => {
        const input = { id: id, name: values.name, description: values.description };
        updateMenuApi(input).then((success) => {
            if (success.data.updateMenuBar) {
                message.success('Menubar updated successfully');
                closeModel();
                getAllMenus();
            }
        }, (err) => {
            message.error('Unable to update menubar')
        })
    }

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24} style={{ width: '100%' }}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="MenuBars"
                        extra={
                            <>
                                <Button type='primary' onClick={() => openModel()}>Create</Button>
                            </>
                        }
                    >
                        <Table columns={columns} dataSource={rows}
                            pagination={true} size='small'
                            className="ant-border-space" />
                        <Modal title="MenuBar" visible={modal} okButtonProps={{ htmlType: 'submit', form: 'menubarForm' }}
                            onCancel={closeModel}>
                            <Form
                                form={form}
                                id="menubarForm"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={createMenu}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="MenuBar Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please enter name' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Description"
                                    name="description"
                                    rules={[{ required: true, message: 'Please enter description' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dropdowns;