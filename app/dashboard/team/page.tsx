import React from 'react';
import { UserInterface } from '../../../constants/types';

import TeamList from '../../../components/user/TeamList';
import AddNewUser from '../../../components/user/CreateUserModal';

import { getAllUser, createUser, updateUser, deleteUser, getUserById } from '../../../lib/actions/user.action';

export default async function TeamPage() {
    const users: UserInterface[] = await getAllUser();

    return (
        <div>
            <h1>Team</h1>
            <AddNewUser onSave={createUser} />
            <TeamList
                initialUsers={users}
                onUpdate={updateUser}
                onDelete={deleteUser}
                onView={getUserById}
            />
        </div>
    );
};