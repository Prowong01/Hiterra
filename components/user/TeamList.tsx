'use client';

import React, { useState } from 'react';
import { Table, Form, Typography, Popconfirm, message, Input, InputNumber } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserInterface, TeamTableCellProps } from '../../constants/types';
import ColumnSearch from '../ColumnSearch';

interface EditTeamTableProps {
    initialUsers: UserInterface[];
    onUpdate: (user: Partial<UserInterface>) => Promise<any>;
    onDelete: (id: string) => void;
    onView: (id: string) => void;
}

const TeamList: React.FC<EditTeamTableProps> = ({ initialUsers, onUpdate, onDelete, onView }) => {
    const [form] = Form.useForm();
    const [users, setUsers] = useState(initialUsers);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: UserInterface) => record._id === editingKey;

    const edit = (record: UserInterface) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record._id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: string) => {
        try {
            const row = await form.validateFields();
            const newUsers = [...users];
            const index = newUsers.findIndex((item) => key === item._id);
            if (index > -1) {
                const item = newUsers[index];
                const updatedUser = { ...item, ...row, _id: key };
                await onUpdate(updatedUser);
                message.success('Update user successfully!')
                newUsers.splice(index, 1, updatedUser);
                setUsers(newUsers);
                setEditingKey('');
            }
        } catch (errInfo) {
            message.error(`${errInfo}`)
        }
    };

    const handleDelete = async (key: string) => {
        try {
            await onDelete(key);
            setUsers(users.filter((item) => item._id !== key));
            message.success('User deleted successfully');
        } catch (error) {
            message.error('Failed to delete user');
        }
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            width: '30%',
            editable: true,
            ...ColumnSearch<UserInterface>({ dataIndex: 'username', title: 'Username' }),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '25%',
            editable: true,
            ...ColumnSearch<UserInterface>({ dataIndex: 'email', title: 'Email' }),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            width: '20%',
            editable: true,
            ...ColumnSearch<UserInterface>({ dataIndex: 'phone', title: 'Phone' }),
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            width: '15%',
            render: (_: any, record: UserInterface) => {
                const editable = isEditing(record);
                return editable ? (
                    <span className="flex items-center">
                        <Typography.Link onClick={() => save(record._id)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span className="flex items-center">
                        <Typography.Link onClick={() => onView(record._id)}>
                            <div style={{ border: '1px solid gray', padding: '2px', borderRadius: '20%', margin: '8px' }}>
                                <EyeOutlined className="text-gray-400" />
                            </div>
                        </Typography.Link>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <div style={{
                                border: '1px solid blue', padding: '2px', borderRadius: '20%', margin: '8px'
                            }}>
                                <EditOutlined className="text-blue-400" />
                            </div>
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
                            <Typography.Link>
                                <div style={{ border: '1px solid red', padding: '2px', borderRadius: '20%', margin: '8px' }}>
                                    <DeleteOutlined className="text-red-400" />
                                </div>
                            </Typography.Link>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: UserInterface) => ({
                record,
                inputType: col.dataIndex === 'phone' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const TeamTableCell: React.FC<TeamTableCellProps> = ({
        editing,
        dataIndex,
        title,
        inputType,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        {inputNode}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: TeamTableCell,
                    },
                }}
                bordered
                dataSource={users}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                rowKey="_id"
            />
        </Form>
    );
};

export default TeamList;