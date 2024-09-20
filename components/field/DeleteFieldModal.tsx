import React from 'react';
import { Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface DeleteFieldModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    fieldName: string;
}

const DeleteFieldModal: React.FC<DeleteFieldModalProps> = ({
    visible,
    onCancel,
    onConfirm,
    fieldName
}) => {
    return (
        <Modal
            title={<><ExclamationCircleOutlined style={{ color: '#faad14' }} /> Confirm Deletion</>}
            open={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
        >
            <p>Are you sure you want to delete the selected field <Text strong>{fieldName}</Text>?</p>
            <p>This action cannot be undone.</p>
        </Modal>
    );
};

export default DeleteFieldModal;