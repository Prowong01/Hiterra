'use client';

import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, Switch, Radio, message } from 'antd';
import { TaskInterface } from '../../constants/types';
import { CheckCircleIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { PlusOutlined } from '@ant-design/icons';
import { useAuth } from '@clerk/nextjs'
import dayjs from 'dayjs'

interface AddNewTaskProps {
    onSave: (task: Partial<TaskInterface>) => Promise<void>;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({ onSave }) => {
    const { userId } = useAuth()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [cycleEnabled, setCycleEnabled] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = () => {
        form.validateFields().then((values) => {
            const taskData: Partial<TaskInterface> = {
                ...values,
                date: values.date ? dayjs(values.date).toISOString() : null,
                createdBy: userId,
            }
            onSave(taskData);
            message.success('Task added successfully');
            form.resetFields();
            setIsModalVisible(false);
            window.location.reload();
        });
    };

    return (
        <>
            <Button icon={<PlusOutlined />} onClick={showModal} type="primary" style={{ marginBottom: 12 }}>Add new task</Button>
            <Modal
                title="Add new task"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSave}>
                        Save
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="taskName"
                        label="Task Name"
                        rules={[{ required: true, message: 'Please enter task name' }]}
                    >
                        <Input placeholder="Please enter task name" />
                    </Form.Item>
                    <Form.Item
                        name="taskDescription"
                        label="Description"
                    >
                        <Input.TextArea placeholder="Please enter task description" />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select status' }]}
                    >
                        <Select placeholder="Select status">
                            <Select.Option value="Created">
                                <span className="inline-flex items-center text-xs font-semibold rounded-full bg-blue-100 text-blue-600 border border-blue-200">
                                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                                    Open
                                </span>
                            </Select.Option>
                            <Select.Option value="In Progress">
                                <span className="inline-flex items-center text-xs font-semibold rounded-full bg-yellow-100 text-yellow-600 border border-yellow-200">
                                    <ClockIcon className="w-4 h-4 mr-1" />
                                    In Progress
                                </span>
                            </Select.Option>
                            <Select.Option value="Completed">
                                <span className="inline-flex items-center text-xs font-semibold rounded-full bg-green-100 text-green-600 border border-green-200">
                                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                                    Completed
                                </span>
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="tag"
                        label="Tag"
                    >
                        <Input placeholder="Please enter tag" />
                    </Form.Item>
                    <Form.Item label={
                        <div className="flex justify-between items-center">
                            <span style={{ paddingRight: 20 }}>Date & Repeat</span>
                            <Switch
                                checked={cycleEnabled}
                                onChange={(checked) => setCycleEnabled(checked)}
                            />
                        </div>
                    }>
                        <div className="flex justify-between items-center space-y-2">
                            <Form.Item
                                name="date"
                                rules={[{ required: true, message: 'Please select date' }]}
                                style={{ paddingTop: 28 }}
                            >
                                <DatePicker />
                            </Form.Item>
                            {cycleEnabled && (
                                <Form.Item
                                    name="cycle"
                                    rules={[{ required: cycleEnabled, message: 'Please select a repeat cycle' }]}
                                    style={{ paddingBottom: -28 }}
                                >
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value="Daily">Daily</Radio.Button>
                                        <Radio.Button value="Weekly">Weekly</Radio.Button>
                                        <Radio.Button value="Monthly">Monthly</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            )}
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddNewTask;