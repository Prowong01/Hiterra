import React from 'react';
import EditableTable from '../../../components/EditableTable';
import { UserDataType } from '../../../constants/types';

const App: React.FC = () => {
    const initialData: UserDataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Bridge Street',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 York Street',
        },
    ];

    const columns: Array<{
        title: string;
        dataIndex: keyof UserDataType;
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
                title: 'Age',
                dataIndex: 'age',
                width: '15%',
                editable: true,
                inputType: 'number',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                width: '40%',
                editable: true,
            },
        ];

    return (
        <div>
            <h1>Editable Table Example</h1>
            <EditableTable<UserDataType> initialData={initialData} columns={columns} />
        </div>
    );
};

export default App;