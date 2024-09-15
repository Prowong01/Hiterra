'use client';

import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { UserInterface } from '../constants/types';

interface AddNewUserProps {
    onSave: (user: UserInterface) => Promise<any>;
}

const AddNewUser: React.FC<AddNewUserProps> = ({ onSave }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            onSave(values);
            form.resetFields();
            setIsModalVisible(false);
        });
    };

    return (
        <>
            <Button onClick={showModal} type="primary" style={{ marginBottom: 12 }}>Add new user</Button>
            <Modal
                title="Add new user"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSave}>
                        Save
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input placeholder="Please enter email" />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter username' }]}
                    >
                        <Input placeholder="Please enter username" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please enter phone number' }]}
                    >
                        <Input placeholder="Please enter phone number" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddNewUser;