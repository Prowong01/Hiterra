import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, InputNumber, Button, message, Select, Spin, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FieldInterface, UserInterface } from '../../constants/types';
import { FileUploader } from '../FileUploader';
import { getAllUser } from '../../lib/actions/user.action';

const { Option } = Select;

interface EditFieldDrawerProps {
    visible: boolean;
    onClose: () => void;
    field: FieldInterface | null;
    onFieldUpdated: () => void;
}

const EditFieldDrawer: React.FC<EditFieldDrawerProps> = ({
    visible,
    onClose,
    field,
    onFieldUpdated,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [upLoadedImage, setUpLoadedImage] = useState<string[]>([]);

    const handleFileUpload = (fileUrl: string[]) => {
        setUpLoadedImage(prev => [...prev, ...fileUrl]);
    };

    const removeImage = (index: number) => {
        setUpLoadedImage(prev => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        setLoading(true);
        if (field && visible) {
            form.setFieldsValue({
                fieldName: field.fieldName,
                address: field.location.address,
                latitude: field.location.coordinates[0],
                longitude: field.location.coordinates[1],
                status: field.status,
                pic: field.pic?._id,
                cropType: field.cropType,
                plantingDate: field.plantingDate,
                harvestDate: field.harvestDate,
            });
        }
        setLoading(false);
    }, [field, visible, form]);

    useEffect(() => {
        fetchUsers();
    }, []);

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

    const onFinish = async (values: Partial<FieldInterface>) => {
        setLoading(true);
        try {
            const updatedField = {
                ...field,
                ...values,
                location: {
                    address: values.address,
                    coordinates: [values.latitude, values.longitude],
                },
            };
            await onFieldUpdated(updatedField);
            onClose();
        } catch (error) {
            console.error('Error updating field:', error);
            message.error('Failed to update field');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Drawer
            title="Edit Field"
            width={420}
            onClose={onClose}
            open={visible}
            style={{ paddingBottom: 80 }}
        >
            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" />
                </div>
            ) : (
                <Form form={form} layout="vertical" onFinish={onFinish}>
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
            )}
        </Drawer>
    );
};

export default EditFieldDrawer;