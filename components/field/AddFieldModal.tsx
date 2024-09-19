import React, { useState } from 'react';
import { Modal, Form, Input, Select, InputNumber, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FileUploader } from '../FileUploader';
import { FieldInterface } from '../../constants/types';

const { Option } = Select;

interface AddFieldModalProps {
    visible: boolean;
    onCancel: () => void;
    onAdd: (field: Partial<FieldInterface>) => void;
}

const AddFieldModal: React.FC<AddFieldModalProps> = ({ visible, onCancel, onAdd }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const newField: Partial<FieldInterface> = {
                ...values,
                location: {
                    type: 'Point',
                    coordinates: [values.longitude, values.latitude],
                    address: values.address,
                },
                image: fileList[0]?.response?.url || null, // Assuming your server returns the image URL
            };
            onAdd(newField);
            form.resetFields();
            setFileList([]);
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setFileList([]);
        onCancel();
    };

    const handleImageUpload = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
        setFileList(newFileList);
    };

    return (
        <Modal
            visible={visible}
            title="Add New Field"
            okText="Add"
            cancelText="Cancel"
            onCancel={handleCancel}
            onOk={handleSubmit}
        >
            <Form form={form} layout="vertical">
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
                    name="size"
                    label="Size (in hectares)"
                    rules={[{ required: true, message: 'Please enter the field size' }]}
                >
                    <InputNumber min={0} step={0.01} />
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
                        {/* You'll need to fetch and populate this list with actual user data */}
                        <Option value="user1Id">User 1 Name</Option>
                        <Option value="user2Id">User 2 Name</Option>
                        {/* Add more options as needed */}
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
                    name="expectedHarvestDate"
                    label="Expected Harvest Date"
                    rules={[{ required: true, message: 'Please select the expected harvest date' }]}
                >
                    <Input type="date" />
                </Form.Item>

                <Form.Item label="Field Image">
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleImageUpload}
                        beforeUpload={(file) => {
                            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                            if (!isJpgOrPng) {
                                message.error('You can only upload JPG/PNG file!');
                            }
                            const isLt2M = file.size / 1024 / 1024 < 2;
                            if (!isLt2M) {
                                message.error('Image must smaller than 2MB!');
                            }
                            return isJpgOrPng && isLt2M;
                        }}
                    >
                        {fileList.length >= 1 ? null : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddFieldModal;