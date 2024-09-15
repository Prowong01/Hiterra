'use client';

import React, { useState } from 'react';
import { Table, Form, Typography, Popconfirm, message  } from 'antd';
import { EditableCell } from './EditableCell';
import { EditableTableProps } from '../../constants/types';

const EditableTable = <T extends { _id: string }>({ initialData, columns, onUpdate, onDelete }: EditableTableProps<T>) => {
    const [form] = Form.useForm();
    const [data, setData] = useState(initialData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: T) => record._id === editingKey;

    const edit = (record: T) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record._id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (_id: string) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => _id === item._id);
            if (index > -1) {
                const item = newData[index];
                const updatedItem = { ...item, ...row };
                const result = await onUpdate(updatedItem);
                if (result) {
                    newData.splice(index, 1, result);
                    setData(newData);
                    setEditingKey('');
                    message.success('User updated successfully');
                } else {
                    throw new Error('Failed to update user');
                }
            }
        } catch (errInfo) {
            console.error('Validate Failed:', errInfo);
            message.error('Failed to update user');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const deletedUser = await onDelete(id);
            if (deletedUser) {
                setData(data.filter(item => item._id !== id));
                message.success('User deleted successfully');
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            message.error('Failed to delete user');
        }
    };
    
    const editableColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: T) => ({
                record,
                inputType: col.inputType || 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const actionColumn = {
        title: 'Action',
        dataIndex: 'operation',
        render: (_: any, record: T) => {
            const editable = isEditing(record);
            return editable ? (
                <span>
                    <Typography.Link onClick={() => save(record._id)} style={{ marginRight: 8 }}>
                        Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                        <a>Cancel</a>
                    </Popconfirm>
                </span>
            ) : (
                <span>
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
                        <Typography.Link style={{ color: 'red', marginLeft: 15 }}>
                            Delete
                        </Typography.Link>
                    </Popconfirm>
                </span>

            );
        },
    };

    const columnsWithAction = [...editableColumns, actionColumn];

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={columnsWithAction as any}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                rowKey="_id"
            />
        </Form>
    );
};

export default EditableTable;