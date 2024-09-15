import React from 'react';
import { UserInterface } from '../../../constants/types';

import EditableTable from '../../../components/table/EditableTable';
import AddNewUser from '../../../components/CreateUserModal';

import { getAllUser, createUser, updateUser, deleteUser } from '../../../lib/actions/user.action';

export default async function Page() {
    const users: UserInterface[] = await getAllUser();

    const columns: Array<{
        title: string;
        dataIndex: keyof UserInterface;
        width: string;
        editable: boolean;
        inputType?: 'number' | 'text';
    }> = [
            {
                title: 'Username',
                dataIndex: 'username',
                width: '30%',
                editable: true,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                width: '15%',
                editable: true,
                inputType: 'text',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                width: '15%',
                editable: true,
            },
         ];

    return (
        <div>
            <AddNewUser onSave={createUser} />
            <EditableTable<UserInterface> initialData={users} columns={columns} onUpdate={updateUser} onDelete={deleteUser}/>
        </div>
    );
};
