'use client';

import { useState, useEffect } from 'react';
import { Input, Button, Dropdown, Menu, Popconfirm, Carousel, Select, message } from 'antd';
import { EllipsisOutlined, EyeOutlined, DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

import { ProductInterface } from '../../constants/types';
import CreateNewProductButton from './CreateNewProductButton';
import ViewProductDrawer from './ViewProductDrawer';
import { updateProduct, deleteProduct } from '../../lib/actions/product.action';

import styles from './ProductList.module.css';

const { Option } = Select;

const categories = [
  { name: 'All Categories', icon: '🛒' },
  { name: 'electronics', icon: '📱' },
  { name: 'clothing', icon: '👕' },
  { name: 'books', icon: '📚' },
];

interface ProductListProps {
    initialData: ProductInterface[];
}

const ProductList: React.FC<ProductListProps> = ({ initialData }) => {
    const [products, setProducts] = useState<ProductInterface[]>(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(initialData);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null);
    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        const results = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === 'All Categories' || product.category.includes(selectedCategory))
        );
        setFilteredProducts(results);
    }, [products, searchTerm, selectedCategory]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    const showDrawer = (product: ProductInterface) => {
        setSelectedProduct(product);
        setDrawerVisible(true);
      };
      
      const handleCloseDrawer = () => {
        setDrawerVisible(false);
        setSelectedProduct(null);
      };

      const handleEdit = async (id: string, updatedData: ProductInterface) => {
        try {
            const updatedProduct = await updateProduct(id, updatedData);
            setProducts(products.map(p => p._id === id ? updatedProduct : p));
            setDrawerVisible(false);
        } catch (error) {
            console.error('Failed to update product:', error);
            message.error('Failed to update product');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(product => product._id !== id));
            message.success("Delete product successfully!")
            setDrawerVisible(false);
        } catch (error) {
            console.error('Failed to delete product:', error);
            message.error('Failed to update product');
        }
    };

    const menu = (product: ProductInterface) => (
        <Menu>
            <Menu.Item key="view" icon={<EyeOutlined />} onClick={() => showDrawer(product)}>
                View Product
            </Menu.Item>
            <Menu.Item key="delete" icon={<DeleteOutlined />}>
                <Popconfirm
                    title="Are you sure you want to delete this product?"
                    onConfirm={() => handleDelete(product._id)}
                    okText="Yes" 
                    cancelText="No"
                >
                    <div>Delete Product</div>
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="w-full mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <CreateNewProductButton />
                <div className="flex items-center space-x-4">
                <Select
                        style={{ width: 200 }}
                        placeholder="Select a category"
                        onChange={handleCategoryChange}
                        value={selectedCategory}
                    >
                        {categories.map((category) => (
                            <Option key={category.name} value={category.name}>
                                <span className={styles.categoryIcon}>{category.icon}</span> {category.name}
                            </Option>
                        ))}
                    </Select>
                    <Input.Search
                        placeholder="Search by name"
                        style={{ width: 250 }}
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchTerm}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="rounded-lg shadow p-6 border border-gray-200">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <Dropdown overlay={menu(product)} trigger={['click']}>
                                <Button icon={<EllipsisOutlined />} />
                            </Dropdown>
                        </div>
                        <div>
                            <ViewProductDrawer
                                visible={drawerVisible}
                                onClose={handleCloseDrawer}
                                product={selectedProduct}
                                onEdit={handleEdit}
                            />
                        </div>
                        <div className={styles.carouselContainer}>
                            {product.photo && product.photo.length > 0 ? (
                                <Carousel
                                    arrows
                                    dots={true}
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
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div className={styles.categoryTag}>
                                <span role="img" aria-label={product.category}>
                                {categories.find(cat => cat.name === product.category)?.icon || '🛒'}
                                </span>
                                <span>{product.category}</span>
                            </div>
                            <span className={`${styles.stockBadge} ${product.stock > 0 ? styles.inStock : styles.outOfStock}`}>
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'} {`: ${product.stock}`}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;