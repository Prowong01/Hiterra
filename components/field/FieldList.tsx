'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Card, Row, Col, Pagination, Spin, message } from 'antd';
import { PlusOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { FieldInterface } from '../../constants/types';
import AddFieldModal from './AddFieldModal';
import Image from 'next/image';

const { Search } = Input;
const { Option } = Select;

const FieldList = () => {
    const [fields, setFields] = useState<FieldInterface[]>([]);
    const [filteredFields, setFilteredFields] = useState<FieldInterface[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Fetch fields data
    useEffect(() => {
        const fetchFields = async () => {
            try {
                setLoading(true);
                // Replace this with your actual API call
                // const response = await fetch('/api/fields');
                // const data: FieldInterface[] = await response.json();
                // setFields(data);

                // Dummy data for example
                const dummyData: FieldInterface[] = Array(50).fill(null).map((_, index) => ({
                    _id: `field_${index + 1}`,
                    fieldName: `Field ${index + 1}`,
                    location: {
                        address: `${index + 100} Farm Road, Cityville, State ${index % 50 + 1}`,
                    },
                    status: index % 3 === 0 ? 'active' : 'inactive',
                    image: `/path-to-map-image-${index + 1}.png`,
                }));
                setFields(dummyData);
            } catch (err) {
                setError('Failed to fetch fields. Please try again later.');
                message.error('Failed to fetch fields. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFields();
    }, []);

    // Filter and search fields
    useEffect(() => {
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
        setCurrentPage(1); // Reset to first page when filters change
    }, [fields, statusFilter, searchTerm]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAdd = async (values: Partial<FieldInterface>) => {
        try {
            // Here you would typically make an API call to add the new field
            // For example:
            // await addField(values);
            console.log('New field added:', values);
            setIsModalVisible(false);
            // You might want to refresh your field list here
        } catch (error) {
            console.error('Error adding field:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
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
                    <Button onClick={showModal}>Add New Field</Button>
                    <AddFieldModal
                        visible={isModalVisible}
                        onCancel={handleCancel}
                        onAdd={handleAdd}
                    />
            </Col>
            <Col>
                <Search
                    placeholder="Search fields"
                    onSearch={handleSearch}
                    style={{ width: 200, marginRight: 16 }}
                />
                <Select
                    defaultValue="all"
                    style={{ width: 120 }}
                    onChange={handleStatusChange}
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
        ) : error ? (
            <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
                {error}
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
                                            src={field.image || '/default-field-image.png'}
                                            alt={`Map of ${field.fieldName}`}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                }
                                actions={[
                                    <Button key="edit" type="link">Edit</Button>,
                                    <Button key="delete" type="link" danger>Delete</Button>,
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