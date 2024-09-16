'use client'

import { useState } from 'react'
import { Button } from 'antd'
import AddNewProduct from './CreateProductModal'
import { createProduct } from '../../lib/actions/product.action'

const CreateNewProductButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => setIsModalVisible(true)
    const hideModal = () => setIsModalVisible(false)

    return (
        <>
            <Button type="primary" onClick={showModal}>Add New Product</Button>
            <AddNewProduct
                visible={isModalVisible}
                onCancel={hideModal}
                onSave={createProduct}
            />
        </>
    )
}

export default CreateNewProductButton