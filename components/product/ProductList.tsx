'use client';

import { useState, useEffect } from 'react';
import { Input, Button, Dropdown, Menu, Popconfirm } from 'antd';
import { PlusOutlined, EllipsisOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { CompaniesClientProps } from '../../app/dashboard/product/page';

export default function ProductList({ initialCompanies }: CompaniesClientProps) {
    const [companies, setCompanies] = useState(initialCompanies);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);

    useEffect(() => {
        const results = companies.filter(company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCompanies(results);
    }, [companies, searchTerm])

    const handleDelete = (id: number) => {
        setCompanies(companies.filter(company => company.id !== id));
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const menu = (id: number) => (
        <Menu>
            <Menu.Item key="view" icon={<EyeOutlined />}>
                <Link href={`/product/${id}`}>View Products</Link>
            </Menu.Item>
            <Menu.Item key="delete" icon={<DeleteOutlined />}>
                <Popconfirm
                    title="Are you sure you want to delete this product?"
                    onConfirm={() => handleDelete(id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <a href="#">Delete Product</a>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="w-full px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <Button type="primary" icon={<PlusOutlined />}>
                    Add new Product
                </Button>
                <Input.Search
                    placeholder="Search by name"
                    style={{ width: 250 }}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchTerm}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCompanies.map((company) => (
                    <div key={company.id} className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-start mb-4">
                            <img src={company.logo} alt={`${company.name} logo`} className="w-12 h-12 rounded-full" />
                            <Dropdown overlay={menu(company.id)} trigger={['click']}>
                                <Button icon={<EllipsisOutlined />} />
                            </Dropdown>
                        </div>
                        <h2 className="text-lg font-semibold mb-2">{company.name}</h2>
                        <p className="text-sm text-gray-600 mb-1">Open deals amount</p>
                        <p className="text-lg font-bold">${company.openDealsAmount.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}