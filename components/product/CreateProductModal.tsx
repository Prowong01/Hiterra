'use client';

import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, message, Row, Col } from 'antd';

import { ProductInterface } from '../../constants/types';
import { FileUploader } from '../FileUploader'

interface AddNewProductProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (product: ProductInterface) => Promise<void>;
}

const AddNewProduct: React.FC<AddNewProductProps> = ({ visible, onCancel, onSave }) => {
    const [form] = Form.useForm();
    const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = (urls: string[]) => {
        setUploadedPhotos(prev => [...prev, ...urls]);
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const values = await form.validateFields();
            const newProduct: ProductInterface = {
                ...values,
                photo: uploadedPhotos,
            };
            await onSave(newProduct);
            message.success('Product added successfully');
            handleCancel();
        } catch (error) {
            console.error('Error saving product:', error);
            message.error('Failed to add product. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setUploadedPhotos([]);
        onCancel();
    };

    const removePhoto = (index: number) => {
        setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <>
            <Modal
                visible={visible}
                title="Add New Product"
                onCancel={handleCancel}
                onOk={handleSave}
                confirmLoading={isLoading}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Product Name"
                        rules={[{ required: true, message: 'Please enter product name' }]}
                    >
                        <Input placeholder="Please enter product name" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Product Description"
                    >
                        <Input.TextArea rows={4} placeholder="Please enter product description" />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                            name="category"
                            label="Category"
                            rules={[{ required: true, message: 'Please select category' }]}
                            >
                            <Select placeholder="Please select a category">
                                <Select.Option value="electronics">Electronics</Select.Option>
                                <Select.Option value="clothing">Clothing</Select.Option>
                                <Select.Option value="books">Books</Select.Option>
                            </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: 'Please enter price' }]}
                            >
                            <InputNumber style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Photos">
                        <FileUploader onFileUpload={handleFileUpload} />
                        {uploadedPhotos.length > 0 && (
                            <div style={{ marginTop: '10px' }}>
                                {uploadedPhotos.map((photo, index) => (
                                    <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                                        <img src={photo} alt={`Product ${index + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                        <Button type="link" onClick={() => removePhoto(index)}>Remove</Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item
                        name="stock"
                        label="Stock"
                        rules={[{ required: true, message: 'Please enter the amount of stock' }]}
                        >
                        <InputNumber style={{ width: '100%' }} min={0} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddNewProduct;