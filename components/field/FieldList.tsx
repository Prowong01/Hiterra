'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Card, Row, Col, Pagination, Spin, message } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { FieldInterface } from '../../constants/types';
import AddFieldModal from './AddFieldModal';
import Image from 'next/image';

const { Search } = Input;
const { Option } = Select;

interface FieldListProps {
    initialFields: FieldInterface[];
    createField: (field: FieldInterface) => Promise<FieldInterface>;
    updateField: (id: string, field: Partial<FieldInterface>) => Promise<FieldInterface>;
    deleteField: (id: string) => Promise<void>;
}

const FieldList: React.FC<FieldListProps> = ({
    initialFields,
    createField,
    updateField,
    deleteField
}) => {
    const [fields, setFields] = useState<FieldInterface[]>(initialFields);

    // Search and Filter
    const [filteredFields, setFilteredFields] = useState<FieldInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Modal and Loading
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);

    // Filter and search fields
    useEffect(() => {
        setLoading(true);
        let result = fields;
        if (statusFilter !== 'all') {
            result = result.filter(field => field.status === statusFilter);
        }
        if (searchTerm) {
            result = result.filter(field =>
                field.fieldName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                field.location?.address?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredFields(result);
        setCurrentPage(1);
        setLoading(false);
    }, [fields, statusFilter, searchTerm]);

    const handleAdd = async (values: Omit<FieldInterface, '_id'>) => {
        try {
            const newField = await createField(values);
            setFields(prevFields => [...prevFields, newField]);
            setIsModalVisible(false);
            message.success('Field added successfully');
        } catch (error) {
            message.error('Failed to add field. Please try again.');
        }
    };

    const handleEdit = async (id: string, updatedField: Partial<FieldInterface>) => {
        try {
            const updated = await updateField(id, updatedField);
            setFields(prevFields => prevFields.map(field => field._id === id ? updated : field));
            message.success('Field updated successfully');
        } catch (error) {
            message.error('Failed to update field. Please try again.');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteField(id);
            setFields(prevFields => prevFields.filter(field => field._id !== id));
            message.success('Field deleted successfully');
        } catch (error) {
            message.error('Failed to delete field. Please try again.');
        }
    };

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const paginatedFields = filteredFields.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div>
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <Col>
                    <Button onClick={() => { setIsModalVisible(true) }}>Add New Field</Button>
                    <AddFieldModal
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        onAdd={handleAdd}
                    />
                </Col>
                <Col>
                    <Search
                        placeholder="Search fields"
                        onSearch={(value) => { setSearchTerm(value); }}
                        style={{ width: 200, marginRight: 16 }}
                    />
                    <Select
                        defaultValue="all"
                        style={{ width: 120 }}
                        onChange={(value) => { setStatusFilter(value); }}
                    >
                        <Option value="all">All Status</Option>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                    </Select>
                </Col>
            </Row>

            {
                loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        <Row gutter={[16, 16]}>
                            {paginatedFields.map((field) => (
                                <Col xs={24} sm={12} md={8} lg={6} key={field._id}>
                                    <Card
                                        hoverable
                                        cover={
                                            <div style={{ height: 200, position: 'relative' }}>
                                                <Image
                                                    src={field.image[0] || '/default-field-image.png'}
                                                    alt={`Map of ${field.fieldName}`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                        }
                                        actions={[
                                            <Button key="edit" type="link" onClick={() => handleEdit(field._id, field)}>Edit</Button>,
                                            <Button key="delete" type="link" danger onClick={() => handleDelete(field._id)}>Delete</Button>,
                                        ]}
                                    >
                                        <Card.Meta
                                            title={field.fieldName}
                                            description={
                                                <>
                                                    <p><EnvironmentOutlined /> {field.location?.address}</p>
                                                    <p>Status: <span style={{ color: field.status === 'active' ? 'green' : 'red' }}>{field.status}</span></p>
                                                </>
                                            }
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Row justify="end" style={{ marginTop: 16 }}>
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={filteredFields.length}
                                onChange={handlePageChange}
                                showSizeChanger
                                showQuickJumper
                                showTotal={(total) => `Total ${total} items`}
                            />
                        </Row>
                    </>
                )
            }
        </div >
    );
};

export default FieldList;