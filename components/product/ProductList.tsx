'use client';

import { useState, useEffect } from 'react';
import { Input, Button, Dropdown, Menu, Popconfirm, Carousel } from 'antd';
import { EllipsisOutlined, EyeOutlined, DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { ProductInterface } from '../../constants/types';
import CreateNewProductButton from './CreateNewProductButton';

import styles from './ProductList.module.css';

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
        <div className="w-full mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <CreateNewProductButton />
                <Input.Search
                    placeholder="Search by name"
                    style={{ width: 250 }}
                    onChange={(e) => handleSearch(e.target.value)}
                    value={searchTerm}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="rounded-lg shadow p-6 border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <Dropdown overlay={menu(product._id)} trigger={['click']}>
                                <Button icon={<EllipsisOutlined />} />
                            </Dropdown>
                        </div>
                        <div className={styles.carouselContainer}>
                            {product.photo && product.photo.length > 0 ? (
                                <Carousel
                                    arrows
                                    dots={false}
                                    prevArrow={<LeftOutlined />}
                                    nextArrow={<RightOutlined />}
                                >
                                    {product.photo.map((photo, index) => (
                                        <div key={index} className={styles.carouselImageContainer}>
                                            <img
                                                src={photo}
                                                alt={`${product.name} - Photo ${index + 1}`}
                                                className={styles.carouselImage}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            ) : (
                                <div className={styles.noImagePlaceholder}>No Image Available</div>
                            )}
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
                            {/* <div className="flex flex-wrap gap-2 mt-2">
                                {product.category.map((category, index) => (
                                    <span key={index} className={styles.categoryTag}>{category}</span>
                                ))}
                            </div> */}
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <span className={`${styles.stockBadge} ${product.quantity > 0 ? styles.inStock : styles.outOfStock}`}>
                                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                            <Link href={`/product/${product._id}`}>
                                <Button type="primary" icon={<EyeOutlined />}>View</Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;