import React from 'react';
import { Button, Drawer, Carousel } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { ProductInterface } from '../../constants/types';

interface ViewProductDrawerProps {
    visible: boolean;
    onClose: () => void;
    product: ProductInterface | null;
    onEdit: (id: string, updatedData: ProductInterface) => Promise<void>;
  }

const ViewProductDrawer: React.FC<ViewProductDrawerProps> = ({ visible, onClose, product, onEdit }) => {
    if (!product) return null;

    const handleEdit = async (updatedData: ProductInterface) => {
        if (product._id) {
            await onEdit(product._id, updatedData);
        }
    };

    return (
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
                        <Carousel>
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
                        Status:{' '}
                        <span className={`px-2 py-1 rounded font-semibold ${
                            product.stock > 0 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                        }`}>
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </p>
                </div>
                <div className="p-4 border-t">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(product)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white border-none"
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default ViewProductDrawer;