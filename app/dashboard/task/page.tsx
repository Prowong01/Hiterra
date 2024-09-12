import React from 'react';
import EditableTable from '../../../components/table/EditableTable';
import { TaskDataType } from '../../../constants/types';

const Task: React.FC = () => {
    const initialData: TaskDataType[] = [
        {
            key: '1',
            name: 'Task 1',
            status: 'In Progress',
            cycle: 1,
            createdAt: new Date('2023-05-01T09:00:00'),
            updatedAt: new Date('2023-05-01T10:30:00')
        },
        {
            key: '2',
            name: 'Task 2',
            status: 'Completed',
            cycle: 2,
            createdAt: new Date('2023-04-28T14:00:00'),
            updatedAt: new Date('2023-04-30T16:45:00')
        },
        {
            key: '3',
            name: 'Task 3',
            status: 'Pending',
            cycle: 0,
            createdAt: new Date('2023-05-02T11:15:00'),
            updatedAt: new Date('2023-05-02T11:15:00')
        }
    ];

    const columns: Array<{
        title: string;
        dataIndex: keyof TaskDataType;
        width: string;
        editable: boolean;
        inputType?: 'number' | 'text';
    }> = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: '25%',
                editable: true,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                width: '15%',
                editable: true,
                inputType: 'number',
            },
            {
                title: 'Cycle',
                dataIndex: 'cycle',
                width: '40%',
                editable: true,
            },
        ];

    return (
        <div>
            <h1>Editable Table Example</h1>
            <EditableTable<TaskDataType> initialData={initialData} columns={columns} />
        </div>
    );
};

export default Task;