"use server";

import { revalidatePath } from "next/cache";

import Task from "../database/models/task.model";
import { TaskInterface } from "../../constants/types";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../../lib/utils";

export async function createTask(task: Partial<TaskInterface>) {
  try {
    await connectToDatabase();

    const newTask = await Task.create(task);

    return JSON.parse(JSON.stringify(newTask));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllTasks() {
  try {
    await connectToDatabase();

    const tasks = await Task.find();
    if (!tasks) throw new Error("No tasks found");

    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    handleError(error);
  }
}

export async function getTaskById(taskId: string) {
  try {
    await connectToDatabase();

    const task = await Task.findById(taskId);

    if (!task) throw new Error("Task not found");

    return JSON.parse(JSON.stringify(task));
  } catch (error) {
    handleError(error);
  }
}

export async function updateTask(taskId: string, taskUpdate: Partial<TaskInterface>) {
  try {
    await connectToDatabase();

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: taskUpdate },
      { new: true, runValidators: true }
    );

    if (!updatedTask) throw new Error("Task update failed");

    revalidatePath("/dashboard/task");
    return JSON.parse(JSON.stringify(updatedTask));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteTask(taskId: string) {
  try {
    await connectToDatabase();

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      throw new Error("Task not found");
    }

    revalidatePath("/dashboard/task");

    return JSON.parse(JSON.stringify(deletedTask));
  } catch (error) {
    handleError(error);
  }
}