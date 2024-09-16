'use client';

import { useState, useEffect } from 'react';
import { Input, Button, Dropdown, Menu, Popconfirm, Carousel } from 'antd';
import { EllipsisOutlined, EyeOutlined, DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { ProductInterface } from '../../constants/types';
import CreateNewProductButton from './CreateNewProductButton';

interface ProductListProps {
    initialData: ProductInterface[];
}

const ProductList: React.FC<ProductListProps> = ({ initialData }) => {
    const [products, setProducts] = useState<ProductInterface[]>(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(initialData);

    useEffect(() => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    }, [products, searchTerm])

    const handleDelete = (id: string) => {
        setProducts(products.filter(product => product._id !== id));
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const menu = (id: string) => (
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
                <CreateNewProductButton />
                <Input.Search
                    placeholder="Search by name"
                    style={{ width: 250 }}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchTerm}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow p-4">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <Dropdown overlay={menu(product._id)} trigger={['click']}>
                                <Button icon={<EllipsisOutlined />} />
                            </Dropdown>
                        </div>
                        <Carousel
                            arrows
                            prevArrow={<LeftOutlined />}
                            nextArrow={<RightOutlined />}
                            className="mb-4"
                        >
                            {product.photo.map((photo, index) => (
                                <div key={index}>
                                    <img src={photo} alt={`${product.name} - Photo ${index + 1}`} className="w-full h-48 object-cover rounded" />
                                </div>
                            ))}
                        </Carousel>
                        <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
                        <p className="text-lg font-bold mb-2">Price: ${product.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;