// components/AddNewCompany.tsx
'use client';

import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface AddNewCompanyProps {
    onSave: (values: { companyName: string; salesOwner: string }) => void;
}

const AddNewCompany: React.FC<AddNewCompanyProps> = ({ onSave }) => {
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
                        name="companyName"
                        label="Company name"
                        rules={[{ required: true, message: 'Please enter company name' }]}
                    >
                        <Input placeholder="Please enter company name" />
                    </Form.Item>
                    <Form.Item
                        name="salesOwner"
                        label="Sales owner"
                        rules={[{ required: true, message: 'Please enter sales owner' }]}
                    >
                        <Input placeholder="Please enter sales owner" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddNewCompany;