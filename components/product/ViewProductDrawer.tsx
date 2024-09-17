import React, { useState } from 'react';
import { Button, Drawer, Carousel } from 'antd';
import { EditOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

import { ProductInterface, EditProductInterface } from '../../constants/types';
import EditProductDrawer from './EditProductDrawer';

interface ViewProductDrawerProps {
    visible: boolean;
    onClose: () => void;
    product: ProductInterface | null;
    onEdit: (id: string, updatedData: Partial<EditProductInterface>) => Promise<void>;
  }

const ViewProductDrawer: React.FC<ViewProductDrawerProps> = ({ visible, onClose, product, onEdit }) => {
    const [editDrawerVisible, setEditDrawerVisible] = useState(false);

    if (!product) return null;

    const handleEdit = async (id:string, updatedData: Partial<EditProductInterface>) => {
        if (id) {
            await onEdit(product._id, updatedData);
            setEditDrawerVisible(false);
        }
    };

    const openEditDrawer = () => {
        setEditDrawerVisible(true);
      };
    
      const closeEditDrawer = () => {
        setEditDrawerVisible(false);
      };

    return (
        <>
            <Drawer
                open={visible}
                mask={false}
                onClose={onClose}
                width={450}
                placement="right"
                className="p-0"
            >
                <div className="flex flex-col">
                    <div className="relative">
                        {Array.isArray(product.photo) && product.photo.length > 0 ? (
                            <Carousel
                                arrows
                                dots={true}
                                prevArrow={<LeftOutlined />}
                                nextArrow={<RightOutlined />}
                            >
                                {product.photo.map((photo, index) => (
                                    <div key={index}>
                                        <img
                                            src={photo}
                                            alt={`${product.name} - Photo ${index + 1}`}
                                            className="w-full object-fit"
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <img
                                src={Array.isArray(product.photo) ? product.photo[0] : product.photo}
                                alt={product.name}
                                className="w-full object-fit"
                            />
                        )}
                    </div>
                    <div className="p-4 flex-grow overflow-y-auto">
                        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                        <p className="text-gray-600">{product.description}</p>
                        <hr/>
                        <p className="mb-2">Price: <span className="font-semibold">${product.price}</span></p>
                        <hr/>
                        <p className="mb-2">
                            Category: <span className="font-semibold">{product.category}</span>
                        </p>
                        <hr/>
                        <p className="mb-4">
                            Stock Count:{' '}
                            <span className={`px-2 py-1 rounded font-semibold ${
                                product.stock > 0 ? '' : 'bg-red-200 text-red-800'
                            }`}>
                                {product.stock > 0 ? product.stock : 'Out of Stock'}
                            </span>
                        </p>
                    </div>
                    <div className="p-4 border-t">
                        <Button
                            icon={<EditOutlined />}
                            onClick={openEditDrawer}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white border-none"
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </Drawer>

            <EditProductDrawer
                visible={editDrawerVisible}
                onClose={closeEditDrawer}
                product={product}
                onSave={handleEdit}
            />
        </>
        

        
    );
};

export default ViewProductDrawer;