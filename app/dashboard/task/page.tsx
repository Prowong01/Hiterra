import React from 'react';
import { TaskInterface } from '../../../constants/types';
import TaskList from '../../../components/task/TaskList';

import AddNewTask from '../../../components/task/CreateTaskModal';
import { getAllTasks, createTask, updateTask, deleteTask } from '../../../lib/actions/task.action';

export default async function TaskPage() {
    const task: TaskInterface[] = await getAllTasks();

    return (
        <div>
            <h1>Task</h1>
            <AddNewTask onSave={createTask} />
            <TaskList
                tasks={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
            />
        </div>
    );
};