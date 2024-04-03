import React, { useState, useEffect } from 'react';
import { Space, Table, Modal, Form, Input, Spin, notification, Select, Row, Col, Button, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { deleteProduct, updateProduct } from '../redux/slices/ProductSlice';
const { Title } = Typography;

export default function TableDashBoard({ dataSource }) {

    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const category = [
        "T-shirt", "Shoes", "Activewear", "Accessories"
    ];

    const categoryOptions = category.map(items => (
        <Select.Option key={items} value={items}>
            {items}
        </Select.Option>
    ));

    // Notification
    const [notificationType, setNotificationType] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);

    useEffect(() => {
        if (notificationType && notificationMessage) {
            notification[notificationType]({
                message: notificationMessage,
                placement: "top",
            });
        }
    }, [notificationType, notificationMessage]);

    const openNotification = (type, message) => {
        setNotificationType(type);
        setNotificationMessage(message);
    };

    // manage the visibility of the edit modal.
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);

    const handleEdit = (record) => {
        setEditedProduct(record);
        setEditModalVisible(true);
        form.setFieldsValue(record);
    };

    const handleEditSubmit = (values) => {
        setLoading(true);
        dispatch(updateProduct({ id: editedProduct.id, updatedProduct: values }))
            .unwrap()
            .then(() => {
                openNotification('success', `Updated Product with ID: ${editedProduct.id} successfully`)
                setEditModalVisible(false);
                setEditedProduct(null);

                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            })
            .catch((error) => {
                openNotification('warning', error);
                setLoading(false);
            })
    };

    const handleEditCancel = () => {
        setEditModalVisible(false);
        setEditedProduct(null);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: "Delete Product?",
            content:
                `Are you sure you want to delete the product with ID: ${id}?`,
            onOk: () => {
                dispatch(deleteProduct(id))
                    .unwrap()
                    .then(() => {
                        openNotification('success', `Deleted Product with ID: ${id} successfully`);
                    })
                    .catch((error) => {
                        console.error("Error: ", error);
                    })
            },
            onCancel: () => {
                console.log("Cancel deletion");
            },
        });
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (text, record, index) => index + 1,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            hidden: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Price $',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <EditOutlined onClick={() => handleEdit(record)} />
                    <DeleteOutlined style={{ color: "red" }} onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ].filter(item => !item.hidden);

    return (
        <>
            <Spin spinning={loading} tip="loading">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                />
            </Spin>

            {/* Edit Product Modal */}
            <Modal
                title="Edit Product"
                open={editModalVisible}
                footer={null}
                width={700}
            >
                <Form
                    form={form}
                    labelCol={{ span: 0 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={handleEditSubmit}
                >
                    <Row gutter={[6]}>
                        <Col span={8}>
                            <Title level={5}>Product's name</Title>
                            <Form.Item
                                label="Product name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Product name!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Image</Title>
                            <Form.Item
                                label="Image"
                                name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input link of image!',
                                    },
                                ]}>
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>Category</Title>
                            <Form.Item
                                label="Category"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the category of product',
                                    },
                                ]}
                            >
                                <Select
                                    name="category"
                                    placeholder="Choose category"
                                    allowClear
                                >
                                    {categoryOptions}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Title level={5}>$Price</Title>
                            <Form.Item
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the price of product',
                                    },
                                    {
                                        pattern: /^[1-9]\d*$/,
                                        message: 'Please input the valid price of product',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button className="cancelBtn" type="default" onClick={handleEditCancel}>
                                    Cancel
                                </Button>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    ok
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}