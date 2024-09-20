'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, InputNumber, message, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { FileUploader } from '../FileUploader';
import { FieldInterface, UserInterface } from '../../constants/types';
import MapComponent from '../Map';

import { getAllUser } from '../../lib/actions/user.action';

const { Option } = Select;

interface AddFieldModalProps {
    visible: boolean;
    onCancel: () => void;
    onAdd: (field: FieldInterface) => void;
}

const AddFieldModal: React.FC<AddFieldModalProps> = ({ visible, onCancel, onAdd }) => {
    const [users, setUsers] = useState<UserInterface>([]);
    const [form] = Form.useForm();
    const [upLoadedImage, setUploadedImage] = useState<string[]>([]);

    useEffect(() => {
        if (visible) {
            fetchUsers();
        }
    }, [visible]);

    const fetchUsers = async () => {
        try {
            const fetchedUsers = await getAllUser();
            if (Array.isArray(fetchedUsers as UserInterface)) {
                setUsers(fetchedUsers);
            } else {
                console.error('Unexpected response format from getAllUser');
                message.error('Failed to load users. Unexpected data format.');
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
            message.error('Failed to load users. Please try again.');
        }
    };

    const handleFileUpload = (urls: string[]) => {
        setUploadedImage(prev => [...prev, ...urls]);
    };

    const removeImage = (index: number) => {
        setUploadedImage(prev => prev.filter((_, i) => i !== index));
    };

    const handleLocationSelect = (lat: number, lng: number) => {
        form.setFieldsValue({
            latitude: lat,
            longitude: lng,
        });
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const newField: FieldInterface = {
                ...values,
                location: {
                    type: 'Point',
                    coordinates: [values.longitude, values.latitude],
                    address: values.address,
                },
                image: upLoadedImage
            };
            onAdd(newField);
            form.resetFields();
        } catch (error) {
            message.error(`Failed to add field:, ${error}`);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };


    return (
        <Modal
            open={visible}
            title="Add New Field"
            okText="Add"
            cancelText="Cancel"
            onCancel={handleCancel}
            onOk={handleSubmit}
            width={1200}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '45%' }}>
                    <Form form={form} layout="horizontal">
                        <Form.Item
                            name="fieldName"
                            label="Field Name"
                            rules={[{ required: true, message: 'Please enter the field name' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: true, message: 'Please enter the address' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Coordinates">
                            <Input.Group compact>
                                <Form.Item
                                    name="latitude"
                                    noStyle
                                    rules={[{ required: true, message: 'Latitude is required' }]}
                                >
                                    <InputNumber
                                        style={{ width: '50%' }}
                                        placeholder="Latitude"
                                        min={-90}
                                        max={90}
                                        step={0.000001}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="longitude"
                                    noStyle
                                    rules={[{ required: true, message: 'Longitude is required' }]}
                                >
                                    <InputNumber
                                        style={{ width: '50%' }}
                                        placeholder="Longitude"
                                        min={-180}
                                        max={180}
                                        step={0.000001}
                                    />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>

                        <Form.Item
                            name="status"
                            label="Status"
                            rules={[{ required: true, message: 'Please select the field status' }]}
                        >
                            <Select>
                                <Option value="active">Active</Option>
                                <Option value="inactive">Inactive</Option>
                                <Option value="maintenance">Maintenance</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="pic"
                            label="Person In Charge"
                            rules={[{ required: true, message: 'Please select the person in charge' }]}
                        >
                            <Select>
                                {users.map(user => (
                                    <Option key={user._id} value={user._id}>
                                        <Avatar
                                            icon={!user.photo && <UserOutlined />}
                                            src={user.photo ? user.photo : undefined}
                                            style={{ marginRight: 8 }}
                                        />
                                        {user.username}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="cropType"
                            label="Crop Type"
                            rules={[{ required: true, message: 'Please enter the crop type' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="plantingDate"
                            label="Planting Date"
                            rules={[{ required: true, message: 'Please select the planting date' }]}
                        >
                            <Input type="date" />
                        </Form.Item>

                        <Form.Item
                            name="harvestDate"
                            label="Expected Harvest Date"
                            rules={[{ required: true, message: 'Please select the expected harvest date' }]}
                        >
                            <Input type="date" />
                        </Form.Item>

                        <Form.Item label="Photos">
                            <FileUploader onFileUpload={handleFileUpload} />
                            {upLoadedImage.length > 0 && (
                                <div style={{ marginTop: '10px' }}>
                                    {upLoadedImage.map((image, index) => (
                                        <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                                            <img src={image} alt={`Product ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                            <Button type="link" onClick={() => removeImage(index)}>Remove</Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Form.Item>
                    </Form>
                </div>
                <div style={{ width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <MapComponent onLocationSelect={handleLocationSelect} />
                </div>
            </div>
        </Modal>
    );
};

export default AddFieldModal;