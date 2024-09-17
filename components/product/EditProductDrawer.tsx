import React, { useState, useEffect } from 'react';
import { Drawer, Form, Input, Select, Button, message, Radio, InputNumber } from 'antd';
import { ProductInterface, EditProductInterface } from '../../constants/types';
import { FileUploader } from '../FileUploader';

interface EditProductDrawerProps {
  visible: boolean;
  onClose: () => void;
  product: ProductInterface;
  onSave: (id: string, updatedData: Partial<EditProductInterface>) => Promise<void>;
}

const EditProductDrawer: React.FC<EditProductDrawerProps> = ({ visible, onClose, product, onSave }) => {
  const [form] = Form.useForm();
  const [editedProduct, setEditedProduct] = useState<ProductInterface>(product);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(product.photo || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(product);
    setEditedProduct(product);
    setUploadedPhotos(product.photo || []);
  }, [product, form]);

  const handleFileUpload = (urls: string[]) => {
    setUploadedPhotos(prev => [...prev, ...urls]);
    setEditedProduct(prev => ({ ...prev, photo: [...prev.photo, ...urls] }));
  };

  const removePhoto = (indexToRemove: number) => {
    setUploadedPhotos(prev => prev.filter((_, index) => index !== indexToRemove));
    setEditedProduct(prev => ({
      ...prev,
      photo: prev.photo.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleChange = (value: any, fieldName: keyof ProductInterface) => {
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      [fieldName]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await form.validateFields();

      const updatedData: Partial<EditProductInterface> = {};
      
      // Only include fields that have changed
      if (editedProduct.name !== product.name) updatedData.name = editedProduct.name;
      if (editedProduct.description !== product.description) updatedData.description = editedProduct.description;
      if (editedProduct.price !== product.price) updatedData.price = editedProduct.price;
      if (editedProduct.category !== product.category) updatedData.category = editedProduct.category;
      if (editedProduct.stock !== product.stock) updatedData.stock = editedProduct.stock;
      if (JSON.stringify(uploadedPhotos) !== JSON.stringify(product.photo)) updatedData.photo = uploadedPhotos;

      // Only call onSave if there are actually changes
      if (Object.keys(updatedData).length > 0) {
        await onSave(product._id, updatedData);
      } else {
        message.info('No changes to update');
      }
      
      onClose();
    } catch (error) {
      message.error('Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer
      title="Edit Product"
      placement="right"
      onClose={onClose}
      open={visible}
      width={450}
    >
      <Form form={form} layout="vertical" initialValues={editedProduct}>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[{ required: true, message: 'Please enter product name' }]}
        >
          <Input value={editedProduct.name} onChange={(e) => handleChange(e.target.value, 'name')} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter product description' }]}
        >
          <Input.TextArea 
            rows={3} 
            value={editedProduct.description} 
            onChange={(e) => handleChange(e.target.value, 'description')} 
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter product price' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            value={editedProduct.price}
            onChange={(value) => handleChange(value, 'price')}
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select value={editedProduct.category} onChange={(value) => handleChange(value, 'category')}>
            <Select.Option value="electronics">Electronics</Select.Option>
            <Select.Option value="clothing">Clothing</Select.Option>
            <Select.Option value="books">Books</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="stock"
          label="Stock"
          rules={[{ required: true, message: 'Please enter stock quantity' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            value={editedProduct.stock}
            onChange={(value) => handleChange(value, 'stock')}
          />
        </Form.Item>

        <Form.Item label="Product Images">
          <FileUploader onFileUpload={handleFileUpload} />
          <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
            {uploadedPhotos.map((photo, index) => (
              <div key={index} style={{ position: 'relative', margin: '5px' }}>
                <img
                  src={photo}
                  alt={`Product ${index + 1}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <Button
                  type="primary"
                  danger
                  size="small"
                  style={{ position: 'absolute', top: '5px', right: '5px' }}
                  onClick={() => removePhoto(index)}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit} loading={isLoading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditProductDrawer;