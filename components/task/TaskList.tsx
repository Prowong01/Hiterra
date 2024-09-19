'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Table, Typography, Popconfirm, message, Tag, Button, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { TablePaginationConfig } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import Highlighter from 'react-highlight-words';

import { TaskTableCellProps } from '../../constants/types';
import { TaskInterface } from '../../constants/types';

const EditableCell: React.FC<TaskTableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    // record,
    // index,
    children,
    ...restProps
}) => {
    let inputNode;

    switch (inputType) {
        case 'textarea':
            inputNode = <Input.TextArea />;
            break;
        case 'date':
            inputNode = <DatePicker />;
            break;
        case 'select':
            if (dataIndex === 'cycle') {
                inputNode = (
                    <Select>
                        <Select.Option value="Daily">Daily</Select.Option>
                        <Select.Option value="Weekly">Weekly</Select.Option>
                        <Select.Option value="Monthly">Monthly</Select.Option>
                    </Select>
                );
            } else if (dataIndex === 'status') {
                inputNode = (
                    <Select>
                        <Select.Option value="Open">Open</Select.Option>
                        <Select.Option value="In Progress">In Progress</Select.Option>
                        <Select.Option value="Completed">Completed</Select.Option>
                    </Select>
                );
            }
            break;
        default:
            inputNode = <Input />;
    }

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please input ${title}!`,
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

interface TaskListProps {
    tasks: TaskInterface[];
    onUpdate: (id: string, task: TaskInterface) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
    const [form] = Form.useForm();
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [filteredData, setFilteredData] = useState<TaskInterface[]>(tasks);
    const [editingKey, setEditingKey] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    useEffect(() => {
        setFilteredData(tasks);
    }, [tasks]);

    const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: string) => {
        const searchText = selectedKeys[0];
        confirm();
        setSearchedColumn(dataIndex);

        const filtered = tasks.filter((item) =>
            item[dataIndex as keyof TaskInterface]
                .toString()
                .toLowerCase()
                .includes(searchText?.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchedColumn('');
        setFilteredInfo({});
        setFilteredData(tasks);
    };

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        render: (text: string) =>
            searchedColumn === dataIndex ? (
                <Typography.Text>{text}</Typography.Text>
            ) : (
                text
            ),
    });

    const isEditing = (record: TaskInterface) => record._id === editingKey;

    const edit = (record: Partial<TaskInterface> & { _id: string }) => {
        form.setFieldsValue({ ...record, date: dayjs(record.date) });
        setEditingKey(record._id);
    };

    const handleChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>) => {
        setFilteredInfo(filters);

        let newFilteredData = tasks;
        Object.keys(filters).forEach(key => {
            const filterValues = filters[key];
            if (filterValues && filterValues.length > 0) {
                newFilteredData = newFilteredData.filter(item =>
                    filterValues.includes(item[key as keyof TaskInterface])
                );
            }
        });
    }

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: string) => {
        try {
            const row = (await form.validateFields()) as TaskInterface;
            const newData = [...tasks];
            const index = newData.findIndex((item) => key === item._id);
            if (index > -1) {
                const item = newData[index];
                await onUpdate(key, { ...item, ...row });
                message.success('Task updated successfully');
                setEditingKey('');
            }
        } catch (errInfo) {
            message.error(`Failed to update task, ${errInfo}`);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Created':
                return 'blue';
            case 'In Progress':
                return 'orange';
            case 'Completed':
                return 'green';
            default:
                return 'default';
        }
    };

    const columns = [
        {
            title: 'Task Name',
            dataIndex: 'taskName',
            width: '15%',
            editable: true,
            ...getColumnSearchProps('taskName'),
        },
        {
            title: 'Description',
            dataIndex: 'taskDescription',
            width: '25%',
            editable: true,
            ...getColumnSearchProps('taskDescription'),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: '15%',
            editable: true,
            render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Cycle',
            dataIndex: 'cycle',
            width: '10%',
            editable: true,
            filters: [
                { text: 'Daily', value: 'Daily' },
                { text: 'Weekly', value: 'Weekly' },
                { text: 'Monthly', value: 'Monthly' },
            ],
            filteredValue: filteredInfo.cycle || null,
            onFilter: (value: string, record: TaskInterface) => record.cycle === value,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            editable: true,
            render: (status: string) => (
                <Tag color={getStatusColor(status)}>{status}</Tag>
            ),
            filters: [
                { text: 'Created', value: 'Created' },
                { text: 'In Progress', value: 'In Progress' },
                { text: 'Completed', value: 'Completed' },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value: string, record: TaskInterface) => record.status === value,
        },
        {
            title: 'Last Modified',
            dataIndex: 'updatedAt',
            width: '15%',
            editable: false,
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (_: any, record: TaskInterface) => {
                const editable = isEditing(record);
                return editable ? (
                    <span className="flex items-center">
                        <Typography.Link onClick={() => save(record._id)} style={{ marginLeft: 10 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel} >
                            <a className='text-red-500' style={{ marginLeft: 8 }}>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <span className="flex items-center">
                        <Typography.Link>
                            <div style={{ border: '1px solid gray', padding: '2px', borderRadius: '20%', margin: '8px' }}>
                                <EyeOutlined className="text-gray-400" />
                            </div>
                        </Typography.Link>
                        <Typography.Link
                            disabled={editingKey !== ''}
                            onClick={() => edit(record)}
                        >
                            <div style={{ border: '1px solid blue', padding: '2px', borderRadius: '20%', margin: '8px' }}>
                                <EditOutlined className="text-blue-500" />
                            </div>
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record._id)}>
                            <div style={{ border: '1px solid red', padding: '2px', borderRadius: '20%', margin: '8px' }}>
                                <DeleteOutlined className="text-red-500" />
                            </div>
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
            onCell: (record: TaskInterface) => ({
                record,
                inputType: col.dataIndex === 'date' ? 'date' : col.dataIndex === 'cycle' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                dataSource={filteredData}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                onChange={handleChange}
            />
        </Form>
    );
};
export default TaskList;