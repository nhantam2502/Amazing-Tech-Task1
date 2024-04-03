import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Input, InputNumber, notification, Typography, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { createProduct, getProduct } from '../redux/slices/ProductSlice';
const { Title } = Typography;

const AddForm = ({ onClose }) => {

    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

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

    const onFinish = (values) => {
        setLoading(true);
        // Dispatch the createProduct action with the form values
        dispatch(createProduct(values))
            .unwrap()
            .then(() => {
                onClose();
                openNotification('success', "New product has been added successfully");
                // Reset the form fields after dispatching the action
                form.resetFields();
                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            })
            .catch((error) => {
                openNotification('warning', error)
                setLoading(false);
            })
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    const category = [
        "T-shirt", "Shoes", "Activewear", "Accessories"
    ];

    const categoryOptions = category.map(items => (
        <Select.Option key={items} value={items}>
            {items}
        </Select.Option>
    ));

    return (
        <Form
            labelCol={{
                span: 0,
            }}
            wrapperCol={{
                span: 24,
            }}
            id='myForm'
            form={form}
            onFinish={onFinish}
        >
            <Row gutter={[6]}>
                <Col span={8}>
                    <Title level={5}>Product's name</Title>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input Product name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Title level={5}>Image</Title>
                    <Form.Item
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input link of image!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Title level={5}>Category</Title>
                    <Form.Item
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
                        <Button className="cancelBtn" type="default" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Thêm mới sản phẩm
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
export default AddForm;