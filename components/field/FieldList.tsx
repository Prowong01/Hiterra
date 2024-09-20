'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Card, Row, Col, Pagination, Spin, message } from 'antd';
import { EnvironmentOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { FieldInterface } from '../../constants/types';

import FieldFormModal from './FieldFormModal';
import DeleteFieldModal from './DeleteFieldModal';

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
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [fieldToEdit, setFieldToEdit] = useState<FieldInterface | undefined>(undefined);

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

    // Delete
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
    const [fieldToDelete, setFieldToDelete] = useState<{ id: string; name: string } | null>(null);

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

    const handleEdit = async (updatedField: FieldInterface) => {
        try {
            const updated = await updateField(updatedField._id as string, updatedField);
            setFields(prevFields => prevFields.map(field => field._id === updated._id ? updated : field));
            setIsModalVisible(false);
            message.success('Field updated successfully');
        } catch (error) {
            console.error('Failed to update field:', error);
            message.error('Failed to update field. Please try again.');
        }
    };

    const handleDelete = (fieldId: string, fieldName: string) => {
        setFieldToDelete({ id: fieldId, name: fieldName });
        setIsDeleteModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (fieldToDelete) {
            try {
                await deleteField(fieldToDelete.id);
                message.success('Field deleted successfully');
                setFields(fields.filter(field => field._id !== fieldToDelete.id));
                setFilteredFields(filteredFields.filter(field => field._id !== fieldToDelete.id));
            } catch (error) {
                console.error('Failed to delete field:', error);
                message.error('Failed to delete field. Please try again.');
            }
        }
        setIsDeleteModalVisible(false);
        setFieldToDelete(null);
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
                    <Button onClick={() => { setIsModalVisible(true); setModalMode('add'); }}>Add New Field</Button>
                    <FieldFormModal
                        visible={isModalVisible}
                        onCancel={() => setIsModalVisible(false)}
                        onSubmit={modalMode === 'add' ? handleAdd : handleEdit}
                        initialValues={modalMode === 'edit' ? fieldToEdit : undefined}
                        mode={modalMode}
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
                                        loading={loading}
                                        hoverable
                                        cover={
                                            <div style={{ height: 200, position: 'relative' }}>
                                                <Image
                                                    src={field.image[0] || '/default-field-image.png'}
                                                    alt={`Map of ${field.fieldName}`}
                                                    fill
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>
                                        }
                                        actions={[
                                            <Button key="view" type="link" onClick={() => handleEdit(field._id as string, field)}><EyeOutlined /></Button>,
                                            <Button
                                                key="edit"
                                                type="link"
                                                onClick={() => {
                                                    setFieldToEdit(field);
                                                    setModalMode('edit');
                                                    setIsModalVisible(true);
                                                }}
                                            >
                                                <EditOutlined />
                                            </Button>,
                                            <Button key="delete" type="link" danger onClick={() => handleDelete(field._id as string, field.fieldName)}><DeleteOutlined /></Button>,
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

                        <DeleteFieldModal
                            visible={isDeleteModalVisible}
                            onCancel={() => setIsDeleteModalVisible(false)}
                            onConfirm={handleConfirmDelete}
                            fieldName={fieldToDelete?.name || ''}
                        />
                    </>
                )
            }
        </div >
    );
};

export default FieldList;